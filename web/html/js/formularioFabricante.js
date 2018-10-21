/*  Listener
 ******************************************************************************/
$("document").ready(function() {

    $("#codigoFabricante").change(consultaFabricante);

});

/* Funciones Menú Principal
 ******************************************************************************/

function guardar() {
    if (validarFormulario()) {
        envioFormulario('../guardaFabricante.htm');
    } else {
        console.log("ERROR - Formulario no válido");
    }
}

function baja() {
    envioFormulario('../bajaFabricante.htm');
}

/* Funciones adicionales
 ******************************************************************************/
function consultaFabricante() {
    if (!vacio($("#codigoFabricante"))) {
        var fabricante = this.value;
        console.log("Consultamos " + fabricante);  //Borrar
        promesa = peticionAjax('../consultaFabricante.htm', fabricante);
        promesa.then(function(listaFabricantes) {
            if (listaFabricantes.length === 1) {
                var fabricante = listaFabricantes[0];
                rellenaFormularioFabricante(fabricante);
            } else if (listaFabricantes.length > 1) {
                console.log("ERROR - No puede haber codigos repetidos.Consulte al administrador de la BBDD");
            } else if (listaFabricantes.length < 1) {
                console.log("No existe ningun fabricante con ese codigo"); // Borrar
                borraFormularioFabricante();
                desactivarBajaFabricante();
            }
        })
    } else {
        borraFormularioFabricante();
    }
}

function rellenaFormularioFabricante(fabricante) {
    $("#idFabricante").val(fabricante.idFabricante);
    $("#codigoFabricante").val(fabricante.codigoFabricante);
    $("#nombreFabricante").val(fabricante.nombreFabricante);
    $("#logoFabricante").val(fabricante.logoFabricante);
    $('#imgLogo').attr("src", "img/marcas/" + fabricante.logoFabricante);
    activarBajaFabricante();
    updateFocusables();
}

function borraFormularioFabricante() {
    var codigoFabricante = $("#codigoFabricante").val();
    $("#formulario")[0].reset();
    $("#codigoFabricante").val(codigoFabricante);
    $("#imgLogo").attr("src", "");
}

function desactivarBajaFabricante() {
    $("#baja").attr("disabled", true);
}

function activarBajaFabricante() {
    $("#baja").attr("disabled", false);
}
