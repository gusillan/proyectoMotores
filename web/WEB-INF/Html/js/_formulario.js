/* Funciones para el formulario */

$(function() {

	$("#dni").focus();

    $("#dni").blur(function(){
    	if (vacio($("#dni"))){
    		console.log("DNI vacio");
    	}else{
    		console.log("DNI "+$("#dni").val());
    		$("#dni").val(comprobarTipoDni($("#dni").val()));
    		consultarDni($("#dni").val());
    	}

    });


    $("#alta").click(function(){
    	console.log("Pulsaste boton ALTA");	
	});

    $("#baja").click(function(){
    	console.log("Pulsaste boton BAJA");	
	});

	$("#modificar").click(function(){
    	console.log("Pulsaste boton MODIFICA");	
	});

	$("#limpiar").click(function(){
    	console.log("Pulsaste boton LIMPIAR");	
	});

	$("#listados").click(function(){
    	console.log("Pulsaste boton LISTADOS");	
	});

	$("#salir").click(function(){
    	console.log("Pulsaste boton SALIR");	
	});

	$("#buscarNombre").click(function(){
    	console.log("Pulsaste boton BUSCAR POR NOMBRE");	
	});
   
});

/* Funciones de interaccion con Back-End */

function consultarDni(dni){
	if (!vacio($("#dni"))){
		console.log("Interaccion con BE "+dni);
	}else{
		$("#dni").focus();
		console.log ("DNI erroneo.No se consulta con BE");		
	}	
	
} 