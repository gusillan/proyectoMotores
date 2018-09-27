
/*  Variables globales
 ******************************************************************************/
ventanaMotores = new VentanaEmergente({
    modal: 'motoresModal',
    titulo: 'Seleccionar motor',
    campos: ['codigo', 'descripcion', 'kw', 'fabricante.nombre'], //,'fabricante.nombre'],
    campoID: 'idMotor'
});

/*  Listener
 ******************************************************************************/
$("document").ready(function() {

    console.log("Codigo " + getQueryVariable("codigo"));
    if (getQueryVariable("codigo")) {
        $("#codigo").val(getQueryVariable("codigo"));
    }

    //consultarMarca();

    $("#codigo").change(consultaCodigo);
    $("#codigoMarca").change(consultarMarca);

    $('#kw').change(function() {
        var kw = this.value;
        var cv = kw * 1.36;
        $('#cv').val(cv.toFixed(2));
    });

    $("#nuevoMotorBoton").click(function() {
        var codigo = $("#codigo").val();
        limpiar();
        $('#descripcion').focus();
        $("#codigo").val(codigo);
        $("#nuevoMotorBoton").hide();
        updateFocusables();
    });
});

/* Funciones Menú Principal
 ******************************************************************************/

function guardar() {
    if (validarFormulario()) {
        envioFormulario('../guardaMotor.htm');
    } else {
        console.log("ERROR - Formulario no válido");
    }
}
;

function baja() {
    envioFormulario('../bajaMotor.htm');
}

/* Funciones adicionales
 ******************************************************************************/

function consultaCodigo() {
    if (!vacio($("#codigo"))) {
        var codigo = this.value;
        peticionAjax('../consultaCodigoMotor.htm', codigo, respuestaConsultaCampo);
    } else {
        borraFormulario();
    }
}

function borraFormulario() {
    var codigo=$("#codigo").val();
    $("#formulario")[0].reset(); 
    $("#logoMarca").attr("src", "");    
    $("#codigo").val(codigo);    
}

function respuestaCeroObjetos() {
    borraFormulario();
}

function respuestaVariosObjetos(listaObjetos) {
    console.log("Existen varios fabricantes con ese Codigo"); //Borrar
    console.log("Esta es la lista " + listaObjetos);          //Borrar
    ventanaMotores.abrir(listaObjetos);
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
    $("#marca").val(obj.fabricante.nombre);
    $("#logoMarca").attr("src", "img/marcas/" + obj.fabricante.logo);
    $("#informacion").val(obj.informacion);
    $("#nuevoMotorBoton").show();
    $("#baja").attr("disabled", false);
    updateFocusables();
}





