

/*  Variables globales
 *********************************************************/
var confirmationOpt = {
    rootSelector: 'input[type=button]',
    title: '¿Seguro?',
    placement: 'top',
    popout: true,
    btnOkLabel: 'Si',
    btnCancelLabel: 'No'
            //btnOkIcon: '',
            //btnCancelIcon: ''
};


var focusablesPrincipales = "button, textarea, select, input:not(:disabled):not([readonly])";    //Selecionna los input, botones y textarea
var focusablesModal = ".modal tr[tabindex], .modal .g-input, .modal button";             //Selecionna los filtros, los items, y botones del modal



/*  Listener
 *********************************************************/
$("document").ready(function() {

    /* Hacer mayusculas */
    $(".g-input").blur(function() {
        this.value = this.value.toUpperCase();
    });
    $(".g-input").keyup(function() {
        this.value = this.value.toUpperCase();
    });

    /* Coloca el foco en el primer input */
    $(".g-input").first().focus();


    /* Control por flechas en los elementos enfocables*/
    $(focusablesPrincipales).addClass("g-focusable");
    $(".g-focusable").bind("keydown", focusable);
    $('#myModal').on('shown.bs.modal', function() {         // Cuando se abre el modal el control de flechas pasa al modal
        $(".g-focusable").unbind("keydown", focusable);
        $(".g-focusable").removeClass("g-focusable");
        $(focusablesModal).addClass("g-focusable");      
        $(".g-focusable").bind("keydown", focusable);
        $('.g-focusable').first().focus();
    });  
    $('#myModal').on('hidden.bs.modal', function() {        // Se cierra el modal y el control de flechas pasa al formulario principal
        $(".g-focusable").unbind("keydown", focusable);
        $(".g-focusable").removeClass("g-focusable");
        $(focusablesPrincipales).addClass("g-focusable");      
        $(".g-focusable").bind("keydown", focusable);
    });


    /* Utilizar ENTER para pasar al siguiente input*/
    $(".g-input").enterKey(function() {
        var inputs = $(".g-input");
        var index = inputs.index(this);
        inputs[index + 1].focus();
    });


    /* Botones de las funciones básicas del formulario*/
    $("#guardar").click(function() {
        if (validarFormulario()) {
            confirmationOpt.onConfirm = guardar;
            $(this).confirmation(confirmationOpt);
            $(this).confirmation('show');
        } else {
            $(this).confirmation('destroy');  //No funciona. no se elimina una vez se encuentre asignado.  
        }
    });
    $("#baja").click(function() {
        if (validarFormulario()) {
            confirmationOpt.onConfirm = baja;
            $(this).confirmation(confirmationOpt);
            $(this).confirmation('show');
        } else {
            $(this).confirmation('destroy');  //No funciona. no se elimina una vez se encuentre asignado.  
        }
    });
    $("#limpiar").click(limpiar);
    $("#listado").click(listado);
    $("#salir").click(salir);


    /* Atajos de teclado */
    $("form").keypress(function(ev) {
        var keycode = (ev.keyCode ? ev.keyCode : ev.which);
        if (ev.shiftKey) {                                       // Shift + ...
            if (keycode == '97' || keycode == '65') {           // A
                ev.preventDefault();
                guardar();
            } else if (keycode == '98' || keycode == '66') {     // B
                ev.preventDefault();
                baja();
            } else if (keycode == '108' || keycode == '76') {    // L
                ev.preventDefault();
                limpiar();
            } else if (keycode == '115' || keycode == '83') {    // S
                ev.preventDefault();
                salir();
            }
        }
    });

});



function validarFormulario() {
    var value = true;
    $(".g-input").each(function(index) {
        if (!this.validity.valid) {
            $(this).popover({template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title o-popover-title"></h3><div class="popover-content o-popover-content"></div></div>', trigger: "focus"});
            $(this).popover('show');
            value = false;
            console.log("Formulario No valido");
            return false;
        }
    });
    if (value) {
        console.log("Formulario OK");
        return true;
    } else {
        return false;
    }
}



function vacio(campo) {
    if (campo.val()=="" || campo.val() == null || /^\s*$/.test(campo.val())) {
        return true;
    } else {
        return false;
    }
}



function limpiar() {
    $("form")[0].reset();
    $(".g-img").attr("src", "");
    $(".g-hideByDefault").addClass("g-hide");
    $(".g-input").first().focus();
    $("#baja").attr("disabled", true);
}



function salir() {
    console.log("Pulsado el boton de SALIR");
    window.history.back();
}



/*  Helpers
 *********************************************************/
function focusable(ev){                                            //Funcion para moverte con las flechas arriba y abajo
    var keycode = (ev.keyCode ? ev.keyCode : ev.which);
    if (keycode == '38' || keycode == '40') {
        ev.preventDefault();
        var items = $(".g-focusable");
        var index = items.index(this);        
        if (keycode == '38' && index >= 1 ) {
            items[index - 1].focus();
        }else if(keycode == '40' && index < items.length-1 ) {
            ev.preventDefault();
            items[index + 1].focus();
        }
    }
};




/*  Plugins para Jquery
 *********************************************************/
$.fn.enterKey = function(fnc) {
    return this.each(function() {
        $(this).keypress(function(ev) {
            var keycode = (ev.keyCode ? ev.keyCode : ev.which);
            if (keycode == '13') {
                fnc.call(this, ev);
            }
        });
    });
};


