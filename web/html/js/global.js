

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
    $(".g-input[type=text]").blur(function() {
        this.value = this.value.toUpperCase();
    });
    $(".g-input[type=text]").keyup(function() {
        this.value = this.value.toUpperCase();
    });

    $(".g-input[type=date]").on("change", function() {
        this.setAttribute(
                "data-date",
                moment(this.value, "YYYY-MM-DD")
                .format("DD/MM/YYYY")
                )
    });

    // Refresca que elementos son enfocables y pone el foco en el primero;
    updateFocusables();
    $(".g-focusable").first().focus();


    /* Utilizar ENTER para pasar al siguiente input*/
    $(".g-input, .g-select").enterKey(function() {
        var inputs = $(".g-input, .g-select");
        var index = inputs.index(this);
        if (index < inputs.length-1)
        	inputs[index + 1].focus();
    });
    $(".g-select").change(function() {
        var inputs = $(".g-input, .g-select");
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
    $("#volver").click(volver);
    $("#inicio").click(inicio);


    /* Atajos de teclado */
    $("body").keypress(function(ev) {
        var keycode = (ev.keyCode ? ev.keyCode : ev.which);
        if (ev.shiftKey) {                                       // Shift + ...
            if (keycode == '103' || keycode == '71') {           // G
                ev.preventDefault();
                guardar();
            } else if (keycode == '98' || keycode == '66') {     // B
                ev.preventDefault();
                baja();
            } else if (keycode == '108' || keycode == '76') {    // L
                ev.preventDefault();
                limpiar();
            } else if (keycode == '118' || keycode == '86') {    // V
                ev.preventDefault();
                volver();
            } else if (keycode == '105' || keycode == '73') {    // I
                ev.preventDefault();
                inicio();
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
    if (campo.val() == "" || campo.val() == null || /^\s*$/.test(campo.val())) {
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



function volver() {
    console.log("Pulsado el boton de VOLVER");
    window.history.back();
}

function inicio() {
    window.location = "../index.htm";
}





/*  Mover el foco con las flechas
 *********************************************************/
var focusablesPrincipales = "button:not(:disabled), textarea, select, input:not(:disabled):not([readonly])";
var focusablesModal = ".modal tr[tabindex]:visible, .modal .g-input, .modal button";
function updateFocusables() {                                   //Funciona para actualizar los elementos enfocables
    if ($('.modal').is(':visible')) {
        $(".g-focusable").off("keydown", focusableMove);
        $(".g-focusable").removeClass("g-focusable");
        $(focusablesModal).addClass("g-focusable");
        $(".g-focusable").on("keydown", focusableMove);
    } else {
        $(".g-focusable").off("keydown", focusableMove);
        $(".g-focusable").removeClass("g-focusable");
        $(focusablesPrincipales).addClass("g-focusable");
        $(".g-focusable").on("keydown", focusableMove);
    }
}
function focusableMove(ev) {                                    //flechas arriba y abajo
    var keycode = (ev.keyCode ? ev.keyCode : ev.which);
    if (keycode == '38' || keycode == '40') {
        ev.preventDefault();
        var items = $(".g-focusable");
        var index = items.index(this);
        if (keycode == '38' && index >= 1) {
            items[index - 1].focus();
        } else if (keycode == '40' && index < items.length - 1) {
            ev.preventDefault();
            items[index + 1].focus();
        }
    }
}
;




/*  Ventana emergente (modal)
 *********************************************************/
function VentanaEmergente(opciones) {

    /*    this.opciones = $.extend({
     modal   : 'miModal', 
     titulo  : 'Titulo',
     campos  : ['Campo1','Campo2','Campo3'],
     campoID : 'Campo1',
     filtros : ['Campo1'],
     callback: mycallback
     }, opciones);*/
    this.modal = opciones.modal;
    this.titulo = opciones.titulo;
    this.campos = opciones.campos;
    this.campoID = opciones.campoID;
    this.filtros = opciones.filtros;
    if (opciones.callback) {
        this.callback = opciones.callback;
    } else {
        this.callback = rellenaFormulario;
    }

    this.json = {};
    this.arrayID = [];

    //Meter en una var this porque los listener utilizan this como el objeto que los ha llamado
    var miVentana = this;

    //Para este constructor hay que utilizar opciones porque this no funciona aqui.
    $.get("ventanaEmergente.html", function(data) {
        ventanaEmergente = data.replace(/@modal/g, opciones.modal);
        ventanaEmergente = ventanaEmergente.replace(/@titulo/g, opciones.titulo);

        $('body').append(ventanaEmergente);
        var head = '';
        width = 100 / opciones.campos.length;
        for (var i = 0; i < opciones.campos.length; i++) {
            head += '<th style="width: ' + width + '%;">' + capitalize(opciones.campos[i]) + '</th>';
        }
        $('#' + opciones.modal + '-head').html(head);


        //crear filtros
        if (opciones.filtros.length >= 1) {
            var columnasFiltros = 12 / opciones.filtros.length;
            var filtros = '';
            for (var i = 0; i < opciones.filtros.length; i++) {
                var nombreFiltro = opciones.modal + '-' + opciones.filtros[i];
                filtros += '<div class="col-md-' + columnasFiltros + '"><div class="form-group">';
                filtros += '<label for="' + nombreFiltro + '">' + capitalize(opciones.filtros[i]) + '</label>'
                filtros += '<input type="text" class="form-control g-input ' + opciones.modal + '-filter" id="' + nombreFiltro + '" name="' + nombreFiltro + '">'
                filtros += '</div></div>';
            }
            $('#' + opciones.modal + '-filtros').html(filtros);
        }

        $('.' + opciones.modal + '-filter').keyup(function() {
            this.value = this.value.toUpperCase();
            miVentana.filtrar();
        });


        //listener iniciales
        $('#' + opciones.modal).on('shown.bs.modal', function() {
            updateFocusables();
            $('#' + opciones.modal + '-items tr')[0].focus();
        });
        $('#' + opciones.modal).on('hidden.bs.modal', function() {
            $(".modeloModal-filter").each(function() {
                this.value = "";
            });
            $('#' + opciones.modal + '-cantidadFiltrada').text("");
            updateFocusables();
            $(".g-focusable").first().focus();
        });
        $('#' + opciones.modal + '-cancelar').click(function() {
            $('#' + opciones.modal).modal('hide');
            $('#' + opciones.modal + '-items tr').remove();
        });

    });


}
;



VentanaEmergente.prototype.filtrar = function() {
    var json = this.json;
    var modal = this.modal;
    var campoID = this.campoID;
    var filtros = this.filtros;


    for (var i = 0; i < json.length; i++) {
        var valCampoID = json[i][campoID];
        $('#' + modal + '-items tr[data-' + campoID + '="' + valCampoID + '"]').show();
        for (var j = 0; j < filtros.length; j++) {
            var nombreFiltro = modal + '-' + filtros[j];
            stringValue = String(json[i][filtros[j]]);
            if (!stringValue.includes($('#' + nombreFiltro).val())) {
                $('#' + modal + '-items tr[data-' + campoID + '="' + valCampoID + '"]').hide();
                continue;
            }
        }
    }

    var cantidadFiltrada = $('#' + modal + '-items tr:visible').length;
    if (cantidadFiltrada < json.length) {
        $('#' + modal + '-cantidadFiltrada').text(cantidadFiltrada + " de ");
    } else {
        $('#' + modal + '-cantidadFiltrada').text("");
    }

    $('#' + modal + '-items tr').removeClass("striped");
    $('#' + modal + '-items tr:visible:odd').addClass("striped");

    updateFocusables();
}


VentanaEmergente.prototype.abrir = function(json) {
    this.json = json;
    var modal = this.modal;
    var campoID = this.campoID;
    var callback = this.callback;

    //validar
    for (var i = this.campos.length - 1; i >= 0; i--) {
        if (!json[0].hasOwnProperty(this.campos[i])) {
            console.error("El campo '" + this.campos[i] + "'del modal no se encuentra en el Json recibido");
            return 1;
        } else {
            console.log("El campo", this.campos[i], " es correcto");
        }
    }
    if (!json[0].hasOwnProperty(this.campoID)) {
        console.error("El campoID '" + this.campoID + "'del modal no se encuentra en el Json recibido");
        return 1;
    }

    //crear lista html
    var lista = '';
    $('#' + modal + '-cantidad').text(json.length + " ");
    width = 100 / this.campos.length;
    for (var i = 0; i < json.length; i++) {
        lista += '<tr data-' + this.campoID + '="' + json[i][this.campoID] + '" tabindex="0">';
        for (var j = 0; j < this.campos.length; j++) {
            lista += '<td  style="width: ' + width + '%;">' + json[i][this.campos[j]] + '</td>';
        }
        lista += '</tr>';
    }

    $('#' + modal + '-items').html(lista);
    $('#' + modal + '-items tr:odd').addClass("striped");
    $('#' + modal).modal('show');


    //Una vez puesto los elementos en el html se pone el listener de los elem de la lista
    $('#' + modal + '-items tr').dblclick(function() {
        var seleccionCampoID = $(this).attr("data-" + campoID);
        for (var i = 0; i < json.length; i++) {
            if (json[i][campoID] == seleccionCampoID) {
                //rellenaFormulario();
                callback(json[i]);
                $('#' + modal).modal('hide');
                $('#' + modal + '-items tr').remove();
            }
        }
    });
    $('#' + modal + '-seleccionar').click(function() {
        var seleccionCampoID = $('#' + modal + '-items tr.o-selected').attr("data-" + campoID);
        for (var i = 0; i < json.length; i++) {
            if (json[i][campoID] == seleccionCampoID) {
                //rellenaFormulario();
                callback(json[i]);
                $('#' + modal).modal('hide');
                $('#' + modal + '-items tr').remove();
            }
        }
    });


    $('#' + modal + '-items tr').click(function() {
        $('#' + modal + '-items tr').removeClass("o-selected");
        $(this).addClass("o-selected");
    });
    $('#' + modal + '-items tr').enterKey(function() {
        $('#' + modal + '-items tr').removeClass("o-selected");
        $(this).addClass("o-selected");
    });

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

/*  Helpers
 *********************************************************/
//Poner en mayuscula la primera letra del string
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
// Funcion para obtencion de atributos de la URL 

function getQueryVariable(variable){
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return(false);
}
