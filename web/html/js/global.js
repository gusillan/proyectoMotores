/****** Funciones comunes ******/



$("document").ready(function(){


    /*hacer mayusculas*/
    $(".g-input").blur(function(){
        this.value = this.value.toUpperCase();
    });
    $(".g-input").keyup(function(){
        this.value = this.value.toUpperCase();
    });
    $(".g-input").enterKey(function(){
        var inputs = $(".g-input")
        var index = inputs.index(this);
        inputs[index+1].focus();
    });
    $(".g-input").first().focus();


    /*comprueba las validaciones html*/
    $("#alta").click(validarFormulario);
    $("#baja").click(baja);
    $("#modificar").click(modificar);
    $("#limpiar").click(limpiar);
    $("#listados").click(listados);
    $("#salir").click(salir);


    $("form").keypress(function (ev) {
        var keycode = (ev.keyCode ? ev.keyCode : ev.which);
        if (ev.shiftKey){                                       // Shift + ...
            ev.preventDefault();
            if (keycode == '97' || keycode == '65') {           // A
                alta();
            }else if (keycode == '98' || keycode == '66') {     // B
                baja();
            }else if (keycode == '109' || keycode == '77') {    // M
                modificar();
            }else if (keycode == '108' || keycode == '76') {    // L
                limpiar();
            }else if (keycode == '115' || keycode == '83') {    // S
                salir();
            }
        }
    });

});


function validarFormulario(){
    var value = true
    $( ".g-input" ).each(function( index ) {
        if( !this.validity.valid ){
            $(this).popover({template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title o-popover-title"></h3><div class="popover-content o-popover-content"></div></div>', trigger:"focus"});
            $(this).popover('show');
            value = false;
            return false;
        }
    });
    if (value){
        console.log("Todo OK");
        console.log("Pasamos a dar de alta...");
        alta();
    }
}



function vacio(dato) {
    if (dato.length < 1) {
        return true;
    } else {
        return false;
    }
}



function alta(){
    console.log("Pulsado el boton de ALTA");   
}

function baja(){
    console.log("Pulsado el boton de BAJA");   
}

function modificar(){
    console.log("Pulsado el boton de MODIFICAR"); 
}

function limpiar(){
    console.log("Pulsado el boton de LIMPIAR");
    $('form')[0].reset();
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
