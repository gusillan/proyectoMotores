/*  Listener
 ******************************************************************************/
$("document").ready(function() {

    $("#codigoFabricante").change(consultaCodigoFabricante);

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
function consultaCodigoFabricante(){
    if(!vacio($("#codigoFabricante"))){
        var codigoFabricante = this.value;
        peticionAjax("../consultaFabricante.htm",codigoFabricante,respuestaConsultaFabricante);
    }else{
        borraFormularioFabricante();
    }
}
function respuestaConsultaFabricante(listaFabricantes){
    if (listaFabricantes.length === 1){
        var fabricante = listaFabricantes[0];
        rellenaFormularioFabricante(fabricante);
    }else if (listaFabricantes.length>1){
        console.log("ERROR - No puede haber codigos repetidos.Consulte al administrador de la BBDD");
    }else if (listaFabricantes.length<1){
        console.log("No existe ningun fabricante con ese codigo"); // Borrar
        borraFormularioFabricante();
        desactivarBajaFabricante();
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
