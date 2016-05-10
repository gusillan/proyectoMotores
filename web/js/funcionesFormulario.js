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
    $('#kw').blur(function() {
        var kw = this.value;
        var cv = kw * 1.36;
        $('#cv').val(cv.toFixed(2));
    });
    $('#marca').blur(function() {
        var marca = this.value;
        if (vacio(marca)) {
            console.log("Campo Marca Vacio");
        } else {
            console.log("Envio datos -> : " + marca);
            compruebaMarca(marca);
        }
    });
    $('#alta').click(compruebaAntesDeAlta);
    $('#baja').click(baja);
    $('#modificar').click(modificar);
    $('#limpiar').click(limpiar);
    $('#listado').click(listar);
    $('#salir').click(salir);
    $('select#listaMotores').on('dblclick', function() {
        var valor = $(this).val();
        rellenaForm(listaGlobal[valor]);
        $('#listaMotores').empty();
        $('#dialog').dialog("close");
    });
    $('#codigo').focus();
    $('#Dvolver').click(volverDialog);
    $('#Dcontinuar').click(continuarAlta);

});
function continuarAlta() {
    $('#listaMotores').empty();
    $('#dialog').dialog("close");
    $('#descripcion').focus();
}
function volverDialog() {
    $('#listaMotores').empty();
    $('#dialog').dialog("close");
    limpiar();
}
function compruebaCodigo(codigo) {
    $.getJSON('consultaCodigoMotor.htm', {codigo: codigo}, rellenaFormulario);
}
function compruebaAntesDeAlta() {
    var codigo = $('#codigo').val();
    //Opción si el codigo está vacio
    $.getJSON('consultaCodigoMotor.htm', {codigo: codigo}, consultarAlta);
}
function rellenaFormulario(listaMotor) {
    console.log("respuesta ajax " + listaMotor);
    if (listaMotor.length == 1) {
        console.log("SOLO HAY UNO");
        var motor = listaMotor[0];
        rellenaForm(motor);
    } else if (listaMotor.length > 1) {
        console.log("HAY MAS DE UNO");
        ventanaOpciones(listaMotor);
    } else if (listaMotor.length < 1) {
        console.log("NO EXISTE");
    }
}
function rellenaForm(motor) {
    $('#idMotor').val(motor.idMotor);
    $('#codigo').val(motor.codigo);
    $('#descripcion').val(motor.descripcion);
    $('#combust option[value="' + motor.combustible + '"]').prop('selected', true);
    $('#cilindrada').val(motor.cilindrada);
    $('#kw').val(motor.kw);
    var kw = $('#kw').val();
    var cv = kw * 1.36;
    $('#cv').val(cv.toFixed(2));
    $('#marca').val(motor.fabricante.codigo);
    $('#marcaMotor').val(motor.fabricante.nombre);
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
        console.log("Codigo nuevo _introducir datos");
        alta();
    }
}
function alta() {
    if (validacion()) {
        var r = confirm('Confirma el alta?');
        if (r == true) {
            $('#formularioMotores').submit();
        } else {
            $('#descripcion').focus();
        }

    } else {
        console.log("ERROR DE VALIDACION");
    }

}
function baja() {
    if (validacion()) {
        var r = confirm('Seguro que desea darlo de baja?');
        if (r == true) {
            $('#formularioMotores').attr('action', 'bajaMotor.htm');
            $('#formularioMotores').submit();
        } else {
            $('#descripcion').focus();
        }
    }
}

function modificar() {
    if (validacion()) {
        var r = confirm('Confirma la modificacion?');
        if (r == true) {
            $('#formularioMotores').attr('action', 'modificarMotor.htm');
            $('#formularioMotores').submit();
        } else {
            $('#descripcion').focus();
        }

    } else {
        console.log("ERROR DE VALIDACION");
    }
}
function limpiar() {
    $('#formularioMotores')[0].reset();
    $('#listaMotores').empty();//Borrar Select motores    
    $('#codigo').focus();
}
function listar(){
 
    ventanaMarca.document.getElementById("prueba").innerHTML= "HOLA";
}
function salir() {
    location.href = 'index.htm';
}
function ventanaOpciones(listaMotor) {
    listaGlobal = listaMotor;
    $.each(listaGlobal, function(indice, motor) {
        $('#listaMotores').append('<option value=' + indice + '>' + motor.idMotor + ' - ' + motor.descripcion + ' ' + motor.kw + ' KW</option>');
    });
    $('#dialog').dialog({
        modal: true
    });
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
    if (vacio($('#descripcion').val())) {
        alert("Campo descripcion VACIO");
        $('#descripcion').focus();
        return false;
    }
    if ($('#combust').val() == 'A') {
        alert("Campo combustible VACIO");
        $('#combust').focus();
        return false;
    }
    if (vacio($('#cilindrada').val())) {
        alert("Campo cilindrada VACIO");
        $('#cilindrada').focus();
        return false;
    }
    if (!numero($('#cilindrada').val())) {
        alert("El campo cilindrada debe ser un número entero");
        $('#cilindrada').focus();
        return false;
    }
    if (vacio($('#kw').val())) {
        alert("Campo kilowatios VACIO");
        $('#kw').focus();
        return false;
    }
    if (!numero($('#kw').val())) {
        alert("El campo KW debe ser un número entero");
        $('#kw').focus();
        return false;
    }
    if (vacio($('#marcaMotor').val())) {
        alert("Campo marca VACIO");
        $('#marca').focus();
        return false;
    }
    else {
        return true;
    }


}
function irMarca() {
    var ventanaMarca = window.open('formularioFabricante.htm','miventana', 'titlebar=no, menubar=no, toolbar=no, location=no, status=no');
    ventanaMarca.document.prueba = "Texto que voy a insertar";
    //ventanaMarca.document.write(ventanaMarca.strHijo);
    //setTimeout('cambiarTexto()',3000);
    
   
}
function cambiarTexto(){
    
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

