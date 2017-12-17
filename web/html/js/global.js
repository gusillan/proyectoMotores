

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


    // Refresca que elementos son enfocables y pone el foco en el primero;
    updateFocusables();
    $(".g-focusable").first().focus();



    //Acciones cuando se abre y se cierra el modal
    $('#myModal').on('shown.bs.modal', function() {         // Cuando se abre el modal el control de flechas pasa al modal
        updateFocusables();
        $('.g-focusable').first().focus();
    });  
    $('#myModal').on('hidden.bs.modal', function() {        // Se cierra el modal y el control de flechas pasa al formulario principal
        updateFocusables();
        $('.g-focusable').first().focus();
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
    $(".g-hideByDefault").hide();
    $(".g-hideByDefault input").attr("disabled", true);
    $("#baja").attr("disabled", true);
    updateFocusables();
    $(".g-focusable").first().focus();
}



function salir() {
    console.log("Pulsado el boton de SALIR");
    window.history.back();
}





/*  Mover el foco con las flechas
 *********************************************************/
var focusablesPrincipales = "button:not(:disabled), textarea, select, input:not(:disabled):not([readonly])";
var focusablesModal = ".modal tr[tabindex]:visible, .modal .g-input, .modal button";
function updateFocusables(){                                   //Funciona para actualizar los elementos enfocables
    if ( $('#myModal').is(':visible') ){
        $(".g-focusable").off("keydown", focusableMove);
        $(".g-focusable").removeClass("g-focusable");
        $(focusablesModal).addClass("g-focusable");      
        $(".g-focusable").on("keydown", focusableMove);
    }else{
        $(".g-focusable").off("keydown", focusableMove);
        $(".g-focusable").removeClass("g-focusable");
        $(focusablesPrincipales).addClass("g-focusable");      
        $(".g-focusable").on("keydown", focusableMove);
    }
}
function focusableMove(ev){                                    //flechas arriba y abajo
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




/*  Ventana emergente (modal)
 *********************************************************/
function VentanaEmergente(opciones){

    var conf = $.extend({
        modal   : 'miModal', 
        titulo  : 'Titulo',
        campos  : ['Campo1','Campo2','Campo3'],
        campoID : 'Campo1',
        filtros : ['Campo1']
    }, opciones);


    //$( "#b" ).load( "article.html #target" );
    $.get("ventanaEmergente.html", function(data){
        ventanaEmergente = data.replace(/@modal/g, conf.modal);
        ventanaEmergente = ventanaEmergente.replace(/@titulo/g, conf.titulo);

        $('body').append(ventanaEmergente);
        var head = '';
        for (var i = 0; i < conf.campos.length; i++) {
            head += '<th>'+capitalize( conf.campos[i] )+'</th>';
        }
        $('#'+conf.modal+'-head').html(head);

    });


};

function rellenarVentanaEmergente(lista, modal){
    var items = [];
    //$("#cantidad").text("("+clientesJson.length+")");
    for (var i = 0; i < clientesJson.length; i++) {
        items.push('<tr data-idEntidad="' + clientesJson[i].idEntidad
                + '" tabindex="0"><td>' + clientesJson[i].nombre
                + '</td"><td>' + clientesJson[i].poblacion
                + '</td></tr>'
                );
    }
    $("#tableItems").append(items);
    $('#tableItems tr:odd').addClass("striped");

    //Una vez puesto los elementos en el html se pone el listener
    $("#tableItems tr").dblclick(function() {
        idEntidad = $(this).attr("data-idEntidad");
        for (var i = 0; i < clientesJson.length; i++) {
            if (clientesJson[i].idEntidad == idEntidad) {
                rellenaFormulario(clientesJson[i]);
                $('#myModal').modal('hide');
                $("#tableItems tr").remove();
            }
        }
    });
    $("#tableItems tr").click(function() {
        $("#tableItems tr").removeClass("o-selected");
        $(this).addClass("o-selected");
    });
    $("#tableItems tr").enterKey(function() {
        $("#tableItems tr").removeClass("o-selected");
        $(this).addClass("o-selected");
    });

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
        });
    });
};



/*  Helpers
 *********************************************************/
//Poner en mayuscula la primera letra del string
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}