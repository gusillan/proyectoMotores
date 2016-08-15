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
            $('#marcaMotor').val('');
            $('#imgLogo').attr('src', "img/marcas/logo.png");
        } else {
            compruebaMarca(marca);
        }
    });
    $('#alta').click(compruebaAntesDeAlta);
    $('#baja').click(confirmarBaja);
    $('#modificar').click(confirmarModificacion);
    $('#limpiar').click(limpiar);
    $('#listado').click(listar);
    $('#salir').click(salir);

    $('select#listaMotores').on('dblclick', seleccionarOpcion);
    $('#Dvolver').click(volverDialog);
    $('#Dseleccionar').click(seleccionarOpcion);
    $('#Dcontinuar').click(continuarAlta);

    $('#codigo').focus();

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
function seleccionarOpcion() {
    var opcion = $('#listaMotores').val();
    rellenaForm(listaGlobal[opcion]);
    $('#listaMotores').empty();
    $('#dialog').dialog("close");
}
function compruebaCodigo(codigo) {
    $.getJSON('consultaCodigoMotor.htm', {codigo: codigo}, procesaRespuesta);
}
function compruebaAntesDeAlta() {
    var codigo = $('#codigo').val();
    //Opción si el codigo está vacio
    $.getJSON('consultaCodigoMotor.htm', {codigo: codigo}, consultarAlta);
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
    $('#imgLogo').attr("src", "img/marcas/" + motor.fabricante.logo);
}
function consultarAlta(listaMotor) {
    if (listaMotor.length > 0) {
        var r = confirm("Confirme que desea dar de alta un código repetido?");
        if (r == true) {
            if (validacion()) {
                alta();
            }
        } else {
            limpiar();
        }
    } else {
        if (confirmarAlta()) {
            alta();
        } else {
//                $('#descripcion').focus();
        }
    }
}

function alta() {
        
    codigo = $('#codigo').val();
    descripcion = $('#descripcion').val();
    combustible = $('#combust').val();
    cilindrada = $('#cilindrada').val();
    kw = $('#kw').val();
    marca = $('#marca').val();
    
    $.ajax({
        url: 'altaMotor.htm',
        data: {codigo: codigo, descripcion: descripcion,combustible : combustible,
               cilindrada : cilindrada,kw : kw, marca : marca},
        type: 'POST',
        success: limpiar
    });      
}
function baja() {
    
    idMotor = $('#idMotor').val();
    codigo = $('#codigo').val();
    descripcion = $('#descripcion').val();
    combustible = $('#combust').val();
    cilindrada = $('#cilindrada').val();
    kw = $('#kw').val();
    marca = $('#marca').val();
    
    $.ajax({
        url: 'bajaMotor.htm',
        data: {idMotor : idMotor,codigo: codigo, descripcion: descripcion,
               combustible : combustible, cilindrada : cilindrada,
               kw : kw, marca : marca},
        type: 'POST',
        success: limpiar
    });      
}
function modificar() {
    
    idMotor = $('#idMotor').val();
    codigo = $('#codigo').val();
    descripcion = $('#descripcion').val();
    combustible = $('#combust').val();
    cilindrada = $('#cilindrada').val();
    kw = $('#kw').val();
    marca = $('#marca').val();
    
    $.ajax({
        url: 'modificarMotor.htm',
        data: {idMotor : idMotor,codigo: codigo, descripcion: descripcion,
               combustible : combustible, cilindrada : cilindrada,
               kw : kw, marca : marca},
        type: 'POST',
        success: limpiar
    });      
}
function limpiar() {
    $('#formularioMotores')[0].reset();
    $('#listaMotores').empty();//Borrar Select motores  
    $('#imgLogo').attr('src', "img/marcas/logo.png");
    $('#baja').attr('disabled',false);
    $('#modificar').attr('disabled',false);    
    $('#codigo').focus();
}
function listar() {
    alert('Listado de Motores');
}
function salir() {
    location.href = 'index.htm';
}
function ventanaOpciones(listaMotor) {
    listaGlobal = listaMotor;
    $.each(listaGlobal, function(indice, motor) {
        $('#listaMotores').append('<option value=' + indice + '>' + motor.idMotor + ' - ' + motor.fabricante.nombre + ' - ' + motor.descripcion + ' ' + motor.kw + ' KW</option>');
    });
    $('#listaMotores > option[value="0"]').attr('selected', 'selected');
    $('#dialog').dialog({
        modal: true,
        width: 450,
        height: 220
    });
}
function compruebaMarca(marca) {
    $.getJSON("consultaFabricante.htm", {codigoFabricante: marca}, function(fabricante) {
        $('#marcaMotor').val(fabricante[0].nombre);
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
    if (!numeroDecimal($('#kw').val())) {
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

