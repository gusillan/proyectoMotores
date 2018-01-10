


/*  Variables globales
 *********************************************************/
ventanaMotores = new VentanaEmergente({
        modal: 'motoresModal',
        titulo: 'Seleccionar motor',
        campos: ['codigo','descripcion','kw'], //,'fabricante.nombre'],
        campoID: 'idMotor',
        filtros: []       
    });



/*  Listener
 *********************************************************/
$("document").ready(function() {

    $("#codigo").blur(consultaCodigo);
    $("#codigoMarca").blur(consultarMarca);

    $('#kw').blur(function() {
        var kw = this.value;
        var cv = kw * 1.36;
        $('#cv').val(cv.toFixed(2));
    });


    $("#nuevoMotorBotonGroup").click(function(){      
        var codigo = $("#codigo").val();
        limpiar();
        $('#descripcion').focus();
        $("#codigo").val(codigo);
        $("#nuevoMotorBotonGroup").hide();
        $("#nuevoMotorBotonGroup input").attr("disabled", true);
        updateFocusables();
    });


});




/* Funciones Básicas Botones
 **********************************************************/

function guardar() {

    if (validarFormulario()) {
        var data = $("#formMotor").serialize();
        console.log("Serializada " + data);
        $.ajax({
            url: '../guardaMotor.htm',
            data: data,
            type: 'POST',
            success: limpiar
        });
    } else {
        console.log("Formulario no valido");
    }
}

function baja() {
    // Confirmar Baja
    var data = $("#formMotor").serialize();
    $.ajax({
        url: '../bajaMotor.htm',
        data: data,
        type: 'POST',
        success: limpiar
    });
}

/* Funciones adicionales
 ********************************************************/

function consultaCodigo() {
    if ($("#codigo").val().length > 0) {
        console.log("vamos a consultar el código " + this.value);
        var codigo = this.value;
        $.getJSON('../consultaCodigoMotor.htm', {codigo: codigo}, respuestaConsultaMotores);

    }
}

function respuestaConsultaMotores(listaObjetos) {

    if (listaObjetos.length == 1) {
        var objeto = listaObjetos[0];
        rellenaFormulario(objeto);
    } else if (listaObjetos.length > 1) {
        console.log("Existen varios fabricantes con ese Codigo.Consultar al administrador de la BBDD");
        console.log("Esta es la lista " + listaObjetos);
        ventanaMotores.abrir( listaObjetos );
    } else if (listaObjetos.length < 1) {
        console.log("No existe ningun fabricante con ese Codigo");
    }
}

function rellenaFormulario(obj) {
    $("#idMotor").val(obj.idMotor);
    $("#codigo").val(obj.codigo);
    $("#descripcion").val(obj.descripcion);
    $('#combustible option[value="' + obj.combustible + '"]').prop('selected', true);
    $("#cilindrada").val(obj.cilindrada);
    $("#kw").val(obj.kw);
    var kw = $('#kw').val();
    var cv = kw * 1.36;
    $('#cv').val(cv.toFixed(2));
    $("#idMarca").val(obj.idMotor);
    $("#codigoMarca").val(obj.fabricante.codigo);
    $("#marcaMotor").val(obj.fabricante.nombre);
    $("#logoMarca").attr("src", "img/marcas/"+obj.fabricante.logo); 
    $("#informacion").val(obj.informacion);
    $("#nuevoMotorBotonGroup").show();
    $("#nuevoMotorBotonGroup input").attr("disabled", false);
    $("#baja").attr("disabled",false);
    updateFocusables();
}

function consultarMarca() {
    var marca = $("#codigoMarca").val()
    console.log("Consultar marca " + marca);
    $.ajax({
        url: '../consultaFabricante.htm',
        data: {codigo: marca},
        type: 'POST',
        success: respuestaConsultaMarca
    });
}

function respuestaConsultaMarca(listaObjetos) {

    if (listaObjetos.length == 1) {
        var objeto = listaObjetos[0];
        rellenaMarca(objeto);
    } else if (listaObjetos.length > 1) {
        console.log("Existen varios fabricantes con ese Codigo.Consultar al administrador de la BBDD");
    } else if (listaObjetos.length < 1) {
        console.log("No existe ningun fabricante con ese Codigo");
    }
}

function rellenaMarca(marca) {
    $("#marcaMotor").val(marca.nombre);
    $("#logoMarca").attr("src", "img/marcas/" + marca.logo);
}

