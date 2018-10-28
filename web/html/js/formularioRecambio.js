/*  Variables globales
 *********************************************************/
ventanaRecambios = new VentanaEmergente({
    modal: 'recambiosModal',
    titulo: 'Seleccionar recambio',
    campos: ['referenciaRecambio', 'fabricante.nombreFabricante', 'descripcionRecambio'], //,'fabricante.nombre'],
    campoID: 'idRecambio',
    callback: rellenaFormularioRecambio
});

/*  Listener
 *********************************************************/
$("document").ready(function() {

    console.log("Referencia " + getQueryVariable("referencia"));
    if (getQueryVariable("referencia")) {
        $("#referencia").val(getQueryVariable("referencia"));
    }

    $("#referenciaRecambio").change(consultaReferencia);
    $("#codigoFabricante").change(comprobacionFabricante);
    $("#codigoCategoria").change(consultarCategoria);

    $("#pvpRecambio, #dtoRecambio").change(function() {
        var value = this.value;
        value = value.replace(",", ".");
        var number = parseFloat(value);
        number = number.toFixed(2);
        this.value = number;
        calcularNeto();
    });

    $("#stockRecambio").change(function() {
        var value = this.value;
        value = value.replace(",", ".");
        var number = parseFloat(value);
        number = number.toFixed(1);
        this.value = number;
    });

    $("#duplicarReferencia").click(duplicarReferencia);
    $("#sustitucion").click(mostrarSustituciones);
    $("#buscarRecambio").click(buscarRecambio);

});

/* Funciones Básicas Botones
 **********************************************************/


function guardar() {

    if (validarFormulario()) {
        var data = $("#formulario").serialize();
        $.ajax({
            url: '../guardaRecambio.htm',
            data: data,
            type: 'POST',
            success: limpiar
        });
    } else {
        console.log("Formulario no válido");
    }
}

function baja() {

    var data = $("#formulario").serialize();
    $.ajax({
        url: '../bajaRecambio.htm',
        data: data,
        type: 'POST',
        success: limpiar
    });
}

/* Funciones adicionales
 ********************************************************/

function consultaReferencia() {
    if (!vacio($("#referenciaRecambio"))) {
        var referencia = this.value;
        console.log("Vamos a consultar la Referencia " + referencia);
        promesa = peticionAjax('../consultaReferencia.htm', referencia);
        promesa.then(function(listaRecambios) {
            if (listaRecambios.length === 1) {
                console.log("Respuesta 1 " + listaRecambios)
                rellenaFormularioRecambio(listaRecambios[0]);
            } else if (listaRecambios.length > 1) {
                console.log("respuesta : Varios recambios con la misma referencia " + listaRecambios);
                ventanaRecambios.abrir(listaRecambios);
            } else if (listaRecambios.length < 1) {
                console.log("Ningun recambio con esa referencia");
            }
        });
    } else {
        $("#descripcionRecambio").val("");
    }
}

function rellenaFormularioRecambio(recambio) {
    $("#idRecambio").val(recambio.idRecambio);
    $("#referenciaRecambio").val(recambio.referenciaRecambio);
    $("#codigoFabricante").val(recambio.fabricante.codigoFabricante);
    console.log("id fabricante " + recambio.fabricante.idFabricante);
    rellenaFabricanteCampos(recambio.fabricante);
    //$("#idFabricante").val(recambio.fabricante.idFabricante);
    console.log("codigo fabricante " + $("#idFabricante").val());
    $("#descripcionRecambio").val(recambio.descripcionRecambio);
    $("#pvpRecambio").val(recambio.pvpRecambio.toFixed(2));
    $("#dtoRecambio").val(recambio.dtoRecambio.toFixed(2));
    calcularNeto();
    $("#stockRecambio").val(recambio.stockRecambio.toFixed(1));
    $("#ubicacionRecambio").val(recambio.ubicacionRecambio);
    $("#codigoCategoria").val(recambio.categoria.codigoCategoria);
    $("#categoria").val(recambio.categoria.categoria);
    $("#infoRecambio").val(recambio.infoRecambio);
    $("#nuevoRecambioBoton").show();
    $("#infoSustituciones").show();
    $("#baja").attr("disabled", false);
    $("#descripcionRecambio").focus();
}

function borraFormularioRecambio() {
    var referenciaRecambio = $("#referenciaRecambio").val();
    $("#formulario")[0].reset();
    $("#logoFabricante").attr("src", "");
    $("#referenciaRecambio").val(referenciaRecambio);
    $("#codigoFabricante").focus();
}

function consultarCategoria() {
    var categoria = $("#codigoCategoria").val();
    $.ajax({
        url: '../consultaCategoria.htm',
        data: {parametro: categoria},
        type: 'POST',
        success: respuestaConsultaCategoria
    });
}

function respuestaConsultaCategoria(listaObjetos) {
    if (listaObjetos.length === 1) {
        var objeto = listaObjetos[0];
        rellenaCategoria(objeto);
    } else if (listaObjetos.length > 1) {
        console.log("Existen varias categorías con ese Codigo.Consultar al administrador de la BBDD");
    } else if (listaObjetos.length < 1) {
        console.log("No existe ninguna categoria con ese Codigo");
        $("#codigoCategoria").val('');
        $("#categoria").val('');
    }
}

function rellenaCategoria(objeto) {
    $("#categoria").val(objeto.categoria);
}

function respuestaConsultaReferencia(listaObjetos) {
    if (listaObjetos.length === 1) {
        var objeto = listaObjetos[0];
        rellenaFormulario(objeto);
    } else if (listaObjetos.length > 1) {
        console.log("Lista:");
        console.log(listaObjetos);
        var idFabricanteInicial = listaObjetos[0].fabricante.idFabricante;
        var referenciaInicial = listaObjetos[0].referencia;
        for (var i = 1; i < listaObjetos.length; i++) {
            if (referenciaInicial != listaObjetos[i].referencia) {
                console.log("Tienen distinta referencia");
                var objeto = listaObjetos[listaObjetos.length - 1];
                rellenaFormulario(objeto);
                var sustituciones = "";
                for (var j = 0; j < listaObjetos.length - 1; j++) {
                    sustituciones += String(listaObjetos[j].referencia);
                    sustituciones += " \u2192 "; //U+02192
                    sustituciones += String(listaObjetos[j + 1].referencia);
                    sustituciones += "\n";
                }
                $("#infoSustituciones").prop("title", sustituciones);
                return 0;
            }
        }
        console.log("Tienen la misma referencia");
        ventanaRecambios.abrir(listaObjetos);

    } else if (listaObjetos.length < 1) {
        console.log("No existe ninguna Referencia con ese Codigo");
    }
}



function calcularNeto() {
    var pvp = parseFloat($("#pvpRecambio").val());
    var descuento = parseFloat($("#dtoRecambio").val());
    neto = pvp * (100 - descuento) / 100;
    if (!isNaN(neto)) {
        $("#neto").val(neto.toFixed(2));
    }
}

function mostrarSustituciones() {
    if (!vacio($("#referencia"))) {
        console.log("Consultar " + $("#idRecambio").val() + " - " + $("#referencia").val());
        var data = $("#idRecambio").val();
        $.ajax({
            url: '../buscaSustituciones.htm',
            idRecambio: data,
            type: 'POST',
            success: mostarListaSustituciones
        });

    } else {
        console.log("Referencia vacia");
    }
}

function mostrarListaSustituciones(lista) {

}
/* Botones de la caja de Referencia
 * ****************************************************************************/

function duplicarReferencia() {

    borraFormularioRecambio();

}

function comprobacionFabricante() {
    console.log ("Comprobamos si el recambio está duplicado");
    if (!vacio($("#referenciaRecambio")) && !vacio($("#codigoFabricante"))) {
        var fabricante = $("#codigoFabricante").val();
        console.log("Consultamos " + fabricante);  //Borrar
        promesa = peticionAjax('../consultaFabricante.htm', fabricante);
        promesa.then(function(listaFabricantes) {
            if (listaFabricantes.length === 1) {
                var fabricante = listaFabricantes[0];
                $("#idFabricante").val(fabricante.idFabricante);
                $("#nombreFabricante").val(fabricante.nombreFabricante);
                $("#logoFabricante").attr("src", "img/marcas/" + fabricante.logoFabricante);
                var data = $("#formulario").serialize();
                $.ajax({
                    url: '../consultaReferenciaFabricante.htm',
                    data: data,
                    type: 'POST',
                    success: respuestaComprobacionRecambio
                })

            } else if (listaFabricantes.length > 1) {
                console.log("ERROR - No puede haber codigos repetidos.Consulte al administrador de la BBDD");
            } else if (listaFabricantes.length < 1) {
                console.log("No existe ningun fabricante con ese Codigo"); // Borrar
                borraFormularioRecambio();
            }
        });
    } else {
        borraFormularioRecambio();
    }   
   
}

function respuestaComprobacionRecambio(listaRecambios){
    if (listaRecambios.length < 1){
        console.log("se puede dar de alta");     
    }else if (listaRecambios.length === 1){
        var recambio = listaRecambios[0];
        rellenaFormularioRecambio(recambio);
        console.log("No se puede duplicar recambios"); 
        //alert("Esta Referencia ya está dada de alta");
    }
}