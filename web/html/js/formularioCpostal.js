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
    
    /**if (!vacio($("#codigo"))){
        var codigo = this.value;
        peticionAjax('../consultaCpostal.htm',codigo,respuestaConsultaCampo);
    }
}**/
    
    if (!vacio($("#codigo"))) {
        var codigo = this.value;
        console.log("Consultamos " + codigo);  //Borrar
        promesa = peticionAjax('../consultaCpostal.htm', codigo);
        promesa.then(function(listaCpostal) {
            if (listaCpostal.length === 1) {
                var Cpostal = listaCpostal[0];
                console.log("hay 1");
                rellenaFormularioCpostal(Cpostal);
            } else if (listaCpostal.length > 1) {
                console.log("ERROR - No puede haber codigos postales repetidos.Consulte al administrador de la BBDD");
            } else if (listaCpostal.length < 1) {
                console.log("No existe ningun Codigo Postale con ese codigo"); // Borrar
                borraFormularioCpostal();
                desactivarCpostal();
            }
        })
    } else {
        borraFormularioCpostal();
    }
}

    
    function borraFormularioCpostal(){
        $("#poblacion").val("");
    }
    
    function respuestaCeroObjetos(){
        borraFormulario();
    }
    
    function respuestaVariosObjetos(){
        console.log("ERROR - No puede haber codigos postales duplicados");
    }
    
function rellenaFormularioCpostal(obj) {       
        $("#poblacion").val(obj.poblacion);
        $("#baja").attr("disabled", false);
        updateFocusables();
    }




