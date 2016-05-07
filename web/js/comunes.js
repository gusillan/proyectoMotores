function prueba(){
	var codigo = document.getElementById('codigo').value;
	var descripcion = document.getElementById('descripcion').value;
	var tipoCombustible = $('#comb').val();
	 
	console.log("codigo "+ codigo);
	console.log("descripcion "+ descripcion);
	console.log("tipo combustible "+tipoCombustible);
}



function envio(){
    $.getJSON("pruebaListaMotores.htm",function(data){
        console.log(data);
        console.log(data[0].descripcion+data[0].codigo);
        
    });
}

/*function comprobar(){
    console.log("enviar "+$('#codigo').val());
    $.getJSON("pruebaGetMotor.htm",function(data){
        console.log(data);
        console.log(data.descripcion);
        
    });
}*/

angular.module("motores",[])
    .controller("controladorFormulario",function($scope,$http){
        var motor = {};
        $scope.comprobar = function(){
        $http.post("pruebaGetMotor.htm",$('#codigo').val())
            .success(function(data){
                console.log(data);
                $scope.motor = data;
            })
            .error(function(err){
        
            });
            
        };
        /*$scope.alta = function(){
            alert("alta");
        };*/
        $scope.alta = function(){
            
            $http.post("pruebaAltaMotor.htm",$scope.motor)
            .success(function(data){
                    console.log(data);
            })
            .error(function(err){
        
            });
        };
    });




/*function envio(){
	$.ajax({
		url :'pruebaListaMotores.htm',
		data : {dato : 1234},
		type : 'POST',
		dataType : 'json',
		sucess : function(json){
                        alert(json);
			console.log(json);
		},
		error : function(xhr,status){
			alert("Error");
		},
		complete : function(xhr,status){
			alert("peticion realizada");
		}
	});
}*/