/* Listener
 * ****************************************************************************/

$(function() {

    $("#codigo").focus();
    $("#codigo").change(consultaCpostal);
    
});

/* Funciones Menú Principal
 ******************************************************************************/

function guardar(){
    if (validarFormulario()){
        envioFormulario('../guardaCpostal.htm');
    }else{
        console.log("ERROR - Formulario no válido");
    }
}

function baja(){
    envioFormulario('../bajaCpostal.htm');
}


/* Funciones principales
 ******************************************************************************/

function consultaCpostal() {
    
    if (!vacio($("#codigo"))){
        var codigo = this.value;
        peticionAjax('../consultaCpostal.htm',codigo,respuestaConsultaCampo);
    }
}
    function borraFormulario(){
        $("#poblacion").val("");
    }
    
    function respuestaCeroObjetos(){
        borraFormulario();
    }
    
    function respuestaVariosObjetos(){
        console.log("ERROR - No puede haber codigos postales duplicados");
    }
    
function rellenaFormulario(obj) {       
        $("#poblacion").val(obj.poblacion);
        $("#baja").attr("disabled", false);
        updateFocusables();
    }




