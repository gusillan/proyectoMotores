/*  Listener
 *********************************************************/
$("document").ready(function() {

    $("#codigo").blur(consultaCodigo);

});

/* Funciones Básicas Botones
 **********************************************************/


function guardar() {

    if (validarFormulario()) {
        var data = $("#formFabricante").serialize();
        $.ajax({
            url: '../guardaFabricante.htm',
            data: data,
            type: 'POST',
            success: limpiar
        });
    } else {
        console.log("Formulario no válido");
    }

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


/* Funciones adicionales
 ********************************************************/

function consultaCodigo() {
    if ($("#codigo").val().length > 0) {
        console.log("vamos a consultar el código " + this.value);
        var codigo = this.value;
        $.getJSON('../consultaFabricante.htm', {codigo: codigo}, respuestaConsultaFabricante);

    }
}

function respuestaConsultaFabricante(obj) {
    console.log("Respuesta " + obj[0].nombre);
}