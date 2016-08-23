
$(function() {

    $('input').keyup(function() {
        this.value = this.value.toUpperCase();
    });

    $('#dni').blur(function() {
        var dni = this.value;
        if (vacio(dni)) {
            console.log("Campo DNI / CIF Vacio");
        } else {
            dniFormateado = formatearDni(dni);
            $('#dni').val(dniFormateado);
            compruebaDni(dniFormateado);
        }
    });

    $('#alta').click(compruebaAntesDeAlta);
    $('#baja').click(confirmarBaja);
    $('#modificar').click(confirmarModificacion);
    $('#limpiar').click(limpiar);
    $('#listado').click(listar);
    $('#salir').click(salir);

    $('#dni').focus();
});

function continuarAlta() {
    $('#listaModelos').empty();
    $('#dialog').dialog("close");
    $('#descripcion').focus();
}
function volverDialog() {
    $('#listaModelos').empty();
    $('#dialog').dialog("close");
    limpiar();
}
function seleccionarOpcion() {
    var opcion = $('#listaModelos').val();
    rellenaForm(listaGlobal[opcion]);
    $('#listaModelos').empty();
    $('#dialog').dialog("close");
}
function compruebaDni(dni) {
    if (validarDNI(dni)) {
        alert("DNI CORRECTO");
        $.getJSON('consultaDni.htm', {dni: dni}, procesaRespuesta);
    } else {
        alert("DNI ERRONEO!!!!!");
        $.getJSON('consultaDni.htm', {dni: dni}, procesaRespuesta);
    }

}
function compruebaAntesDeAlta() {
    var codigo = $('#codigo').val();
    //Opción si el codigo está vacio
    $.getJSON('consultaCodigoModelo.htm', {codigo: codigo}, consultarAlta);
}

function rellenaForm(entidad) {
    $('#idEntidad').val(entidad.idEntidad);
    $('#dni').val(entidad.dni);
    $('#nombre').val(entidad.nombre);
    $('#direccion').val(entidad.direccion);
    $('#cPostal').val(entidad.cpostal);
    $('#poblacion').val(entidad.poblacion);
    $('#movil').val(entidad.movil);
    $('#telefono').val(entidad.telefono);
    $('#email').val(entidad.email);

}
function consultarAlta(listaMotor) {
    console.log("respuesta Ajax " + listaMotor.length);
    if (listaMotor.length > 0) {
        var r = confirm("Confirme que desea dar de alta un código repetido?");
        if (r == true) {
            console.log('CONFIRMADO');
            alta();
        } else {
            console.log('NEGATIVO');
            limpiar();
        }
    } else {
        if (confirmarAlta()) {
            alta();
        } else {
            $('#descripcion').focus();
        }

    }
}



function alta() {
    codigo = $('#codigo').val();
    descripcion = $('#descripcion').val();
    marca = $('#marca').val();
    mesInicio = $('#mesInicio').val();
    yearInicio = $('#yearInicio').val();
    mesFin = $('#mesFin').val();
    yearFin = $('#yearFin').val();
    imagen = $('#imagen').val();

    $.ajax({
        url: 'altaModelo.htm',
        data: {codigo: codigo, descripcion: descripcion, marca: marca,
            mesInicio: mesInicio, yearInicio: yearInicio, mesFin: mesFin,
            yearFin: yearFin, imagen: imagen},
        type: 'POST',
        success: limpiar
    });
}

function baja() {
    idModelo = $('#idModelo').val();
    codigo = $('#codigo').val();
    descripcion = $('#descripcion').val();
    marca = $('#marca').val();
    mesInicio = $('#mesInicio').val();
    yearInicio = $('#yearInicio').val();
    mesFin = $('#mesFin').val();
    yearFin = $('#yearFin').val();
    imagen = $('#imagen').val();

    $.ajax({
        url: 'bajaModelo.htm',
        data: {idModelo: idModelo, codigo: codigo, descripcion: descripcion,
            marca: marca, mesInicio: mesInicio, yearInicio: yearInicio, mesFin: mesFin,
            yearFin: yearFin, imagen: imagen},
        type: 'POST',
        success: limpiar
    });
}

function modificar() {
    idModelo = $('#idModelo').val();
    codigo = $('#codigo').val();
    descripcion = $('#descripcion').val();
    marca = $('#marca').val();
    mesInicio = $('#mesInicio').val();
    yearInicio = $('#yearInicio').val();
    mesFin = $('#mesFin').val();
    yearFin = $('#yearFin').val();
    imagen = $('#imagen').val();

    $.ajax({
        url: 'modificaModelo.htm',
        data: {idModelo: idModelo, codigo: codigo, descripcion: descripcion,
            marca: marca, mesInicio: mesInicio, yearInicio: yearInicio, mesFin: mesFin,
            yearFin: yearFin, imagen: imagen},
        type: 'POST',
        success: limpiar
    });

}
function limpiar() {
    $('#formularioEntidad')[0].reset();
    $('#baja').attr('disabled', false);
    $('#modificar').attr('disabled', false);
    $('#dni').focus();
}
function listar() {
    alert("Listado de Modelos");
}
function salir() {
    window.history.back();
}
function ventanaOpciones(listaModelo) {
    listaGlobal = listaModelo;
    $.each(listaGlobal, function(indice, modelo) {
        $('#listaModelos').append('<option value=' + indice + '>' + modelo.idModelo + ' - ' + modelo.fabricante.nombre + ' ' + modelo.descripcion + '</option>');
    });
    $('#dialog').dialog({
        modal: true,
        width: 450,
        height: 220
    });
}
function compruebaMarca(marca) {
    $.getJSON("consultaFabricante.htm", {codigoFabricante: marca}, function(fabricante) {
        $('#marcaModelo').val(fabricante[0].nombre);
        $('#imgLogo').attr('src', 'img/marcas/' + fabricante[0].logo);
    });
}
function validacion() {
    if (vacio($('#codigo').val())) {
        alert("Campo codigo VACIO");
        $('#codigo').focus();
        return false;
    }
    if (vacio($('#descripcion').val())) {
        alert("Campo descripcion VACIO");
        $('#descripcion').focus();
        return false;
    }
    if (vacio($('#marcaModelo').val())) {
        alert("Campo marca VACIO");
        $('#marca').focus();
        return false;
    }
    if (!vacio($('#mesInicio').val())) {
        if (!numero($('#mesInicio').val())) {
            alert("El campo mes debe ser un número 1-12");
            $('#mesInicio').focus();
            return false;
        }
        if (mes($('#mesInicio').val())) {
            alert("Mes de Inicio Incorrecto");
            $('#mesInicio').focus();
            return false;
        }
        mesInicio = $('#mesInicio').val();
        $('#mesInicio').val(pad(mesInicio, 2));
    }
    if (!vacio($('#yearInicio').val())) {
        if (!numero($('#yearInicio').val())) {
            alert("El campo año debe ser un número");
            $('#yearInicio').focus();
            return false;
        }
        if (year($('#yearInicio').val())) {
            alert("Año de Inicio Incorrecto");
            $('#yearInicio').focus();
            return false;
        }
    }
    if (!vacio($('#mesFin').val())) {
        if (!numero($('#mesFin').val())) {
            alert("El campo mes debe ser un número 1-12");
            $('#mesFin').focus();
            return false;
        }
        if (mes($('#mesFin').val())) {
            alert("Mes de Fin Incorrecto");
            $('#mesFin').focus();
            return false;
        }
        mesFin = $('#mesFin').val();
        $('#mesFin').val(pad(mesFin, 2));
    }
    if (!vacio($('#yearFin').val())) {
        if (!numero($('#yearFin').val())) {
            alert("El campo año debe ser un número");
            $('#yearFin').focus();
            return false;
        }
        if (year($('#yearFin').val())) {
            alert("Año de Fin Incorrecto");
            $('#yearFin').focus();
            return false;
        }
    }
    /*if ($('#yearFin').val()<$('#yearInicio').val()){
     alert("El año de finalización no puede ser inferior al de inicio");
     return false;
     }*/ /*Problema cuando no ponemos año de finalizacion de produccion*/
    console.log("ADELANTE");
    return true;

}
