
/*  Listener
 *********************************************************/
$("document").ready(function() {


    $("#fechaMatricula").mask("99/99/9999"); // sin lineas("99/9999", {placeholder: " "})
   
    $("#matricula").blur(consultaMatricula);
    $("#codigoModelo").blur(consultaModelo);
    $("#codigoMotor").blur(consultaMotor);   



});

function consultaMatricula(){
   
    var matricula = $("#matricula").val();
    
    console.log ("Vamos a consultar la matricula "+matricula);
    if (!vacio($("#matricula"))){
       $.getJSON(
           '../consultaMatricula.htm',
           {matricula : matricula},
            respuestaConsultaMatricula);        
    }else{
        console.log ("Campo de matrícula vacio");
    }
    
}

function consultaModelo(){
    
}
function consultaMotor(){
    
}

function respuestaConsultaMatricula(listaObjetos){
    if (listaObjetos.length == 1){
        var objeto = listaObjetos[0];
        rellenaFormulario(objeto);
    }else if (listaObjetos.length >1 ){
        console.log("Existen varias vehiculos son la misma matrícula.Consultar con el administrador de la BBDD");
    }else if( listaObjetos.length<1){
        console.log("No existe ningun vehiculo con esta matricula ");
    }
}

function rellenaFormulario(obj){
    $("#chasis").val(obj.chasis);
    $("#codigoModelo").val(obj.modelo.codigo);
    $("#descripcionModelo").val(obj.modelo.descripcion);
    $("#codigoMotor").val(obj.motor.codigo);
    $("#descripcionMotor").val(obj.motor.descripcion);
    $("#fechaMatricula").val(obj.fechaMatricula);
    $("#codigoCliente").val(obj.entidad.idEntidad);
    $("#nombreCliente").val(obj.entidad.nombre);
    $("#informacion").val(obj.informacion);    
}
