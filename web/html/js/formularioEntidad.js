


/*  Listener
 *********************************************************/
$("document").ready(function() {


    $("#dni").change(function() {
        if (this.value != null) {
            this.value = rellenaDNI(this);
            consultaDNI(this.value);
        }
    });


    $("#buscarNombre").click(function() {
        consultaNombre();
    });

    $("#cancelarModal").click(function(){
        $('#myModal').modal('hide');
        $("#tableNames tr").remove();       
    });


    $('#myModal').on('shown.bs.modal', function () {
      $('#filtrarNombre').focus()
    });


    $("#filtrarNombre, #filtrarPoblacion").keyup(function() {
        filtrarNombre($("#filtrarNombre").val(), $("#filtrarPoblacion").val());
    });

    $("#seleccionarNombre").click(function(){
        idEntidad = $("#tableNames tr.o-selected").attr("data-idEntidad");
        for (var i = 0; i < clientesJson.length; i++) {
            if (clientesJson[i].idEntidad == idEntidad) {
                seleccionaEntidad(clientesJson[i]);
                $('#myModal').modal('hide');
                $("#tableNames tr").remove();
            }
        }
    });


});





/*  Campo DNI
 *********************************************************/
function rellenaDNI(dniField) {
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

function consultaDNI(dni) {
    console.log("consultar entidad con dni " + dni);
    $.getJSON('../consultaDni.htm', {dni: dni}, respuestaConsultaDNI);
}

function respuestaConsultaDNI(listaObjetos) {
    if (listaObjetos.length == 1) {
        var objeto = listaObjetos[0];
        seleccionaEntidad(objeto);
    } else if (listaObjetos.length > 1) {
        ventanaOpciones(listaObjetos);
        console.log("Existen varias entidades con ese DNI.Consultar al administrador de la BBDD");
    } else if (listaObjetos.length < 1) {
        console.log("No existe ninguna entidad con ese DNI");
        //$('#baja').attr('disabled', true);
        //$('#modificar').attr('disabled', true);
    }
}




/*  Busqueda por nombre
 *********************************************************/
var clientesJson = [];      //Json obtenido de los clientes



function consultaNombre() {
    $.ajax({
        url: 'http://localhost:8084/ProyectoMotores/consultaPorNombre.htm',
        data: {nombre: $('#nombre').val()},
        type: 'POST',
        dataType: 'json',
        success: respuestaConsultaNombre
    });
}


function respuestaConsultaNombre(responseJson){
    clientesJson = responseJson;
    if (clientesJson.length == 0) {
        console.log("Error: la consulta del nombre no ha obtenido ningun resultado");
    }else if (clientesJson.length == 1) {
        seleccionaEntidad( clientesJson[0] );
    }else{
        $('#myModal').modal('show');    //Abre la ventana Modal con la lista
        rellenaListaNombres();
    }
}


function rellenaListaNombres() {  
    var items = [];
    for (var i = 0; i < clientesJson.length; i++) {
        items.push('<tr data-idEntidad="' + clientesJson[i].idEntidad
                + '"><td>' + clientesJson[i].nombre
                + '</td"><td>' + clientesJson[i].poblacion
                + '</td></tr>'
                );
    }
    $("#tableNames").append(items);

    //Una vez puesto los elementos en el html se pone el listener
    $("#tableNames tr").dblclick(function(){
        idEntidad = $(this).attr("data-idEntidad");
        for (var i = 0; i < clientesJson.length; i++) {
            if (clientesJson[i].idEntidad == idEntidad) {
                seleccionaEntidad(clientesJson[i]);
                $('#myModal').modal('hide');
                $("#tableNames tr").remove();
            }
        }
    });
    $("#tableNames tr").click(function() { 
        $("#tableNames tr").removeClass("o-selected");
        $(this).addClass("o-selected");
    });
}



function filtrarNombre(name, city) {
    for (var i = 0; i < clientesJson.length; i++) {
        var idEntidad = clientesJson[i].idEntidad;
        if (clientesJson[i].nombre.includes(name) && clientesJson[i].poblacion.includes(city)) {
            $('#tableNames tr[data-idEntidad="' + idEntidad + '"]').show();
        } else {
            $('#tableNames tr[data-idEntidad="' + idEntidad + '"]').hide();
        }
    }
}


function seleccionaEntidad(obj) {
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
}




