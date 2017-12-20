

/*  Variables globales
 *********************************************************/
var clientesJson = [];      //Json obtenido de los clientes
ventanaEntidad = new VentanaEmergente({
        modal: 'entidadModal',
        titulo: 'Busqueda por nombre',
        campos: ['nombre','poblacion'],
        campoID: 'idEntidad',
        campos: ['nombre','poblacion']        
    });


/*  Listener
 *********************************************************/
$("document").ready(function() {

    $('.g-input[data-toggle="popover"]').blur(function() {
        validarCampoConPatron(this);
    });
    $('.g-input[data-toggle="popover"]').keyup(function() {
        validarCampoConPatron(this);
    });

    $("#dni").change(function() {
        if (this.value != null) {
            this.value = rellenaDNI(this);
            consultaDNI(this.value);
        }
    });



    $("#cpostal").blur(consultaCpostal);
    $("#telefono").mask("999 999 999", {placeholder: " "});
    $("#movil").mask("999 999 999", {placeholder: " "});


    //Modal************ 
    $("#buscarNombre").click(consultaNombre);

    $("#cancelarModal").click(function() {
        $('#myModal').modal('hide');
        $("#tableItems tr").remove();
    });

/*    $('#myModal').on('shown.bs.modal', function() {
        $('#filtrarNombre').focus();
    });
    $('#myModal').on('hidden.bs.modal', function() {
        $('#direccion').focus();
    });*/

    $("#filtrarNombre, #filtrarPoblacion").keyup(function() {
        filtrarNombre($("#filtrarNombre").val(), $("#filtrarPoblacion").val());
    });

/*    $("#seleccionarNombre").click(function() {
        idEntidad = $("#tableItems tr.o-selected").attr("data-idEntidad");
        for (var i = 0; i < clientesJson.length; i++) {
            if (clientesJson[i].idEntidad == idEntidad) {
                rellenaFormulario(clientesJson[i]);
                $('#myModal').modal('hide');
                $("#tableItems tr").remove();
            }
        }
    });*/



});

/* Funciones Básicas Botones
 **********************************************************/

function guardar() {
    if (validarFormulario()) {
        console.log("Accion de guardar");
        var data = $("#formEntidad").serialize();
        $.ajax({
            url: '../altaEntidad.htm',
            data: data,
            type: 'POST',
            success: limpiar
        });
    }
}

function baja() {
    console.log("Accion de baja");
    var data = $("#formEntidad").serialize();
    $.ajax({
        url: '../bajaEntidad.htm',
        data: data,
        type: 'POST',
        success: limpiar
    });
}

/*  Validaciones
 *********************************************************/
function validarCampoConPatron(inputToValidate) {
    if (inputToValidate.validity.valid) {
        $(inputToValidate).popover('destroy');
    }
}

/*  Campo DNI
 *********************************************************/
function rellenaDNI(dniField) {
    dniValue = dniField.value
    var customMessage = ""
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
        customMessage = "Debe de contener 9 dígitos númericos y una letra";
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

function consultaDNI(dni) {
    console.log("consultar entidad con dni " + dni);
    $.getJSON('../consultaDni.htm', {dni: dni}, respuestaConsultaDNI);
}

function respuestaConsultaDNI(listaObjetos) {
    if (listaObjetos.length == 1) {
        var objeto = listaObjetos[0];
        rellenaFormulario(objeto);
    } else if (listaObjetos.length > 1) {
        console.log("Existen varias entidades con ese DNI.Consultar al administrador de la BBDD");
    } else if (listaObjetos.length < 1) {
        console.log("No existe ninguna entidad con ese DNI");
        //$('#baja').attr('disabled', true);
        //$('#modificar').attr('disabled', true);
    }
}


/*  Busqueda por nombre
 *********************************************************/

function consultaNombre() {
    if ($("#nombre").val().length>2) {
        console.log("Campo nombre RELLENO "+$("#nombre").val().length ) ;
        $.ajax({
            url: 'http://localhost:8084/ProyectoMotores/consultaPorNombre.htm',
            data: {nombre: $('#nombre').val()},
            type: 'POST',
            dataType: 'json',
            success: respuestaConsultaNombre
        });
    } else {
        console.log("Campo nombre debe tener 3 o mas caracteres");
    }

}

function respuestaConsultaNombre(responseJson) {
    clientesJson = responseJson;
    if (clientesJson.length == 0) {
        console.log("Error: la consulta del nombre no ha obtenido ningun resultado");
    } else if (clientesJson.length == 1) {
        rellenaFormulario(clientesJson[0]);
    } else {
        //$('#myModal').modal('show');    //Abre la ventana Modal con la lista
        //rellenaListaNombres();

        ventanaEntidad.abrir( responseJson );
    }
}
/*
function rellenaListaNombres() {
    var items = [];
    $("#cantidad").text("("+clientesJson.length+")");
    for (var i = 0; i < clientesJson.length; i++) {
        items.push('<tr data-idEntidad="' + clientesJson[i].idEntidad
                + '" tabindex="0"><td>' + clientesJson[i].nombre
                + '</td"><td>' + clientesJson[i].poblacion
                + '</td></tr>'
                );
    }
    $("#tableItems").append(items);
    $('#tableItems tr:odd').addClass("striped");

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
}*/

function filtrarNombre(name, city) {
    for (var i = 0; i < clientesJson.length; i++) {
        var idEntidad = clientesJson[i].idEntidad;
        if (clientesJson[i].nombre.includes(name) && clientesJson[i].poblacion.includes(city)) {
            $('#tableItems tr[data-idEntidad="' + idEntidad + '"]').show();
        } else {
            $('#tableItems tr[data-idEntidad="' + idEntidad + '"]').hide();
        }
    }
    updateFocusables();
    $('#tableItems tr').removeClass("striped");
    $('#tableItems tr:visible:odd').addClass("striped");
}

function rellenaFormulario(obj) {
    $("#idEntidad").val(obj.idEntidad);
    $("#nombre").val(obj.nombre);
    $("#direccion").val(obj.direccion);
    $("#cpostal").val(obj.cpostal);
    $("#poblacion").val(obj.poblacion);
    $("#dni").val(obj.dni);
    /*Hay que forzar otra vez la comprobacion del dni porque el evento change
     no detecta el cambio al hacerlo automaticamente por codigo*/
    $("#dni").each(function() {
        this.value = rellenaDNI(this);
    });
    $("#telefono").val(obj.telefono);
    $("#movil").val(obj.movil);
    $("#email").val(obj.email);
    $("#informacion").val(obj.informacion);
    $("#baja").attr("disabled", false);
    updateFocusables();

}

/* Codigo Postal
 * ********************************************************/

function consultaCpostal() {
    var cpost = $("#cpostal").val();
    console.log("Consultar " + cpost);
    $.ajax({
        url: '../consultaCpostal.htm',
        data: {codigo: cpost},
        type: 'POST',
        success: rellenarCpostal
    });
}

function rellenarCpostal(respuesta) {
    console.log(respuesta);
    if (respuesta.length > 0) {
        poblacion = respuesta[0];
        $("#poblacion").val(poblacion.poblacion);
    } else {
        $("#poblacion").val("");
    }
}


