/****** Funciones comunes ******/



$("document").ready(function(){


    /*hacer mayusculas*/
    $(".g-input").blur(function(){
        this.value = this.value.toUpperCase();
    });
    $(".g-input").keyup(function(){
        this.value = this.value.toUpperCase();
    });



    /*comprueba las validaciones html*/
    $("#alta").click(function(){ 
        validarFormulario();
    });
    $("#baja").click(baja);
    $("#modificar").click(modificar);
    $("#limpiar").click(limpiar);
    $("#listados").click(listados);
    $("#salir").click(salir);

});


function validarFormulario(){
    var value = true
    $( ".g-input" ).each(function( index ) {
        if( !this.validity.valid ){
/*            console.log("Hay algun campo incorrecto");
            var mensajeValidacion=""
            if (this.value == "") {
                mensajeValidacion = "Campo vacio"
            }else if (true) {}{
                mensajeValidacion = "Complete el campo correctamente"
            }
*/

            $(this).popover({template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title o-popover-title"></h3><div class="popover-content o-popover-content"></div></div>', trigger:"focus"});
            $(this).popover('show');
            value = false;
            return false;
        }
    });
    if (value){
        console.log("Todo OK"); 
    }
}



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



/*  Plugins para Jquery
 *********************************************************/
$.fn.enterKey = function (fnc) {
    return this.each(function () {
        $(this).keypress(function (ev) {
            var keycode = (ev.keyCode ? ev.keyCode : ev.which);
            if (keycode == '13') {
                fnc.call(this, ev);
            }
        })
    })
}

//USO
/*$("#input").enterKey(function () {
    alert('Enter!');
});*/