/*  Listener
 *********************************************************/
$("document").ready(function() {

    $("#codigo").blur(consultaCodigo);

});

/* Funciones Básicas Botones
 **********************************************************/


function alta() {
    var data = $("#formFabricante").serialize();
    $.ajax({
        url: '../altaFabricante.htm',
        data: data,
        type: 'POST',
        success: limpiar
    });
}

function baja() {
    // Confirmar Baja
    var data = $("#formFabricante").serialize();
    $.ajax({
        url: '../bajaFabricante.htm',
        data: data,
        type: 'POST',
        success: limpiar
    });
}

function modificar() {
    // Confirmar Modificación
    var data = $("#formFabricante").serialize();
    $.ajax({
        url: '../modificaFabricante.htm',
        data: data,
        type: 'POST',
        success: limpiar
    });
}

/* Funciones adicionales
 ********************************************************/

function consultaCodigo() {
    if ($("#codigo").val().length > 0) {
        console.log("vamos a consultar el código " + this.value);
        var codigo = this.value;
        $.getJSON('../consultaFabricante.htm', {codigo: codigo}, respuestaConsultaFabricante);

    }
}

function respuestaConsultaFabricante(obj){
    console.log("Respuesta "+obj[0].nombre);
}