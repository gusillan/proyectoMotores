/****** Funciones comunes ******/



$("document").ready(function(){


    /*hacer mayusculas*/
    $(".g-input").blur(function(){
        this.value = this.value.toUpperCase();
    });
    $(".g-input").keyup(function(){
        this.value = this.value.toUpperCase();
    });


    $(".g-input").on('valid', function(){
        console.log("validando");
    });


    /*comprueba las validaciones html*/
    $("#alta").click(function(){ 
        var value = true
        $( ".g-input" ).each(function( index ) {
            if( !this.validity.valid ){
                console.log("Hay algun campo incorrecto");
                var mensajeValidacion = "Complete el campo correctamente"
                $(this).popover({content:mensajeValidacion, trigger:"focus"});
                $(this).popover('show');
                value = false;
                return false;
            }
        });
        if (value){
            console.log("Todo OK"); 
        }
    });
    $("#baja").click(baja);
    $("#modificar").click(modificar);
    $("#limpiar").click(limpiar);
    $("#listados").click(listados);
    $("#salir").click(salir);

});

function vacio(dato) {
    if (dato.length < 1) {
        return true;
    } else {
        return false;
    }
}

function baja(){
    console.log("Pulsado el boton de BAJA");
    
}

function modificar(){
    console.log("Pulsado el boton de MODIFICAR");
    
}

function limpiar(){
    console.log("Pulsado el boton de LIMPIAR");
}

function listados(){
    console.log("Pulsado el boton de LISTADOS");
}

function salir(){
    console.log("Pulsado el boton de SALIR");
    window.history.back();
}