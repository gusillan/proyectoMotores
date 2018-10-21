/*  Variables globales
 ******************************************************************************/
ventanaEntidad = new VentanaEmergente({
    modal: 'entidadModal',
    titulo: 'Busqueda por nombre',
    campos: ['nombreEntidad', 'poblacionEntidad'],
    campoID: 'idEntidad',
    callback: rellenaFormularioEntidad
});

/*  Listener
 ******************************************************************************/
$("document").ready(function() {

    $('.g-input[data-toggle="popover"]').blur(function() {
        validarCampoConPatron(this);
    });
    $('.g-input[data-toggle="popover"]').keyup(function() {
        validarCampoConPatron(this);
    });

    $("#dniEntidad").change(function() {
        if (this.value != null) {
            this.value = rellenaDNI(this);
            consultaDNI(this.value);
        }
    });

    $("#cPostalEntidad").change(consultaCpostal);
    $("#telefonoEntidad").mask("999 999 999", {placeholder: " "});
    $("#movilEntidad").mask("999 999 999", {placeholder: " "});
    $("#buscarNombre").click(consultaNombre);

});

/* Funciones Menú Principal
 ******************************************************************************/

function guardar() {
    if (validarFormulario()) {
        envioFormulario('../guardaEntidad.htm');
    } else {
        console.log("ERROR - Formulario no válido");
    }
}

function baja() {
    envioFormulario('../bajaEntidad.htm');
}

/* Funciones principales
 ******************************************************************************/
function consultaDNI(dni) {

    promesa = peticionAjax('../consultaDni.htm', dni);
    promesa.then(function(listaEntidades) {
        if (listaEntidades.length == 1) {
            var entidad = listaEntidades[0];
            rellenaFormularioEntidad(entidad);
        } else if (listaEntidades.length > 1) {
            console.log("ERROR - No puede haber DNIs/CIFs repetidos.Condultar administrador BBDD");
        } else if (listaEntidades.length < 1) {
            borraFormularioEntidad();
        }
    });
}

function rellenaFormularioEntidad(entidad) {
    $("#idEntidad").val(entidad.idEntidad);
    $("#nombreEntidad").val(entidad.nombreEntidad);
    $("#direccionEntidad").val(entidad.direccionEntidad);
    $("#cPostalEntidad").val(entidad.cPostalEntidad);
    $("#poblacionEntidad").val(entidad.poblacionEntidad);
    $("#dniEntidad").val(entidad.dniEntidad);
    /*Hay que forzar otra vez la comprobacion del dni porque el evento change
     no detecta el cambio al hacerlo automaticamente por codigo*/
    $("#dniEntidad").each(function() {
        this.value = rellenaDNI(this);
    });
    $("#telefonoEntidad").val(entidad.telefonoEntidad);
    $("#movilEntidad").val(entidad.movilEntidad);
    $("#emailEntidad").val(entidad.emailEntidad);
    $("#infoEntidad").val(entidad.infoEntidad);
    $("#baja").attr("disabled", false);
    updateFocusables();
}

function borraFormularioEntidad() {
    var dni = $("#dniEntidad").val();
    $("#formulario")[0].reset();
    $("#dniEntidad").val(dni);
}

/*  Busqueda por nombre
 ******************************************************************************/

function consultaNombre() {
    if ($("#nombreEntidad").val().length > 2) {
        var nombre = $("#nombreEntidad").val();
        console.log("Campo nombre RELLENO " + nombre + " " + nombre.length);
        promesa = peticionAjax('../consultaEntidadPorNombre.htm', nombre);
        promesa.then(function(listaEntidades) {
            if (listaEntidades.length == 0) {
                alert("Error: la consulta del nombre no ha obtenido ningun resultado");
                $("#formulario")[0].reset();
                $("#dniEntidad").focus();
            } else if (listaEntidades.length == 1) {
                rellenaFormularioEntidad(listaEntidades[0]);
            } else {
                ventanaEntidad.abrir(listaEntidades);   //Abre la ventana Modal con la lista
            }
        });
    } else {
        console.log("Campo nombre debe tener 3 o mas caracteres");
    }
}


/*  Validaciones
 ******************************************************************************/
function validarCampoConPatron(inputToValidate) {
    if (inputToValidate.validity.valid) {
        $(inputToValidate).popover('destroy');
    }
}

/*  Campo DNI
 ******************************************************************************/
function rellenaDNI(dniField) {
    dniValue = dniField.value
    var customMessage = ""

    if (isNumber(dniValue[0])) {   //Si el primer digito es numerico es un DNI
        console.log("Comprobacion de DNI");
        if (isNumber(dniValue)) {
            while (dniValue.length < 8) {
                dniValue = "0" + dniValue;
            }
            dniValue = dniValue + dniLetra(dniValue);
        } else if (isNumber(dniValue.substring(0, dniValue.length - 1))) {
            while (dniValue.length < 9) {
                dniValue = "0" + dniValue;
            }
            if (dniLetra(dniValue.substring(0, dniValue.length - 1)) != dniValue.charAt(dniValue.length - 1)) {
                customMessage = "La letra no se corresponde con el número del DNI";
            }
        } else {
            customMessage = "Debe de completar el DNI, CIF, o NIE";
        }
    } else if (dniValue[0].match(/[XYZ]/)) {
        console.log("Comprobacion de NIE");

    } else {
        console.log("Comprobacion de CIF");
        var digitos = dniValue.substring(1, 8);
        var A = parseInt(digitos[1]) + parseInt(digitos[3]) + parseInt(digitos[5]);
        var B = 0;
        for (var i = 0; i <= 6; i += 2) {
            var n = digitos[i] * 2;
            B += n < 10 ? n : n - 9;
        }
        var C = A + B;
        var E = parseInt(C.toString()[C.toString().length - 1]);
        var D = E != 0 ? 10 - E : 0;                        //Digito control
        //console.log(A, B, C, D, E);
        var control = '';
        var control2 = '';

        if (dniValue[0].match(/[ABEH]/)) {              //Debe de ser numerico
            control = D;
        } else if (dniValue[0].match(/[KPQS]/)) {       //Debe de ser letra
            control = 'JABCDEFGHI'.substr(D, 1);
        } else {                                            //Puede ser letra o numero
            control = D;
            control2 = 'JABCDEFGHI'.substr(D, 1);
        }

        if (dniValue[8] != control && dniValue[8] != control2) {
            customMessage = "El digito control no se corresponde con el número del CIF";
        }

    }

    dniField.setCustomValidity(customMessage);
    dniField.title = customMessage;
    $(dniField).popover({template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title o-popover-title"></h3><div class="popover-content o-popover-content"></div></div>'});

    return dniValue;
}

function isNumber(n) {
    var regexNumber = /^[0-9]+$/;
    return regexNumber.test(n)
}

function dniLetra(dni) {
    cadena = "TRWAGMYFPDXBNJZSQVHLCKET";
    posicion = dni % 23;
    letra = cadena.substring(posicion, posicion + 1);
    return letra;
}

/* Codigo Postal
 * ***************************************************************************/

function consultaCpostal() {
    var cpost = $("#cPostalEntidad").val();
    console.log("Consultar " + cpost);
    $.ajax({
        url: '../consultaCpostal.htm',
        data: {parametro: cpost},
        type: 'POST',
        success: rellenarCpostal
    });
}

function rellenarCpostal(respuesta) {
    if (respuesta.length > 0) {
        poblacion = respuesta[0];
        $("#poblacionEntidad").val(poblacion.poblacion);
    } else {
        $("#poblacionEntidad").val("");
    }
}


