


/*  Listener
 *********************************************************/
$("document").ready(function() {


    $("#dni").change(function() {
        console.log("change");
        if (this.value != null) {
            this.value = fillDni(this);
            console.log("fill");
            consultaEntidad(this.value);
        }
    });

    $("#buscarNombre").click(function() {
        openLightbox();
    });

    $("#cancelName").click(function() {
        closeLightbox();
    });


    $("#citySearch, #nameSearch").keyup(function() {
        filterName($("#nameSearch").val(), $("#citySearch").val());
    });




});





/*  Campo DNI
 *********************************************************/
function fillDni(dniField) {
    console.log(dniField);
    console.log(dniField.value);

    dniValue = dniField.value
    if (isNumber(dniValue)) {
        while (dniValue.length < 8) {
            dniValue = "0" + dniValue;
        }
        dniValue = dniValue + dniLetra(dniValue);
        dniField.setCustomValidity("");
    } else if (isNumber(dniValue.substring(0, dniValue.length - 1))) {
        while (dniValue.length < 9) {
            dniValue = "0" + dniValue;
        }
        if (dniLetra(dniValue.substring(0, dniValue.length - 1)) != dniValue.charAt(dniValue.length - 1)) {
            console.log("Error: La letra no se corresponde con el numero del dni");
            dniField.setCustomValidity("La letra no se corresponde con el numero del dni");
        } else {
            dniField.setCustomValidity("");
        }
    } else {
        console.log("Error: El valor introducido en el dni no es correcto");
        dniField.setCustomValidity("El valor introducido en el dni no es correcto");
    }

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



/*  Lightbox
 *********************************************************/
var clientesJson = [];      //Json obtenido de los clientes


function openLightbox() {
    getNames();
    $(".cover, .lightbox").css("display", "block");
}

function closeLightbox() {
    $(".cover, .lightbox").css("display", "none");
    $(".lightboxTableData .tableRow").remove();
}

function filterName(name, city) {
    for (var i = 0; i < clientesJson.length; i++) {
        var idEntidad = clientesJson[i].idEntidad;
        if (clientesJson[i].nombre.includes(name) && clientesJson[i].poblacion.includes(city)) {
            $('.tableRow[data-idEntidad="' + idEntidad + '"]').show();
        } else {
            $('.tableRow[data-idEntidad="' + idEntidad + '"]').hide();
        }
    }
}


function getNames() {
    console.log("estas aqui");
    console.log("buscar " + $('#nombre').val());

    $.ajax({
        url: 'http://localhost:8084/ProyectoMotores/consultaPorNombre.htm',
        data: {nombre: $('#nombre').val()},
        type: 'POST',
        dataType: 'json',
        success: rellenarLista
    });
}

function rellenarLista(clientesJson) {
    console.log("Funcion rellenarLista activada");
    console.log(clientesJson);
    var items = [];
    for (var i = 0; i < clientesJson.length; i++) {
        items.push('<div class="tableRow" data-idEntidad="' + clientesJson[i].idEntidad
                + '"><div class="tableItem itemName">' + clientesJson[i].nombre
                + '</div><div class="tableItem itemCity">' + clientesJson[i].poblacion
                + '</div></div>'
                );
    }
    $(".lightboxTableData").append(items);

    //Una vez puesto los elementos en el html se pone el listener
    $(".tableRow").click(function() {
        $(".tableRow").css("background-color", "");
        $(this).css("background-color", "red");
        idEntidad = $(this).attr("data-idEntidad");
        for (var i = 0; i < clientesJson.length; i++) {
            if (clientesJson[i].idEntidad == idEntidad) {
                selectName(clientesJson[i]);
                closeLightbox();
            }
        }
    });



}



function selectName(obj) {
    $("#nombre").val(obj.nombre);
    $("#direccion").val(obj.direccion);
    $("#cpostal").val(obj.cpostal);
    $("#poblacion").val(obj.poblacion);
    $("#dni").val(obj.dni);
    /*Hay que forzar otra vez la comprobacion del dni porque el evento change
     no detecta el cambio al hacerlo automaticamente por codigo*/
    $("#dni").each(function() {
        this.value = fillDni(this);
    });
    $("#telefono").val(obj.telefono);
    $("#movil").val(obj.movil);
    $("#email").val(obj.email);
}

function consultaEntidad(dni) {
    console.log("consultar entidad con dni " + dni);
    $.getJSON('../consultaDni.htm', {dni: dni}, procesaRespuesta);
}


function procesaRespuesta(listaObjetos) {
    if (listaObjetos.length == 1) {
        var objeto = listaObjetos[0];
        selectName(objeto);
    } else if (listaObjetos.length > 1) {
        ventanaOpciones(listaObjetos);
        console.log("Existen varias entidades con ese DNI.Consultar al administrador de la BBDD");
    } else if (listaObjetos.length < 1) {
        console.log("No existe ninguna entidad con ese DNI");
        //$('#baja').attr('disabled', true);
        //$('#modificar').attr('disabled', true);
    }
}
