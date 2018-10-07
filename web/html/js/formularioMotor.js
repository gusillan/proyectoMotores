
/*  Variables globales
 ******************************************************************************/
ventanaMotores = new VentanaEmergente({
    modal: 'motoresModal',
    titulo: 'Seleccionar motor',
    campos: ['codigoMotor', 'descripcionMotor', 'kwMotor', 'fabricante.nombreFabricante'], //,'fabricante.nombre'],
    campoID: 'idMotor',
    callback : rellenaFormularioMotor
});

/*  Listener
 ******************************************************************************/
$("document").ready(function() {

    console.log("Codigo " + getQueryVariable("codigo"));
    if (getQueryVariable("codigo")) {
        $("#codigo").val(getQueryVariable("codigo"));
    }

    //consultarMarca();

    $("#codigoMotor").change(consultaCodigoMotor);
    $("#codigoFabricante").change(consultaCodigoFabricanteCampos);

    $('#kwMotor').change(function() {
        var kwMotor = this.value;
        var cv = kwMotor * 1.36;
        $('#cv').val(cv.toFixed(2));
    });

    $("#nuevoMotorBoton").click(function() {
        var codigo = $("#codigoMotor").val();
        limpiar();
        $('#descripcionMotor').focus();
        $("#codigoMotor").val(codigo);
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

function baja() {
    envioFormulario('../bajaMotor.htm');
    $("#codigoMotor").focus();
}

/* Funciones adicionales
 ******************************************************************************/

function consultaCodigoMotor(){
    if(!vacio($("#codigoMotor"))){
        var codigoMotor = this.value;
        peticionAjax("../consultaMotor.htm",codigoMotor,respuestaConsultaMotor)
    }else{
        borraFormularioMotor();
    }
} 

function respuestaConsultaMotor(listaMotores){
    if (listaMotores.length === 1){
        var motor = listaMotores[0];
        rellenaFormularioMotor(motor);
    }else if (listaMotores.length>1){
        console.log("HAY QUE MOSTRAR LOS DIFERENTES MOTORES");
        ventanaMotores.abrir(listaMotores);
    }else if (listaMotores.length<1){
        console.log("No existe ningun motor con ese codigo"); // Borrar
        borraFormularioMotor();
        desactivarBajaMotor();
    }
}

function rellenaFormularioMotor(motor) {
    $("#idMotor").val(motor.idMotor);
    $("#codigoMotor").val(motor.codigoMotor);
    $("#descripcionMotor").val(motor.descripcionMotor);
    $('#combustibleMotor option[value="' + motor.combustibleMotor + '"]').prop('selected', true);
    $("#cilindradaMotor").val(motor.cilindradaMotor);
    $("#kwMotor").val(motor.kwMotor);
    var kwMotor = $('#kwMotor').val();
    var cv = kwMotor * 1.36;
    $('#cv').val(cv.toFixed(2));
    $("#idFabricante").val(motor.idFabricante);
    $("#codigoFabricante").val(motor.fabricante.codigoFabricante);
    $("#nombreFabricante").val(motor.fabricante.nombreFabricante);
    $("#logoFabricante").attr("src", "img/marcas/" + motor.fabricante.logoFabricante);
    $("#infoMotor").val(motor.infoMotor);
    $("#nuevoMotorBoton").show();    
    updateFocusables();
    activarBajaMotor();
}

function borraFormularioMotor() {
    var codigoMotor = $("#codigoMotor").val();
    $("#formulario")[0].reset();
    $("#codigoMotor").val(codigoMotor);
    $("#logoFabricante").attr("src", "");
}

function desactivarBajaMotor() {    
    $("#baja").attr("disabled", true);
}

function activarBajaMotor() {
    $("#baja").attr("disabled", false);
}

/*
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
   
    ventanaMotores.abrir(listaObjetos);
}*/







