

/*  Variables globales
 *********************************************************/
var confirmationOpt = {
    rootSelector: 'input[type=button]',
    title: '¿Seguro?',
    placement: 'top',
    popout: true,
    btnOkLabel: 'Si',
    btnCancelLabel: 'No',
    singleton: true
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


    // Botones deshabilitados por defecto
    $(".g-disabled").prop("disabled", true);


    /* Utilizar ENTER para pasar al siguiente input*/
    $(".g-input, .g-select, .g-textarea").enterKey(function() {
        var inputs = $(".g-input, .g-select, .g-textarea");
        var index = inputs.index(this);
        if (index < inputs.length - 1)
            inputs[index + 1].focus();
    });
    $(".g-select").change(function() {
        var inputs = $(".g-input, .g-select");
        var index = inputs.index(this);
        inputs[index + 1].focus();
    });



    /* Botones de las funciones básicas del formulario*/
    $("#guardar").click(function() {
        validarAccion(guardar);
    });
    $("#baja").click(function() {
        validarAccion(baja);
    });
    $("#limpiar").click(limpiar);
    $("#listado").click(listado);
    $("#volver").click(volver);
    $("#inicio").click(inicio);



    /* Atajos de teclado */
    $("body").keydown(function(ev) {
        var keycode = (ev.keyCode ? ev.keyCode : ev.which);
        if (ev.altKey) {                                       // Shift + ...
            if (keycode == '103' || keycode == '71') {           // G
                ev.preventDefault();
                validarAccion(guardar);
            } else if (keycode == '98' || keycode == '66') {     // B
                ev.preventDefault();
                validarAccion(baja);
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

/*Consultas comunes
 *************************************************************/

function consultarMarca() {
    if (!vacio($("#codigoMarca"))) {
        var marca = $("#codigoMarca").val();
        console.log("Consultar marca " + marca);
        $.ajax({
            url: '../consultaFabricante.htm',
            data: {codigo: marca},
            type: 'POST',
            success: respuestaConsultaMarca
        });
    }
}

function respuestaConsultaMarca(listaObjetos) {

    if (listaObjetos.length === 1) {
        var objeto = listaObjetos[0];
        rellenaMarca(objeto);
    } else if (listaObjetos.length > 1) {
        console.log("Existen varios fabricantes con ese Codigo.Consultar al administrador de la BBDD");
    } else if (listaObjetos.length < 1) {
        console.log("No existe ningun fabricante con ese Codigo");
        $("#marca").val('');
        $("#codigoMarca").val('');
        $("#logoMarca").attr("src", "");
    }
}

function rellenaMarca(marca) {
    $("#marca").val(marca.nombre);
    $("#logoMarca").attr("src", "img/marcas/" + marca.logo);
}

function consultaModelo() {
    if (!vacio($("#codigoModelo"))) {
        var modelo = $("#codigoModelo").val();
        console.log("Modelo " + modelo);
        $.getJSON(
                '../consultaModelo.htm',
                {codigo: modelo},
        respuestaConsultaModelo);
    } else {
        $("#descripcionModelo").val("");
        $("#logoMarca").attr("src", "");
        $("#silueta").attr("src", "");
    }
}

function respuestaConsultaModelo(listaObjetos) {
    if (listaObjetos.length == 1) {
        var objeto = listaObjetos[0];
        rellenaModelo(objeto);
    } else if (listaObjetos.length > 1) {
        console.log("Existen varios Modelos con el mismo codigo.Consultar con el administrador de la BBDD");
    } else if (listaObjetos.length < 1) {
        console.log("No existe ningún modelo con ese código");
        $("#descripcionModelo").val("");
        $("#logoMarca").attr("src", "");
        $("#silueta").attr("src", "");
        darAltaModelo();
    }
}

function rellenaModelo(modelo) {
    $("#idModelo").val(modelo.idModelo);
    $("#descripcionModelo").val(modelo.descripcion).change();
    $("#codigoModelo").val(modelo.codigo);
    $("#logoMarca").attr("src", "img/marcas/" + modelo.fabricante.logo);
    $("#silueta").attr("src", "img/imagenesVehiculos/" + modelo.imagen);
    /*$("#nombreFabricanteModelo").text(modelo.fabricante.nombre);*/

}

function darAltaModelo() {
    var respuesta = confirm("Desea dar de alta este Modelo?");
    if (respuesta == true) {
        console.log("Ha pulsado si");
        window.location = "../html/formularioModelo.html?codigo=" + $("#codigoModelo").val();
    } else {
        console.log("Ha pulsado no");
        $("#codigoModelo").val("");
        $("#codigoModelo").focus();
    }
}

function consultaMotor() {
    if (!vacio($("#codigoMotor"))) {
        var motor = $("#codigoMotor").val();
        console.log("Motor " + motor);
        $.getJSON(
                '../consultaCodigoMotor.htm',
                {codigo: motor},
        respuestaConsultaMotor);
    } else {
        $("#descripcionMotor").val("");
    }
}

function respuestaConsultaMotor(listaObjetos) {
    if (listaObjetos.length == 1) {
        var objeto = listaObjetos[0];
        rellenaMotor(objeto);
    } else if (listaObjetos.length > 1) {
        console.log("Existen varios Motores con el mismo codigo");
        ventanaMotor.abrir(listaObjetos);
    } else if (listaObjetos.length < 1) {
        console.log("No existe ningun Motor con este codigo");
        $("#descripcionMotor").val("");
        darAltaMotor();
    }
}

function darAltaMotor() {
    var respuesta = confirm("Desea dar de alta este Motor?");
    if (respuesta == true) {
        console.log("Ha pulsado si");
        window.location = "../html/formularioMotor.html?codigo=" + $("#codigoMotor").val();
    } else {
        console.log("Ha pulsado no");
        $("#codigoMotor").val("");
        $("#codigoMotor").focus();
    }
}

function consultaMatricula() {
    if ($("#matricula").val().length>3) {
        var matricula = $("#matricula").val();
        console.log("Vamos a consultar la matricula " + matricula);
        $.getJSON(
                '../consultaMatricula.htm',
                {matricula: matricula},
        respuestaConsultaMatricula);
    }
}

function respuestaConsultaMatricula(listaObjetos) {
    if (listaObjetos.length == 1) {
        var objeto = listaObjetos[0];
        rellenaFormulario(objeto);
    } else if (listaObjetos.length > 1) {
        ventanaMatricula.abrir(listaObjetos)
    } else if (listaObjetos.length < 1) {
        console.log("No existe ningun vehiculo con esta matricula ");
    }
}

function consultaReferencia() {
    if (!vacio($("#referencia"))) {
        var referencia = $("#referencia").val();
        console.log("Vamos a consultar la Referencia " + referencia);        
        $.getJSON('../consultaReferencia.htm', {referencia: referencia}, respuestaConsultaReferencia);
    } else {
        console.log("borrar")
        $("#descripcionRecambio").val("");
    }
}


function validarAccion(accion) {
    if (validarFormulario()) {
        confirmationOpt.onConfirm = accion;
        confirmationOpt.onCancel = function() {
            $(".g-focusable").first().focus();
        };
        $("#" + accion.name).confirmation(confirmationOpt);
        $("#" + accion.name).confirmation('show');
        $($(".confirmation a")[1]).addClass("active");
        setTimeout(function() {
            $(".confirmation a")[1].focus();
        }, 40); //El foco en el no, de la confirmacion
    } else {
        setTimeout(function() {
            $("#" + accion.name).confirmation('destroy');
        }, 40);
        //Sin el timeout se muestra el confirm erroneamente cuando no esta validado
    }
}

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
    $(".g-text").text("");
    $(".g-img").attr("src", "");
    $(".g-showByDefault").show();
    $(".g-hideByDefault").hide();
    $(".g-disabled").prop("disabled", true);
    $(".g-hideByDefault input").prop("disabled", true);
    $("#baja").attr("disabled", true);
    updateFocusables();
    $(".g-focusable").first().focus();
    $("#g-tablaRecambioVehiculo tbody tr").remove();
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
     callback: mycallback
     }, opciones);*/

    this.modal = opciones.modal;
    this.titulo = opciones.titulo;
    this.campos = opciones.campos;
    this.campoID = opciones.campoID;
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

        var ventanaEmergente = data.replace(/@modal/g, opciones.modal);
        ventanaEmergente = ventanaEmergente.replace(/@titulo/g, opciones.titulo);

        $('body').ready(function() {                     //Esperar a que haya cargado body para adjuntarle la ventanaemergente
            $('body').append(ventanaEmergente);
            var head = '';
            width = 100 / opciones.campos.length;
            for (var i = 0; i < opciones.campos.length; i++) {
                if (opciones.campos[i].includes(".")) {                           //Si contiene un punto, meterse dentro
                    var subcampos = opciones.campos[i].split('.');
                    head += '<th style="width: ' + width + '%;">' + capitalize(subcampos[1]) + ' ' + capitalize(subcampos[0]) + '</th>';
                } else {
                    head += '<th style="width: ' + width + '%;">' + capitalize(opciones.campos[i]) + '</th>';
                }
            }
            $('#' + opciones.modal + '-head').html(head);


            //crear filtros
            if (opciones.campos.length >= 1) {
                var columnasFiltros = 12 / opciones.campos.length;
                var filtros = '';
                for (var i = 0; i < opciones.campos.length; i++) {
                    if (opciones.campos[i].includes(".")) {                           //Si contiene un punto, meterse dentro
                        var subcampos = opciones.campos[i].split('.');
                        var nombreFiltro = opciones.modal + '-' + subcampos[0] + '-' + subcampos[1];
                        filtros += '<div class="col-md-' + columnasFiltros + '"><div class="form-group">';
                        filtros += '<label for="' + nombreFiltro + '">' + capitalize(subcampos[1]) + ' ' + capitalize(subcampos[0]) + '</label>'
                        filtros += '<input type="text" class="form-control g-input ' + opciones.modal + '-filter" id="' + nombreFiltro + '" name="' + nombreFiltro + '">'
                        filtros += '</div></div>';
                    } else {
                        var nombreFiltro = opciones.modal + '-' + opciones.campos[i];
                        filtros += '<div class="col-md-' + columnasFiltros + '"><div class="form-group">';
                        filtros += '<label for="' + nombreFiltro + '">' + capitalize(opciones.campos[i]) + '</label>'
                        filtros += '<input type="text" class="form-control g-input ' + opciones.modal + '-filter" id="' + nombreFiltro + '" name="' + nombreFiltro + '">'
                        filtros += '</div></div>';
                    }
                }
                $('#' + opciones.modal + '-filtros').html(filtros);
            }



            //Listener de los filtros
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
                $('.' + opciones.modal + '-filter').each(function() {
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
    });


}



VentanaEmergente.prototype.filtrar = function() {
    var json = this.json;
    var modal = this.modal;
    var campoID = this.campoID;
    var filtros = this.campos;


    for (var i = 0; i < json.length; i++) {
        var valCampoID = json[i][campoID];
        $('#' + modal + '-items tr[data-' + campoID + '="' + valCampoID + '"]').show();
        for (var j = 0; j < filtros.length; j++) {
            if (filtros[j].includes(".")) {                           //Si contiene un punto, meterse dentro
                var subcampos = filtros[j].split('.');
                var nombreFiltro = modal + '-' + subcampos[0] + '-' + subcampos[1];
                stringValue = String(json[i][subcampos[0]][subcampos[1]]);
                if (!stringValue.includes($('#' + nombreFiltro).val())) {
                    $('#' + modal + '-items tr[data-' + campoID + '="' + valCampoID + '"]').hide();
                    continue;
                }
            } else {
                var nombreFiltro = modal + '-' + filtros[j];
                stringValue = String(json[i][filtros[j]]);
                if (!stringValue.includes($('#' + nombreFiltro).val())) {
                    $('#' + modal + '-items tr[data-' + campoID + '="' + valCampoID + '"]').hide();
                    continue;
                }
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

    //crear lista html
    var lista = '';
    $('#' + modal + '-cantidad').text(json.length + " ");
    width = 100 / this.campos.length;
    for (var i = 0; i < json.length; i++) {
        lista += '<tr data-' + this.campoID + '="' + json[i][this.campoID] + '" tabindex="0">';
        for (var j = 0; j < this.campos.length; j++) {
            lista += '<td  style="width: ' + width + '%;">';
            if (this.campos[j].includes(".")) {                           //Si contiene un punto, meterse dentro
                var subcampos = this.campos[j].split('.');
                lista += json[i][subcampos[0]][subcampos[1]];
            } else {
                lista += json[i][this.campos[j]];
            }
            lista += '</td>';
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

function getQueryVariable(variable) {
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
