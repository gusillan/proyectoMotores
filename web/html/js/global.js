

/*  Variables globales
 ******************************************************************************/
var confirmationOpt = {
    rootSelector: 'input[type=button]',
    title: '¿Seguro?',
    placement: 'top',
    popout: true,
    btnOkLabel: 'Si',
    btnCancelLabel: 'No',
    singleton: true
};
/* Listener 
 ******************************************************************************/

$("document").ready(function() {

    // Hacer mayusculas **************************
    $(".g-input[type=text]").blur(function() {
        this.value = this.value.toUpperCase();
    });
    $(".g-input[type=text]").keyup(function() {
        this.value = this.value.toUpperCase();
    });

    // Formateo de fechas ************************
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

    // Botones deshabilitados por defecto ********
    $(".g-disabled").prop("disabled", true);

    //Los botones de subir ficheros **************
    $('#archivo').change(function() {
        $('#imagen').val($('#archivo')[0].files[0].name);
    });

    // Utilizar ENTER para pasar al siguiente input
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

    // Botones de las funciones básicas del formulario
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


    // Atajos de teclado *************************
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
// FUNCIONES BASICAS **********************************************************/

/*Funcion Global Peticiones Ajax********************/
function peticionAjax(url, data) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: url,
            data: {parametro: data},
            type: 'POST',
            dataType: 'json',
            success: function(data) {
                resolve(data)
            },
            error: function(error) {
                reject(error)
            }
        });
    })

}

function consultaAjax(url, data) {
    var respuesta;
    $.getJSON(url, {parametro: data}, function(response) {
        console.log("motor " + response[0].descripcionMotor);
        respuesta = response;
        return resuesta;
    });

}


function envioFormulario(url) {
    console.log("Enviamos formulario a " + url); //borrar
    var data = $("#formulario").serialize();
    console.log("Formulario serializado " + data); //borrar
    $.ajax({
        url: url,
        data: data,
        type: 'POST',
        success: limpiar
    });
}

function respuestaConsultaCampo(listaObjetos) {
    console.log("lista de objetos " + listaObjetos); // borrar
    if (listaObjetos.length == 1) {
        var objeto = listaObjetos[0];
        rellenaFormulario(objeto);
    } else if (listaObjetos.length > 1) {
        respuestaVariosObjetos(listaObjetos);
    } else if (listaObjetos.length < 1) {
        respuestaCeroObjetos();
    }
}


//Consultas para rellenar varios campos de un formulario***********************/

// Fabricante *****************************************/
function consultaFabricanteMin() {
    if (!vacio($("#codigoFabricante"))) {
        var fabricante = $("#codigoFabricante").val();
        console.log("Consultamos " + fabricante);  //Borrar
        promesa = peticionAjax('../consultaFabricante.htm', fabricante);
        promesa.then(function(listaFabricantes) {
            if (listaFabricantes.length === 1) {
                var fabricante = listaFabricantes[0];
                rellenaFabricanteCampos(fabricante);
            } else if (listaFabricantes.length > 1) {
                console.log("ERROR - No puede haber codigos repetidos.Consulte al administrador de la BBDD");
            } else if (listaFabricantes.length < 1) {
                console.log("No existe ningun fabricante con ese Codigo"); // Borrar
                borraFabricanteCampos();
            }
        });
    } else {
        borraFabricanteCampos();
    }
}

function rellenaFabricanteCampos(fabricante) {
    $("#idFabricante").val(fabricante.idFabricante);
    $("#nombreFabricante").val(fabricante.nombreFabricante);
    $("#logoFabricante").attr("src", "img/marcas/" + fabricante.logoFabricante);
}

function borraFabricanteCampos() {
    $("#nombreFabricante").val("");
    $("#codigoFabricante").val("");
    $("#logoFabricante").attr("src", "");
}
// Motor **********************************************/
function consultaMotorMin() {
    if (!vacio($("#codigoMotor"))) {
        var motor = this.value;
        console.log("Consultamos " + motor);// Borrar
        promesa = peticionAjax('../consultaMotor.htm', motor);
        promesa.then(function(listaMotores) {
            if (listaMotores.length === 1) {
                var motor = listaMotores[0];
                rellenaMotorCampos(motor);
            } else if (listaMotores.length > 1) {
                console.log('Existen varios motores');// Borrar
                ventanaMotor.abrir(listaMotores);
            } else if (listaMotores.length < 1) {
                console.log("No extiste motor con ese codigo"); // Borrar
                borraMotorCampos();
            }
        });

    } else {
        borraMotorCampos();
    }
}

function rellenaMotorCampos(motor) {
    $("#codigoMotor").val(motor.codigoMotor);
    $("#descripcionMotor").val(motor.descripcionMotor);
    $("#combustibleMotor").text(motor.combustibleMotor);
    $("#cilindradaMotor").text(motor.cilindradaMotor);
    $("#kwMotor").text(motor.kwMotor);
    $("#fabricanteMotor").text(motor.fabricante.nombreFabricante);    
}

function borraMotorCampos() {
    $("#codigoMotor").val("");
    $("#descripcionMotor").val("");
    $("#cilindradaMotor").text("");
    $("#kwMotor").text("");
    $("#fabricanteMotor").text("");
}
//Modelo **********************************************/

function consultaModeloMin() {
    if (!vacio($("#codigoModelo"))) {
        var modelo = this.value;
        console.log("Consultamos " + modelo);  //Borrar
        promesa = peticionAjax('../consultaModelo.htm', modelo);
        promesa.then(function(listaModelos) {
            if (listaModelos.length === 1) {
                var modelo = listaModelos[0];
                rellenaModeloCampos(modelo);
            } else if (listaModelos.length > 1) {
                console.log("Existen varios Modelos - Consulte administrador BBDD");
            } else if (listaModelos.length < 1) {
                console.log("No existe ningun modelo con ese Codigo"); // Borrar
                borraModeloCampos();
            }
        });
    } else {
        borraModeloCampos();
    }
}

function rellenaModeloCampos(modelo) {
    console.log("Modelo llega aki " + modelo.decripcionModelo);
    $("#idModelo").val(modelo.idModelo);
    $("#descripcionModelo").val(modelo.descripcionModelo).change();
    $("#codigoModelo").val(modelo.codigoModelo);
    $("#logoMarca").attr("src", "img/marcas/" + modelo.fabricante.logoFabricante);
    $("#silueta").attr("src", "img/imagenesVehiculos/" + modelo.imagenModelo);
    /*$("#nombreFabricanteModelo").text(modelo.fabricante.nombre);*/
    $("#codigoMarca").val(modelo.fabricante.codigoFabricante); //prueba
    $("#nombreFabricanteModelo").val(modelo.fabricante.nombreFabricante);
    $("#fechainicio").val(modelo.inicioModelo);//prueba

}

function borraModeloCampos() {
    $("#descripcionModelo").val("");
    $("#logoMarca").attr("src", "");
    $("#silueta").attr("src", "");
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

//Motor ******************************************/


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



// Entidad ******************************************/
function consultaEntidadCampos(entidad) {

}
function consultaEntidadMin() {
    if ($("#nombreEntidad").val().length > 2) {
        var nombre = $("#nombreEntidad").val();
        console.log("Campo nombre RELLENO " + nombre + " " + nombre.length);
        promesa = peticionAjax('../consultaEntidadPorNombre.htm', nombre);
        promesa.then(function(listaEntidades) {
            if (listaEntidades.length == 0) {
                alert("Error: la consulta del nombre no ha obtenido ningun resultado");
            } else if (listaEntidades.length == 1) {
                rellenaEntidadCampos(listaEntidades[0]);
            } else {
                ventanaEntidad.abrir(listaEntidades);   //Abre la ventana Modal con la lista
            }
        });
    } else {
        console.log("Campo nombre debe tener 3 o mas caracteres");
    }
}

function rellenaEntidadCampos(entidad) {
    $("#codigoEntidad").val(entidad.idEntidad);
    $("#nombreEntidad").val(entidad.nombreEntidad);
    $("#poblacionEntidad").text(entidad.poblacionEntidad);
    $("#telefonoEntidad").text(entidad.telefonoEntidad);
    $("#movilEntidad").text(entidad.movilEntidad);
}

// Matricula *************************************


// Recambio **************************************


function respuestaConsultaReferencia(listaObjetos) {
    if (listaObjetos.length === 1) {
        var objeto = listaObjetos[0];
        rellenaRecambio(objeto);
    } else if (listaObjetos.length > 1) {
        console.log("Lista:");
        console.log(listaObjetos);
        var idFabricanteInicial = listaObjetos[0].fabricante.idFabricante;
        var referenciaInicial = listaObjetos[0].referencia;
        for (var i = 1; i < listaObjetos.length; i++) {
            if (referenciaInicial != listaObjetos[i].referencia) {
                console.log("Tienen distinta referencia");
                var objeto = listaObjetos[listaObjetos.length - 1];
                rellenaRecambio(objeto);
                var sustituciones = "";
                for (var j = 0; j < listaObjetos.length - 1; j++) {
                    sustituciones += String(listaObjetos[j].referencia);
                    sustituciones += " \u2192 "; //U+02192
                    sustituciones += String(listaObjetos[j + 1].referencia);
                    sustituciones += "\n";
                }
                $("#infoSustituciones").prop("title", sustituciones);
                return 0;
            }
        }
        console.log("Tienen la misma referencia");
        ventanaRecambios.abrir(listaObjetos);

    } else if (listaObjetos.length < 1) {
        console.log("No existe ninguna Referencia con ese Codigo");
        darAltaRecambio();
    }
}

function rellenaRecambioMin(recambio){
    $("#idRecambio").val(recambio.idRecambio);    
    $("#referenciaRecambio").val(recambio.referenciaRecambio);
    $("#codigoFabricante").val(recambio.fabricante.codigoFabricante);
    rellenaFabricanteCampos(recambio.fabricante);
    $("#descripcionRecambio").val(recambio.descripcionRecambio);
    $("#pvpRecambio").val(recambio.pvpRecambio.toFixed(2));
}

function darAltaRecambio() {
    var respuesta = confirm("Desea dar de alta este Recambio?");
    if (respuesta == true) {
        window.location = "../html/formularioRecambio.html?referencia=" + $("#referencia").val();
    } else {
        $("#referencia").val("");
        $("#referencia").focus();
    }
}

function buscarRecambio() {

    var descripcionRecambio = $("#descripcionRecambio").val()
    if (descripcionRecambio.length > 3) {
        console.log("Campo Reacambio RELLENO");
        $.ajax({
            url: '../consultaPorDescripcionRecambio.htm',
            data: {parametro: descripcionRecambio},
            type: 'POST',
            dataType: 'json',
            success: respuestaBuscarRecambio
        });
    }
}

function respuestaBuscarRecambio(recambios) {
    if (recambios.length == 0) {
        console.log("Error: la consulta del recambio no ha obtenido ningun resultado");
        $("#descripcionRecambio").val("");

    } else if (recambios.length == 1) {
        rellenaRecambio(recambios[0]);
    } else {
        ventanaRecambios.abrir(recambios); //Abre la ventana Modal con la lista
    }
}

/* Funciones de Utilidad
 *****************************************************************************/

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
 *****************************************************************************/
var focusablesPrincipales = "button:not(:disabled), textarea, select, input:not(:disabled):not([readonly]):not([type='hidden'])";
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
 *****************************************************************************/
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
 *****************************************************************************/
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
 *****************************************************************************/
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


