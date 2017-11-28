/* Listener
 * *******************************************************/

$(function() {

    $("#codigo").focus();

    $("#codigo").blur(function() {
        if (vacio($("#codigo"))) {
            console.log("Codigo Postal vacio");
        } else {
            console.log("Codigor " + this.value);
            consultaCpostal(this.value);
        }
    });

});

/* Funciones Básicas Botones
 **********************************************************/

function guardar() {
    var data = $("#formCpostal").serialize();
    $.ajax({
        url: '../guardarCpostal.htm',
        data: data,
        type: 'POST',
        success: limpiar
    });
}

function baja() {
    // Confirmar Baja
    var data = $("#formCpostal").serialize();
    $.ajax({
        url: '../bajaCpostal.htm',
        data: data,
        type: 'POST',
        success: limpiar
    });
}


/* Funciones de interaccion con Back-End */

function consultaCpostal(cpost) {
   
    console.log("Consultar " + cpost);
    $.ajax({
        url: '../consultaCpostal.htm',
        data: {codigo: cpost},
        type: 'POST',
        success: rellenarCpostal
    });
}
function rellenarCpostal(respuesta) {
    if (respuesta.length > 0) {
        poblacion = respuesta[0];
        $("#poblacion").val(poblacion.poblacion);
    }
}



