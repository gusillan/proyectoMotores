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

    $('#marca').blur(function() {
        var marca = this.value;
        if (vacio(marca)) {
            console.log("Campo Marca Vacio");
            $('#marcaModelo').val('');
        } else {
            console.log("Envio datos -> : " + marca);
            compruebaMarca(marca);
        }
    });
    $('#alta').click(compruebaAntesDeAlta);
    $('#baja').click(confirmarBaja);
    $('#modificar').click(confirmarModificacion);
    $('#limpiar').click(limpiar);
    $('#listado').click(listar);
    $('#salir').click(salir);
    
    $('select#listaModelos').on('dblclick', seleccionarOpcion);   
    $('#Dvolver').click(volverDialog);
    $('#Dseleccionar').click(seleccionarOpcion);
    $('#Dcontinuar').click(continuarAlta); 
    
    $('#codigo').focus();
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
function compruebaCodigo(codigo) {
    $.getJSON('consultaCodigoModelo.htm', {codigo: codigo}, rellenaFormulario);
}
function compruebaAntesDeAlta() {
    var codigo = $('#codigo').val();
    //Opción si el codigo está vacio
    $.getJSON('consultaCodigoModelo.htm', {codigo: codigo}, consultarAlta);
}
function rellenaFormulario(listaModelos) {
    console.log("respuesta ajax " + listaModelos);
    if (listaModelos.length == 1) {
        console.log("SOLO HAY UNO");
        var modelo = listaModelos[0];
        console.log(modelo.descripcion);
        rellenaForm(modelo);
    } else if (listaModelos.length > 1) {
        console.log("HAY MAS DE UNO");
        ventanaOpciones(listaModelos);
    } else if (listaModelos.length < 1) {
        console.log("NO EXISTE");
    }
}
function rellenaForm(modelo) {
    $('#idModelo').val(modelo.idModelo);
    $('#codigo').val(modelo.codigo);
    $('#descripcion').val(modelo.descripcion);
    $('#marca').val(modelo.fabricante.codigo);
    $('#marcaModelo').val(modelo.fabricante.nombre);
    $('#mesInicio').val(modelo.mesInicio);
    $('#yearInicio').val(modelo.yearInicio);
    $('#mesFin').val(modelo.mesFin);
    $('#yearFin').val(modelo.yearFin);
    $('#imagen').val(modelo.imagen);
    $('#imgLogo').attr('src', 'img/marcas/' + modelo.fabricante.logo);
    $('#imgModelo').attr('src', 'img/modelos/' + modelo.imagen);

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
    $('#formularioModelo').attr('action', 'altaModelo.htm');
    $('#formularioModelo').submit();
}

function baja() {
    $('#formularioModelo').attr('action', 'bajaModelo.htm');
    $('#formularioModelo').submit();
}

function modificar() {
    $('#formularioModelo').attr('action', 'modificarModelo.htm');
            $('#formularioModelo').submit();        
}
function limpiar() {
    $('#formularioModelo')[0].reset();
    $('#listaModelos').empty();//Borrar Select motores 
    $('#imgLogo').attr('src', "img/marcas/logo.png");
    $('#imgModelo').attr('src', "img/modelos/generico.png");
    $('#codigo').focus();
}
function listar() {
    alert("Listado de Modelos");
}
function salir() {
    location.href = 'index.htm';
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
    console.log("ADELANTE");
    return true;

}

function irMarca() {
    var ventanaMarca = window.open('formularioFabricante.htm', 'miventana', 'titlebar=no, menubar=no, toolbar=no, location=no, status=no');
    ventanaMarca.document.prueba = "Texto que voy a insertar";
    //ventanaMarca.document.write(ventanaMarca.strHijo);
    //setTimeout('cambiarTexto()',3000);


}
