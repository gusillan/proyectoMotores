/*  Variables globales
 *********************************************************/
ventanaRecambiosA = new VentanaEmergente({
    modal: 'recambiosModal',
    titulo: 'Seleccionar recambio',
    campos: ['referencia', 'fabricante.nombre', 'descripcion'], //,'fabricante.nombre'],
    campoID: 'idRecambio',
    callback: rellenaRecambioA
});

ventanaRecambiosB = new VentanaEmergente({
    modal: 'recambiosModal',
    titulo: 'Seleccionar recambio',
    campos: ['referencia', 'fabricante.nombre', 'descripcion'], //,'fabricante.nombre'],
    campoID: 'idRecambio',
    callback: rellenaRecambioB
});


/*  Listener
 ***********************************************************/
$("document").ready(function() {

    $("#referenciaRecambioA").change(consultaReferenciaA);
    $("#referenciaRecambioB").change(consultaReferenciaB);

});

function consultaReferenciaA() {

    if (!vacio($("#referenciaRecambioA"))) {
        console.log("Vamos a consultar la Referencia " + this.value);// Borrar
        var referencia = this.value;
        promesa = peticionAjax('../consultaReferenciaSinSustitucion.htm', referencia);
        promesa.then(function(listaRecambios) {
            if (listaRecambios.length === 1) {
                var recambio = listaRecambios[0];
                console.log("Resultado " + recambio);
                rellenaRecambioA(recambio);

            } else if (listaRecambios.length < 1) {
                console.log("No existe esa referencia");

            }
        });

    }
}

function rellenaRecambioA(recambio) {
    $("#idRecambioA").val(recambio.idRecambio);
    $("#referenciaRecambioA").val(recambio.referenciaRecambio);
    $("#codigoFabricanteA").val(recambio.fabricante.codigoFabricante);
    $("#fabricanteA").val(recambio.fabricante.nombreFabricante);
    $("#logoFabricanteA").attr("src", "img/marcas/" + recambio.fabricante.logoFabricante);
    $("#descripcionRecambioA").val(recambio.descripcionRecambio);
    $("#sustitucion").val(recambio.sustitucion);
    $("#equivalencia").val(recambio.equivalencia);
    if (!vacio($("#sustitucion"))){
        console.log("Recambio con una sustitucion!!");
        idRecambio = $("#sustitucion").val();
        promesa = peticionAjax('../consultaRecambioId.htm',idRecambio);
        promesa.then(function(recambio){
            console.log(recambio.idRecambio);
            rellenaRecambioB(recambio);
        });
    }

}


function consultaReferenciaB() {

    if (!vacio($("#referenciaRecambioB"))) {
        console.log("Vamos a consultar la Referencia " + this.value);// Borrar
        var referencia = this.value;
        promesa = peticionAjax('../consultaReferencia.htm', referencia);
        promesa.then(function(listaRecambios) {
            if (listaRecambios.length === 1) {
                var recambio = listaRecambios[0];
                console.log("Resultado " + recambio);
                rellenaRecambioB(recambio);
            } else if (listaRecambios.length < 1) {
                console.log("No existe esa referencia");
            }
        });
    }
}

function rellenaRecambioB(recambio) {
    $("#idRecambioB").val(recambio.idRecambio);
    $("#referenciaRecambioB").val(recambio.referenciaRecambio);
    $("#codigoFabricanteB").val(recambio.fabricante.codigoFabricante);
    $("#fabricanteB").val(recambio.fabricante.nombreFabricante);
    $("#logoFabricanteB").attr("src", "img/marcas/" + recambio.fabricante.logoFabricante);
    $("#descripcionRecambioB").val(recambio.descripcionRecambio);
}

/* Funciones Básicas Botones
 **********************************************************/


function guardar() {

    if (validarFormulario()) {
        var data = $("#formSustitucion").serialize();
        console.log("Serializacion formulario -> : " + data)
        $.ajax({
            url: '../guardaSustitucion.htm',
            data: data,
            type: 'POST',
            success: limpiar
        });
    } else {
        console.log("Formulario no válido");
    }
}
