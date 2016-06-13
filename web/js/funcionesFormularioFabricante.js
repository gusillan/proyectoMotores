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

    $('#alta').click(confirmarAlta);
    $('#limpiar').click(limpiar);
    $('#salir').click(salir);
    
    $('#codigo').focus();


});


function compruebaCodigo(codigo) {
    $.getJSON('consultaFabricante.htm', {codigoFabricante: codigo}, procesaRespuesta).fail(limpiar);
}

function compruebaAntesDeAlta(codigo) {
    $.getJSON('consultaCodigoMotor.htm', {codigo: codigo}, consultarAlta);
}

function procesaRespuesta(listaFabricante) {
    var fabricante = listaFabricante[0];
    rellenaForm(fabricante);
}

function rellenaForm(fabricante) {
    $('#idFabricante').val(fabricante.idFabricante);
    $('#codigo').val(fabricante.codigo);
    $('#nombre').val(fabricante.nombre);
    $('#logo').val(fabricante.logo);
    $('#imgLogo').attr("src", "img/marcas/" + fabricante.logo);

}
function consultarAlta(listaMotor) {
    console.log("respuesta Ajax " + listaMotor);
    if (listaMotor.length > 0) {
        alert("seguro que desea dar de alta un codigo repetido?");
    } else {
        console.log("SE va a dar de alta");
    }
}
function alta() {
    if (validacion()) {
        console.log("ALTA");
        $('#formularioMotores').submit();
    } else {
        console.log("ERROR DE VALIDACION");
    }

}
function limpiar() {
    $('#imgLogo').attr('src', "img/marcas/logo.png");
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
    if (vacio($('#descripcion').val())) {
        console.log("Campo descripcion VACIO");
        return false;
    }
    if (vacio($('#tipoCombustible').val())) {
        console.log("Campo combustible VACIO");
        return false;
    }
    if (vacio($('#cilindrada').val())) {
        console.log("Campo cilindrada VACIO");
        return false;
    }
    if (vacio($('#kw').val())) {
        console.log("Campo kilowatios VACIO");
        return false;
    }
    if (vacio($('#marcaMotor').val())) {
        console.log("Campo marca VACIO");
        return false;
    }
    else {
        return true;
    }


}

function minmax(min, max, dato) {
    if (dato.length > max) {
        console.log("excedido limite máximo");
        return false;
    } else if (dato.length < min) {
        console.log("inferior al mínimo");
        return false;
    }
    return true;
}
function dni(dato) {
    var letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];

    if (!(/^\d{8}[A-Z]$/.test(dato))) {
        return false;
    }

    if (dato.charAt(8) !== letras[(dato.substring(0, 8)) % 23]) {
        return false;
    }
}
function numero(dato) {
    if (/^([0-9])*$/.test(dato)) {
        return true;
    } else {
        return false;
    }
}
function vacio(dato) {
    if (dato.length < 1) {
        return true;
    } else {
        return false;
    }
}

