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
    $('#alta').click(consultarAlta);
    $('#baja').click(confirmarBaja);
    $('#modificar').click(confirmarModificacion);
    $('#limpiar').click(limpiar);
    $('#salir').click(salir);

    $('#codigo').focus();


});


function compruebaCodigo(codigo) {
    $.getJSON('consultaFabricante.htm', {codigoFabricante: codigo}, procesaRespuestaUnica)//.fail(limpiar);
}

function procesaRespuestaUnica(listaFabricante) {
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
function consultarAlta() {

    if (confirmarAlta()) {
        alta();
    } else {
        limpiar();
    }

}
function alta() {
    if (validacion()) {
        console.log("ALTA");
        $('#formularioFabricantes').attr('action', 'altaFabricante.htm');
        $('#formularioFabricantes').submit();       
    } else {
        console.log("ERROR DE VALIDACION");
    }
}
function limpiar() {
    $('#imgLogo').attr('src', "img/marcas/logo.png");
    $('#alta').attr('disabled', false);
    $('#codigo').focus();
}

/*function salir() {
 location.href = '/ProyectoMotores/index.htm';
 //location.href = ;
 }*/
function compruebaMarca(marca) {
    $.getJSON("consultaFabricante.htm", {codigoFabricante: marca}, function(fabricante) {
        $('#marcaMotor').val(fabricante[0].nombre);
    });
}
function validacion() {
    if (vacio($('#codigo').val())) {
        console.log("Campo codigo VACIO");
        return false;
    }
    if (vacio($('#nombre').val())) {
        console.log("Campo nombre VACIO");
        return false;
    }
    if (vacio($('#logo').val())) {
        console.log("Campo logotipo VACIO");
        return false;
    }
    else {
        return true;
    }

}


