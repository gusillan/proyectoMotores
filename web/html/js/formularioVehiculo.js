

/*  Variables globales
 *********************************************************/
ventanaEntidad = new VentanaEmergente({
    modal: 'entidadModal',
    titulo: 'Búsqueda por nombre',
    campos: ['nombre', 'poblacion'],
    campoID: 'idEntidad',
    callback: rellenaCliente
});

ventanaModelo = new VentanaEmergente({
    modal: 'modeloModal',
    titulo: 'Búsqueda por modelo',
    campos: ['codigo', 'descripcion'],
    campoID: 'idModelo',
    callback: rellenaModelo
});

ventanaMotor = new VentanaEmergente({
    modal: 'motorModal',
    titulo: 'Búsqueda por motor',
    campos: ['codigo', 'descripcion'],
    campoID: 'idMotor',
    callback: rellenaMotor
});

ventanaMatricula = new VentanaEmergente({
    modal: 'matriculaModal',
    titulo: 'Busqueda de matrícula',
    campos: ['matricula', 'modelo.descripcion', 'motor.descripcion'],
    campoID: 'idVehiculo'
});


/*  Listener
 ***********************************************************/
$("document").ready(function() {

    consultaModelo();
    consultaMotor();
    consultaCliente();

    $("#fechaMatricula").mask("99/99/9999"); // sin lineas("99/9999", {placeholder: " "})

    $("#matricula").change(consultaMatricula);
    $("#codigoModelo").change(consultaModelo);
    $("#codigoMotor").change(consultaMotor);
    $("#codigoCliente").change(consultaCliente);
    //Botones de busqueda
    $("#buscarEntidad").click(buscarEntidad);
    $("#buscarModelo").click(buscarModelo);
    $("#buscarMotor").click(buscarMotor);


    /* Ventana lateral */
    $(".g-button-aside-close").click(function() {
        $(".g-aside").hide();
        $(".g-button-aside-open").show();
    });
    $(".g-button-aside-open").click(function() {
        $(".g-aside").show();
        $(".g-button-aside-open").hide();
    });

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
            success: limpiar
        });
    }
}

function baja() {
    var data = $("#formVehiculo").serialize();
    console.log("Serializada " + data);
    $.ajax({
        url: '../bajaVehiculo.htm',
        data: data,
        type: 'POST',
        success: limpiar
    });
}


/* Funciones de Consulta de codigos
 ************************************************************/

function consultaCliente() {
    if (!vacio($("#codigoCliente"))) {
        var cliente = $("#codigoCliente").val();
        console.log("Cliente " + cliente);
        $.getJSON(
                '../consultaClientePorCodigo.htm',
                {codigo: cliente},
        respuestaConsultaCliente);
    } else {
        $("#nombreCliente").val("");
    }

}

/* Funciones operativas
 ************************************************************/



function rellenaFormulario(obj) {
    $("#idVehiculo").val(obj.idVehiculo);
    $("#matricula").val(obj.matricula);
    $("#chasis").val(obj.chasis);
    $("#fechaMatricula").val(obj.fechaMatricula);
    $("#informacion").val(obj.informacion);
    $("#baja").attr("disabled", false);

    rellenaModelo(obj.modelo);
    rellenaMotor(obj.motor);
    rellenaCliente(obj.entidad);

    $(".g-aside").show();
    $(".g-button-aside-open").hide();
}





function rellenaMotor(motor) {
    $("#descripcionMotor").val(motor.descripcion);
    $("#codigoMotor").val(motor.codigo);
    var combustible = "";
    switch (motor.combustible) {
        case "D":
            combustible = "Diesel";
            break;
        case "G":
            combustible = "Gasolina";
            break;
        case "H":
            combustible = "Híbrido";
            break;
        case "E":
            combustible = "Eléctrico";
            break;
    }
    $("#combustibleMotor").text(combustible);
    $("#cilindradaMotor").text(motor.cilindrada + " c.c.");
    $("#kwMotor").text(motor.kw + " Kw");
    $("#nombreFabricanteMotor").text(motor.fabricante.nombre);
}

function respuestaConsultaCliente(listaObjetos) {
    if (listaObjetos.length == 1) {
        var objeto = listaObjetos[0];
        rellenaCliente(objeto);
    } else if (listaObjetos.length > 1) {
        console.log("Existen varios Clientes con el mismo codigo.Consultar con el administrador de la BBDD");
    } else if (listaObjetos.length < 1) {
        console.log("No existe ningun Cliente con este codigo");
        $("#nombreCliente").val("");
        darAltaCliente();
    }
}

function rellenaCliente(cliente) {
    $("#codigoCliente").val(cliente.idEntidad);
    $("#nombreCliente").val(cliente.nombre);
    $("#poblacionEntidad").text(cliente.poblacion);
    $("#telefonoEntidad").text(cliente.telefono);
    $("#movilEntidad").text(cliente.movil);
}


/*  Busquedas
 *********************************************************/
function buscarEntidad() {
    if ($("#nombreCliente").val().length > 2) {
        console.log("Campo nombre RELLENO " + $("#nombreCliente").val().length);
        $.ajax({
            url: '../consultaPorNombre.htm',
            data: {nombre: $('#nombreCliente').val()},
            type: 'POST',
            dataType: 'json',
            success: respuestaBuscarEntidad
        });
    } else {
        console.log("Campo nombre debe tener 3 o mas caracteres");
    }
}

function respuestaBuscarEntidad(clientesJson) {
    if (clientesJson.length == 0) {
        console.log("Error: la consulta del nombre no ha obtenido ningun resultado");
    } else if (clientesJson.length == 1) {
        rellenaCliente(clientesJson[0]);
    } else {
        ventanaEntidad.abrir(clientesJson); //Abre la ventana Modal con la lista
        console.log("Abrir modal");
    }
}

function buscarModelo() {

    var descripcionModelo = $("#descripcionModelo").val()
    if (descripcionModelo.length > 1) {
        console.log("Campo modelo RELLENO");
        $.ajax({
            url: '../consultaPorDescripcionModelo.htm',
            data: {descripcion: descripcionModelo},
            type: 'POST',
            dataType: 'json',
            success: respuestaBuscarModelo
        });
    }
}

function respuestaBuscarModelo(modelos) {
    if (modelos.length == 0) {
        console.log("Error: la consulta del modelo no ha obtenido ningun resultado");
        $("#descripcionModelo").val("");
        $("#logoMarca").remove();

    } else if (modelos.length == 1) {
        rellenaModelo(modelos[0]);
    } else {
        ventanaModelo.abrir(modelos); //Abre la ventana Modal con la lista
    }
}

function buscarMotor() {

    var descripcionMotor = $("#descripcionMotor").val()
    if (descripcionMotor.length > 2) {
        console.log("Campo motor RELLENO");
        $.ajax({
            url: '../consultaPorDescripcionMotor.htm',
            data: {descripcion: descripcionMotor},
            type: 'POST',
            dataType: 'json',
            success: respuestaBuscarMotor

        });
    }
}

function respuestaBuscarMotor(motores) {
    if (motores.length == 0) {
        console.log("Error: la consulta del motor no ha obtenido ningun resultado");
    } else if (motores.length == 1) {
        rellenaMotor(motores[0]);
    } else {
        ventanaMotor.abrir(motores); //Abre la ventana Modal con la lista
    }
}

function darAltaCliente() {
    var respuesta = confirm("Desea dar de alta este Cliente?");
    if (respuesta == true) {
        console.log("Ha pulsado si");
        window.location = "../html/formularioEntidad.html";
    } else {
        console.log("Ha pulsado no");
        $("#codigoCliente").val("");
        $("#codigoCliente").focus();
    }
}