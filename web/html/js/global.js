/****** Funciones comunes ******/


$("document").ready(function() {

    /* Hacer mayusculas */
    $(".g-input").blur(function() {
        this.value = this.value.toUpperCase();
    });
    $(".g-input").keyup(function() {
        this.value = this.value.toUpperCase();
    });
    /* Utilizar ENTER para pasar de un campo a otro */
    $(".g-input").enterKey(function() {
        var inputs = $(".g-input")
        var index = inputs.index(this);
        inputs[index + 1].focus();
    });
    /* Coloca el foco en el primer input */
    $(".g-input").first().focus();


    /* Comprueba los botones con funciones básicas */
    $("#alta").click(alta);
    $("#baja").click(baja);
    $("#modificar").click(modificar);
    $("#limpiar").click(limpiar);
    $("#listado").click(listado);
    $("#salir").click(salir);

    /* Atajos de teclado */
    $("form").keypress(function(ev) {
        var keycode = (ev.keyCode ? ev.keyCode : ev.which);
        if (ev.shiftKey){                                       // Shift + ...
            if (keycode == '97' || keycode == '65') {           // A
                ev.preventDefault();
                alta();               
            }else if (keycode == '98' || keycode == '66') {     // B
                ev.preventDefault();
                baja();
            }else if (keycode == '109' || keycode == '77') {    // M
                ev.preventDefault();
                modificar();
            }else if (keycode == '108' || keycode == '76') {    // L
                ev.preventDefault();
                limpiar();
            }else if (keycode == '115' || keycode == '83') {    // S
                ev.preventDefault();
                salir();
            }            
        }
    });
});


function validarFormulario() {
    var value = true
    $(".g-input").each(function(index) {
        if (!this.validity.valid) {
            $(this).popover({template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title o-popover-title"></h3><div class="popover-content o-popover-content"></div></div>', trigger: "focus"});
            $(this).popover('show');
            value = false;
            return false;
        }
    });
    if (value) {
        console.log("Formulario OK");
        console.log("Pasamos a dar de alta...");
        return true;
    }
}

function vacio(dato) {
    if (dato.length < 1) {
        return true;
    } else {
        return false;
    }
}
function limpiar() {
    $("form")[0].reset();
    $(".g-input").first().focus();
}

function salir() {
    console.log("Pulsado el boton de SALIR");
    window.history.back();
}


/*  Plugins para Jquery
 *********************************************************/
$.fn.enterKey = function(fnc) {
    return this.each(function() {
        $(this).keypress(function(ev) {
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
