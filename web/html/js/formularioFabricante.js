/*  Listener
 *****************************************************************************/
$("document").ready(function() {

    $("#codigo").change(consultaCodigo);
    $("#logo").change(rellenarLogo);

});

/* Funciones Menú Principal
 *****************************************************************************/

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
 *****************************************************************************/

function consultaCodigo() {
    if (!vacio($("#codigo"))) {
        var codigo = this.value;
        peticionAjax('../consultaFabricante.htm', codigo, respuestaConsultaCampo);
    } else {
        borraFormulario();
    }
}

function borraFormulario() {
    var codigo=$("#codigo").val();
    $("#formulario")[0].reset();
    $("#codigo").val(codigo);    
    $("#imgLogo").attr("src", "");        
}

function respuestaCeroObjetos(){
     borraFormulario();
}

function respuestaVariosObjetos(){
    console.log("ERROR - No puede haber códigos repetidos en esta BBDD.Consultar al administrador");
}

function rellenaFormulario(obj) {
    $("#idFabricante").val(obj.idFabricante);
    $("#codigo").val(obj.codigo);
    $("#nombre").val(obj.nombre);
    $("#logo").val(obj.logo);
    $('#imgLogo').attr("src", "img/marcas/" + obj.logo);
    $("#baja").attr("disabled", false);
    updateFocusables();
}

function rellenarLogo() {
    console.log("Vamos a rellenarlo con ");//+$("#nombre").val()+".PNG");
}