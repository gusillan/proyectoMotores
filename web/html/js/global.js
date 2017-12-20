

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

/*    this.opciones = $.extend({
        modal   : 'miModal', 
        titulo  : 'Titulo',
        campos  : ['Campo1','Campo2','Campo3'],
        campoID : 'Campo1',
        filtros : ['Campo1']
    }, opciones);*/

    this.modal = opciones.modal;
    this.titulo = opciones.titulo;
    this.campos = opciones.campos;
    this.campoID = opciones.campoID;
    this.filtros = opciones.filtros;

    this.json = {};


    //Para este constructor hay que utilizar opciones porque this no funciona aqui.
    //$( "#b" ).load( "article.html #target" );
    $.get("ventanaEmergente.html", function(data){
        ventanaEmergente = data.replace(/@modal/g, opciones.modal);
        ventanaEmergente = ventanaEmergente.replace(/@titulo/g, opciones.titulo);

        $('body').append(ventanaEmergente);
        var head = '';
        for (var i = 0; i < opciones.campos.length; i++) {
            head += '<th>'+capitalize( opciones.campos[i] )+'</th>';
        }
        $('#'+opciones.modal+'-head').html(head);
     
        //listener iniciales
        $('#'+opciones.modal).on('shown.bs.modal', function() {
            $('#'+opciones.modal+'-items tr')[0].focus();
        });
        $('#'+opciones.modal).on('hidden.bs.modal', function() {
            $(".g-focusable").first().focus();
        });
        $('#'+opciones.modal+'-cancelar').click(function() {
            $('#'+opciones.modal).modal('hide');
            $('#'+opciones.modal+'-items tr').remove();
        });

    });

};

VentanaEmergente.prototype.abrir = function( json ) {
    console.log('Abrir ' + this.modal);
    this.json = json;
    var modal = this.modal;
    var campoID = this.campoID;

    //validar
    for (var i = this.campos.length - 1; i >= 0; i--) {
        if(! json[0].hasOwnProperty( this.campos[i] ) ){
            console.error("El campo '"+this.campos[i]+"'del modal no se encuentra en el Json recibido");
            return 1;
        }else{
            console.log("El campo",this.campos[i]," es correcto");
        }
    }
    if(! json[0].hasOwnProperty( this.campoID ) ){
        console.error("El campoID '"+this.campoID+"'del modal no se encuentra en el Json recibido");
        return 1;
    }

    //crear lista html
    var lista = '';
    $('#'+modal+'-cantidad').text(json.length+" ");
    for (var i = 0; i < json.length; i++) {
        lista += '<tr data-'+this.campoID+'="' + json[i][this.campoID]+ '" tabindex="0">';
        for (var j = 0; j < this.campos.length; j++) {
            lista += '<td>' + json[i][this.campos[j]] + '</td>';
        }
        lista += '</tr>';
    }

    $('#'+modal+'-items').html(lista);
    $('#'+modal+'-items tr:odd').addClass("striped");
    $('#'+modal).modal('show');



    //Una vez puesto los elementos en el html se pone el listener de los elem de la lista
    $('#'+modal+'-items tr').dblclick(function() {
        var seleccionCampoID = $(this).attr("data-"+campoID);
        for (var i = 0; i < json.length; i++) {
            if (json[i][campoID] == seleccionCampoID) {
                rellenaFormulario(json[i]);
                $('#'+modal).modal('hide');
                $('#'+modal+'-items tr').remove();
            }
        }
    });
    $('#'+modal+'-seleccionar').click(function() {
        var seleccionCampoID = $('#'+modal+'-items tr.o-selected').attr("data-"+campoID);
        for (var i = 0; i < json.length; i++) {
            if (json[i][campoID] == seleccionCampoID) {
                rellenaFormulario(json[i]);
                $('#'+modal).modal('hide');
                $('#'+modal+'-items tr').remove();
            }
        }
    }); 


    $('#'+modal+'-items tr').click(function() {
        $('#'+modal+'-items tr').removeClass("o-selected");
        $(this).addClass("o-selected");
    });
    $('#'+modal+'-items tr').enterKey(function() {
        $('#'+modal+'-items tr').removeClass("o-selected");
        $(this).addClass("o-selected");
    });

};
/*VentanaEmergente.prototype.cerrar = function() {
    console.log('Cerrar ' + this.modal);
};
VentanaEmergente.prototype.filtrar = function() {
    console.log('Filtrar ' + this.modal);
};
*/



function rellenarVentanaEmergente(lista, modal){
    var items = [];
    //$("#cantidad").text("("+json.length+")");
    for (var i = 0; i < json.length; i++) {
        items.push('<tr data-idEntidad="' + json[i].idEntidad
                + '" tabindex="0"><td>' + json[i].nombre
                + '</td"><td>' + json[i].poblacion
                + '</td></tr>'
                );
    }
    $("#tableItems").append(items);
    $('#tableItems tr:odd').addClass("striped");

    //Una vez puesto los elementos en el html se pone el listener
    $("#tableItems tr").dblclick(function() {
        idEntidad = $(this).attr("data-idEntidad");
        for (var i = 0; i < json.length; i++) {
            if (json[i].idEntidad == idEntidad) {
                rellenaFormulario(json[i]);
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