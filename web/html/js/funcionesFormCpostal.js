/* Funciones para el formulario */

$(function() {

	$("#codigo").focus();

    $("#codigo").blur(function(){
    	if (vacio($("#codigo"))){
    		console.log("Codigo Postal vacio");
    	}else{
    		console.log("Codigo "+$("#codigo").val());
    		consultarCpostal($("#codigo").val());
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

function consultarCpostal(cpostal){
	if (!vacio($("#codigo"))){
		console.log("Interaccion con BE "+cpostal);
                 $.getJSON('../consultaCpostal.htm', {codigo: cpostal}, procesaRespuesta);
	}else{
		$("#codigo").focus();
		console.log ("CPOstal erroneo.No se consulta con BE");		
	}	
	
} 

function procesaRespuesta(){
    console.log("procesando...");
}