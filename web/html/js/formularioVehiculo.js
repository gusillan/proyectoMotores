

/*  Variables globales
 *********************************************************/
ventanaEntidad = new VentanaEmergente({
        modal: 'entidadModal',
        titulo: 'Busqueda por nombre',
        campos: ['nombre','poblacion'],
        campoID: 'idEntidad',
        filtros: ['nombre','poblacion']   ,
        callback: rellenaCliente     
    });


/*  Listener
 ***********************************************************/
$("document").ready(function() {


    $("#fechaMatricula").mask("99/99/9999"); // sin lineas("99/9999", {placeholder: " "})

    $("#matricula").blur(consultaMatricula);
    $("#codigoModelo").blur(consultaModelo);
    $("#codigoMotor").blur(consultaMotor);
    $("#codigoCliente").blur(consultaCliente);


    //Busquedas
    $("#buscarEntidad").click(consultaEntidad);

});

/* Funciones Básicas Botones
 *************************************************************/

function guardar() {

    if (validarFormulario()) {
        var data = $("#formVehiculo").serialize();
        console.log("Serializada " + data);
        $.ajax({
            url: '../guardaVehiculo.htm',
            data: data,
            type: 'POST',
            sucess: limpiar
        });
    }

}

function baja() {

}







function consultaMatricula() {

    var matricula = $("#matricula").val();

    console.log("Vamos a consultar la matricula " + matricula);
    if (!vacio($("#matricula"))) {
        $.getJSON(
                '../consultaMatricula.htm',
                {matricula: matricula},
        respuestaConsultaMatricula);
    } else {
        console.log("Campo de matrícula vacio");
    }

}

function consultaModelo() {
    var modelo = this.value;
    console.log("Modelo " + modelo);
    $.getJSON(
            '../consultaModelo.htm',
            {codigo: modelo},
    respuestaConsultaModelo);
}

function consultaMotor() {
    var motor = this.value;
    console.log("Motor " + motor);
    $.getJSON(
            '../consultaCodigoMotor.htm',
            {codigo: motor},
    respuestaConsultaMotor);
}

function consultaCliente() {
    var cliente = this.value;
    console.log("Cliente " + cliente);
    $.getJSON(
            '../consultaClientePorCodigo.htm',
            {codigo: cliente},
    respuestaConsultaCliente);
}

function respuestaConsultaMatricula(listaObjetos) {
    if (listaObjetos.length == 1) {
        var objeto = listaObjetos[0];
        rellenaFormulario(objeto);
    } else if (listaObjetos.length > 1) {
        console.log("Existen varias vehiculos son la misma matrícula.Consultar con el administrador de la BBDD");
    } else if (listaObjetos.length < 1) {
        console.log("No existe ningun vehiculo con esta matricula ");
    }
}

function rellenaFormulario(obj) {
    $("#idVehiculo").val(obj.idVehiculo);
    $("#matricula").val(obj.matricula);
    $("#chasis").val(obj.chasis);
    $("#codigoModelo").val(obj.modelo.codigo);
    $("#descripcionModelo").val(obj.modelo.descripcion);
    $("#codigoMotor").val(obj.motor.codigo);
    $("#descripcionMotor").val(obj.motor.descripcion);
    $("#fechaMatricula").val(obj.fechaMatricula);
    $("#codigoCliente").val(obj.entidad.idEntidad);
    $("#nombreCliente").val(obj.entidad.nombre);
    $("#informacion").val(obj.informacion);
}

function respuestaConsultaModelo(listaObjetos) {
    if (listaObjetos.length == 1) {
        var objeto = listaObjetos[0];
        rellenaModelo(objeto);
    } else if (listaObjetos.length > 1) {
        console.log("Existen varios Modelos con el mismo codigoa.Consultar con el administrador de la BBDD");
    } else if (listaObjetos.length < 1) {
        console.log("No existe ningun vehiculo con esta matricula ");
    }
}

function rellenaModelo(modelo) {
    $("#descripcionModelo").val(modelo.descripcion);
    $("#codigoMotor").focus();
}

function respuestaConsultaMotor(listaObjetos) {
    if (listaObjetos.length == 1) {
        var objeto = listaObjetos[0];
        rellenaMotor(objeto);
    } else if (listaObjetos.length > 1) {
        console.log("Existen varios Motores con el mismo codigoa.Consultar con el administrador de la BBDD");
    } else if (listaObjetos.length < 1) {
        console.log("No existe ningun Motor con este codigo");
    }
}

function rellenaMotor(motor) {
    $("#descripcionMotor").val(motor.descripcion);
    $("#fechaMatricula").focus();

}

function respuestaConsultaCliente(listaObjetos) {
    if (listaObjetos.length == 1) {
        var objeto = listaObjetos[0];
        rellenaCliente(objeto);
    } else if (listaObjetos.length > 1) {
        console.log("Existen varios Clientes con el mismo codigo.Consultar con el administrador de la BBDD");
    } else if (listaObjetos.length < 1) {
        console.log("No existe ningun Cliente con este codigo");
    }
}

function rellenaCliente(cliente){
    $("#codigoCliente").val(cliente.idEntidad);
    $("#nombreCliente").val(cliente.nombre);
}


/*  Busquedas
 *********************************************************/
function consultaEntidad() {
    if ($("#nombreCliente").val().length>2) {
        console.log("Campo nombre RELLENO "+$("#nombreCliente").val().length ) ;
        $.ajax({
            url: 'http://localhost:8084/ProyectoMotores/consultaPorNombre.htm',
            data: {nombre: $('#nombreCliente').val()},
            type: 'POST',
            dataType: 'json',
            success: respuestaConsultaEntidad
        });
    } else {
        console.log("Campo nombre debe tener 3 o mas caracteres");
    }
}

function respuestaConsultaEntidad(responseJson) {
    clientesJson = responseJson;
    if (clientesJson.length == 0) {
        console.log("Error: la consulta del nombre no ha obtenido ningun resultado");
    } else if (clientesJson.length == 1) {
        rellenaCliente(clientesJson[0]);
    } else {
        ventanaEntidad.abrir( responseJson );   //Abre la ventana Modal con la lista
    }
}
