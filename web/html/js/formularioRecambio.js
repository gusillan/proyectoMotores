/*  Variables globales
 *********************************************************/
ventanaRecambios = new VentanaEmergente({
        modal: 'recambiosModal',
        titulo: 'Seleccionar recambio',
        campos: ['referencia', 'fabricante.nombre', 'descripcion'], //,'fabricante.nombre'],
        campoID: 'idRecambio'
    });

/*  Listener
 *********************************************************/
$("document").ready(function() {
    
    console.log("Referencia "+ getQueryVariable("referencia"));
    if (getQueryVariable("referencia")){
        $("#referencia").val(getQueryVariable("referencia"));
    }

    consultarMarca();

    $("#referencia").change(consultaReferencia);

    $("#codigoMarca").change(consultarMarca);
    $("#codigoCategoria").change(consultarCategoria);


    $("#pvp, #descuento").change(function() {
        var value = this.value;
        value = value.replace(",", ".");
        var number = parseFloat(value);
        number = number.toFixed(2);
        this.value = number;
        calcularNeto();
    });

    $("#stock").change(function() {
        var value = this.value;
        value = value.replace(",", ".");
        var number = parseFloat(value);
        number = number.toFixed(1);
        this.value = number;
    });

    $("#nuevoRecambioBoton").click(function() {
        var referencia = $("#referencia").val();
        limpiar();
        $('#codigoMarca').focus();
        $("#referencia").val(referencia);
        $("#nuevoRecambioBoton").hide();
        updateFocusables();
    });
    
    $("#sustitucion").click(mostrarSustituciones);

});

/* Funciones Básicas Botones
 **********************************************************/


function guardar() {

    if (validarFormulario()) {
        var data = $("#formRecambio").serialize();
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

    var data = $("#formRecambio").serialize();
    $.ajax({
        url: '../bajaRecambio.htm',
        data: data,
        type: 'POST',
        success: limpiar
    });
}


/* Funciones adicionales
 ********************************************************/



function consultarCategoria() {
    var categoria = $("#codigoCategoria").val();
    $.ajax({
        url: '../consultaCategoriaRecambio.htm',
        data: {codigo: categoria},
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
        console.log("Existen varias Referencias con ese Codigo.Consultar al administrador de la BBDD");
        ventanaRecambios.abrir(listaObjetos);
    } else if (listaObjetos.length < 1) {
        console.log("No existe ninguna Referencia con ese Codigo");
    }
}

function rellenaFormulario(obj) {
    $("#idRecambio").val(obj.idRecambio);
    $("#referencia").val(obj.referencia);
    $("#codigoMarca").val(obj.fabricante.codigo);
    rellenaMarca(obj.fabricante);
    $("#descripcion").val(obj.descripcion);
    $("#pvp").val(obj.pvp.toFixed(2));
    $("#descuento").val(obj.descuento.toFixed(2));
    calcularNeto();
    $("#stock").val(obj.stock.toFixed(1));
    $("#ubicacion").val(obj.ubicacion);
    $("#codigoCategoria").val(obj.categoria.codigo);
    $("#categoria").val(obj.categoria.categoria);
    $("#informacion").val(obj.informacion);
    $("#nuevoRecambioBoton").show();
    $("#baja").attr("disabled", false);
    $("#descripcion").focus();
}

function calcularNeto() {
    var pvp = parseFloat($("#pvp").val());
    var descuento = parseFloat($("#descuento").val());
    neto = pvp * (100 - descuento) / 100;
    if (!isNaN(neto)) {
        $("#neto").val(neto.toFixed(2));
    }
}

function mostrarSustituciones(){
    if (!vacio($("#referencia"))){
        console.log("Consultar "+$("#idRecambio").val()+" - "+$("#referencia").val());
        var data = $("#idRecambio").val();
        $.ajax({
            url: '../buscaSustituciones.htm',
            idRecambio : data,
            type: 'POST',
            success: mostarListaSustituciones
        });
        
    }else{
        console.log("Referencia vacia");
    }    
}

function mostrarListaSustituciones(lista){
    
}

