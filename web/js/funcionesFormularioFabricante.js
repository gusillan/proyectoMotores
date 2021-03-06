$(function() {

    $('input').keyup(function() {
        this.value = this.value.toUpperCase();
    });
    $('#codigo').blur(function() {
        var codigo = this.value;
        if (vacio(codigo)) {
            console.log("Campo Codigo Vacio");
        } else {
            compruebaCodigo(codigo);
        }
    });
    $('#logo').blur(function() {
        $('#imgLogo').attr("src", "img/marcas/" + ($('#logo').val()).toLowerCase());
    });
    $('#alta').click(validarAlta);
    $('#baja').click(confirmarBaja);
    $('#modificar').click(confirmarModificacion);
    $('#limpiar').click(limpiar);
    $('#salir').click(salir);

    $('#codigo').focus();
});

function compruebaCodigo(codigo) {
    $.getJSON('consultaFabricante.htm', {codigoFabricante: codigo}, procesaRespuestaUnica).fail(anulaBajaModificar);
}

function anulaBajaModificar(){
    $('#baja').attr('disabled',true);
    $('#modificar').attr('disabled',true);  
}

function procesaRespuestaUnica(listaFabricante) {
    console.log('llega aqui');
    var fabricante = listaFabricante[0];
    rellenaForm(fabricante);
    $('#alta').attr('disabled', true);
}

function rellenaForm(fabricante) {
    $('#idFabricante').val(fabricante.idFabricante);
    $('#codigo').val(fabricante.codigo);
    $('#nombre').val(fabricante.nombre);
    $('#logo').val(fabricante.logo);
    $('#imgLogo').attr("src", "img/marcas/" + fabricante.logo);
}

function validarAlta() {
    if (validacion()) {
        console.log("ALTA");
        if (confirmarAlta()) {
            alta();
        } else {
            limpiar();
        }
    } else {
        console.log("ERROR DE VALIDACION");
    }
}
function alta() {
    codigo = $('#codigo').val();
    nombre = $('#nombre').val();
    logo = $('#logo').val();
    $.ajax({
        url: 'altaFabricante.htm',
        data: {codigo: codigo, nombre: nombre, logo: logo},
        type: 'POST',
        success: limpiar
    });
}

function baja() {
    idFabricante = $('#idFabricante').val();
    codigo = $('#codigo').val();
    nombre = $('#nombre').val();
    logo = $('#logo').val();
    $.ajax({
        url: 'bajaFabricante.htm',
        data: {idFabricante : idFabricante,codigo: codigo, nombre: nombre, logo: logo},
        type: 'POST',
        success: limpiar
    });
}

function modificar() {
    idFabricante = $('#idFabricante').val();
    codigo = $('#codigo').val();
    nombre = $('#nombre').val();
    logo = $('#logo').val();
    $.ajax({
        url: 'modificaFabricante.htm',
        data: {idFabricante : idFabricante,codigo: codigo, nombre: nombre, logo: logo},
        type: 'POST',
        success: limpiar
    });
}

function limpiar() {
    $('#formularioFabricantes')[0].reset();
    $('#imgLogo').attr('src', "img/marcas/logo.png");
    $('#alta').attr('disabled', false);
    $('#baja').attr('disabled',false);
    $('#modificar').attr('disabled',false);  
    $('#codigo').focus();
}   

function salir() {
    window.history.back();
}

function compruebaMarca(marca) {
    $.getJSON("consultaFabricante.htm", {codigoFabricante: marca}, function(fabricante) {
        $('#marcaMotor').val(fabricante[0].nombre);
    });
}

function validacion() {
    if (vacio($('#codigo').val())) {
        alert("Campo codigo VACIO");
        $('#codigo').focus();
        return false;
    }
    if (vacio($('#nombre').val())) {
        alert("Campo nombre VACIO");
        $('#nombre').focus();
        return false;
    }
    if (vacio($('#logo').val())) {
        alert("Campo logotipo VACIO");
        $('#logo').focus();
        return false;
    }
    else {
        return true;
    }

}


