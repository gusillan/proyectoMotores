

/*  Variables globales
 *********************************************************/
ventanaEntidad = new VentanaEmergente({
    modal: 'entidadModal',
    titulo: 'Búsqueda por nombre',
    campos: ['nombre', 'poblacion'],
    campoID: 'idEntidad',
    filtros: ['nombre', 'poblacion'],
    callback: rellenaCliente
});

ventanaModelo = new VentanaEmergente({
    modal: 'modeloModal',
    titulo: 'Búsqueda por modelo',
    campos: ['codigo', 'descripcion'],
    campoID: 'idModelo',
    filtros: ['codigo', 'descripcion'],
    callback: rellenaModelo

});

ventanaMotor = new VentanaEmergente({
    modal: 'motorModal',
    titulo: 'Búsqueda por motor',
    campos: ['codigo', 'descripcion'],
    campoID: 'idMotor',
    filtros: ['codigo', 'descripcion'],
    callback: rellenaMotor
});


/*  Listener
 ***********************************************************/
$("document").ready(function() {


    $("#fechaMatricula").mask("99/99/9999"); // sin lineas("99/9999", {placeholder: " "})

    $("#matricula").change(consultaMatricula);
    $("#codigoModelo").change(consultaModelo);
    $("#codigoMotor").change(consultaMotor);
    $("#codigoCliente").change(consultaCliente);
    //Botones de busqueda
    $("#buscarEntidad").click(buscarEntidad);
    $("#buscarModelo").click(buscarModelo);
    $("#buscarMotor").click(buscarMotor);
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

}


/* Funciones de Consulta de codigos
 ************************************************************/

function consultaMatricula() {
    if (!vacio($("#matricula"))) {
        var matricula = $("#matricula").val();
        console.log("Vamos a consultar la matricula " + matricula);
        $.getJSON(
                '../consultaMatricula.htm',
                {matricula: matricula},
        respuestaConsultaMatricula);
    }
}

function consultaModelo() {
    if (!vacio($("#codigoModelo"))) {
        var modelo = this.value;
        console.log("Modelo " + modelo);
        $.getJSON(
                '../consultaModelo.htm',
                {codigo: modelo},
        respuestaConsultaModelo);
    }
}

function consultaMotor() {
    if (!vacio($("#codigoMotor"))) {
        var motor = this.value;
        console.log("Motor " + motor);
        $.getJSON(
                '../consultaCodigoMotor.htm',
                {codigo: motor},
        respuestaConsultaMotor);
    }
}

function consultaCliente() {
    if (!vacio($("#codigoCliente"))) {
        var cliente = this.value;
        console.log("Cliente " + cliente);
        $.getJSON(
                '../consultaClientePorCodigo.htm',
                {codigo: cliente},
        respuestaConsultaCliente);
    }

}


/* Funciones operativas
 ************************************************************/

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
    $("#logoMarca").attr("src", "img/marcas/" + obj.modelo.fabricante.logo);
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
        console.log("Existen varios Modelos con el mismo codigo.Consultar con el administrador de la BBDD");
    } else if (listaObjetos.length < 1) {
        console.log("No existe ningún modelo con ese código");
        $("#descripcionModelo").val("");
        $("#logoMarca").attr("src", "");
        darAltaModelo();
    }
}

function rellenaModelo(modelo) {
    $("#descripcionModelo").val(modelo.descripcion);
    $("#codigoModelo").val(modelo.codigo);
    $("#logoMarca").attr("src", "img/marcas/" + modelo.fabricante.logo);
}

function respuestaConsultaMotor(listaObjetos) {
    if (listaObjetos.length == 1) {
        var objeto = listaObjetos[0];
        rellenaMotor(objeto);
    } else if (listaObjetos.length > 1) {
        console.log("Existen varios Motores con el mismo codigo");
        ventanaMotor.abrir(listaObjetos);
    } else if (listaObjetos.length < 1) {
        console.log("No existe ningun Motor con este codigo");
        $("#descripcionMotor").val("");
        darAltaMotor();
    }
}

function rellenaMotor(motor) {
    $("#descripcionMotor").val(motor.descripcion);
    $("#codigoMotor").val(motor.codigo);
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
    }
}

function rellenaCliente(cliente) {
    $("#codigoCliente").val(cliente.idEntidad);
    $("#nombreCliente").val(cliente.nombre);
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
    }
}

function buscarModelo() {

    var descripcionModelo = $("#descripcionModelo").val()
    if (descripcionModelo.length > 2) {
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
        rellenaModelo(motores[0]);
    } else {
        ventanaMotor.abrir(motores); //Abre la ventana Modal con la lista
    }
}

function darAltaModelo() {
    var respuesta = confirm("Desea dar de alta este Modelo?");
    if (respuesta == true) {
        console.log("Ha pulsado si");
        window.location = "../html/formularioModelo.html?codigo=" + $("#codigoModelo").val();
    } else {
        console.log("Ha pulsado no");
        $("#codigoModelo").val("");
        $("#codigoModelo").focus();
    }
}

function darAltaMotor() {
    var respuesta = confirm("Desea dar de alta este Motor?");
    if (respuesta == true) {
        console.log("Ha pulsado si");
        window.location = "../html/formularioMotor.html?codigo=" + $("#codigoMotor").val();
    } else {
        console.log("Ha pulsado no");
        $("#codigoMotor").val("");
        $("#codigoMotor").focus();
    }
}