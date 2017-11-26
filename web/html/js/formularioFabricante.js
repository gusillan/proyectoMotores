

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

function limpiar() {
    $("#formFabricante")[0].reset();
    $("#codigo").focus();
}
