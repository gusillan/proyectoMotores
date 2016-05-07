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

    $('#alta').click();
    $('#limpiar').click(limpiar);
    $('#salir').click(salir);


});


function compruebaCodigo(codigo) {
    $.getJSON('consultaCodigoMotor.htm', {codigo: codigo}, rellenaFormulario);
}
function compruebaAntesDeAlta(codigo) {
    $.getJSON('consultaCodigoMotor.htm', {codigo: codigo}, consultarAlta);
}
function rellenaFormulario(listaMotor) {
    console.log("respuesta ajax" + listaMotor);
    if (listaMotor.length == 1) {
        var motor = listaMotor[0];
        $('#idMotor').val(motor.idMotor);
        $('#codigo').val(motor.codigo);
        $('#descripcion').val(motor.descripcion);
        $('#combustible').val(motor.combustible);
        compruebaCombustible(motor.combustible);
        $('#cilindrada').val(motor.cilindrada);
        $('#kw').val(motor.kw);
        var kw = $('#kw').val();
        var cv = kw * 1.36;
        $('#cv').val(cv.toFixed(2));
        $('#marca').val(motor.fabricante.codigo);
        $('#marcaMotor').val(motor.fabricante.nombre);
    } else if (listaMotor.length > 1) {
        console.log("HAY MAS DE UNO");
    } else {
        console.log("No existe");
    }
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
    $('#codigo').focus();
}
function salir() {
    location.href = 'index.htm';
}

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

