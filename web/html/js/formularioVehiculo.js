
/*  Listener 
 *****************************************************************************/

$("document").ready(function() {
    
    $("#fechaMatricula").mask("99/99/9999"); // sin lineas("99/9999", {placeholder: " "})

    $("#matricula").change(consultaMatriculaVehiculo);
    $("#codigoModelo").change(consultaModeloMin);
    $("#codigoMotor").change(consultaMotorMin);
    $("#codigoCliente").change(consultaEntidadCampos);
    //Botones de busqueda ***************************
    $("#buscarEntidad").click(consultaEntidadMin);
    $("#buscarModelo").click(buscarModeloDescripcion);
    $("#buscarMotor").click(buscarMotorDescripcion);

    //Ventana lateral *******************************
    $(".g-button-aside-close").click(function() {
        $(".g-aside").hide();
        $(".g-button-aside-open").show();
    });
    $(".g-button-aside-open").click(function() {
        $(".g-aside").show();
        $(".g-button-aside-open").hide();
    });
});

/* Funciones Menú Principal
 ******************************************************************************/

function guardar() {
    if (validarFormulario()) {
        envioFormulario('../guardaVehiculo.htm');
    } else {
        console.log("ERROR - Formulario no válido");
    }
}

function baja() {
    envioFormulario('../bajaVehiculo.htm');
}

/* Funciones Principales
 ******************************************************************************/


function consultaMatriculaVehiculo() {
    if ($("#matricula").val().length > 3) {
        var matricula = this.value;
        promesa = peticionAjax('../consultaMatricula.htm', matricula);
        promesa.then(function(listaVehiculos) {
            if (listaVehiculos.length === 1) {
                var vehiculo = listaVehiculos[0];
                rellenaFormularioVehiculo(vehiculo);
            } else if (listaVehiculos.length > 1) {
                ventanaMatricula.abrir(listaVehiculos)
            } else if (listaVehiculos.length < 1) {
                borraFormularioVehiculo();
                desactivarBajaVehiculo();
            }
        });
    } else {
        borraFormularioVehiculo();
    }
}

function rellenaFormularioVehiculo(vehiculo) {
    $("#idVehiculo").val(vehiculo.idVehiculo);
    $("#matricula").val(vehiculo.matricula);
    $("#chasis").val(vehiculo.chasis);
    $("#fechaMatricula").val(vehiculo.fechaMatricula);
    $("#informacion").val(vehiculo.infoVehiculo);
    $("#baja").attr("disabled", false);

    rellenaModeloCampos(vehiculo.modelo);
    rellenaMotorCampos(vehiculo.motor);
    rellenaEntidadCampos(vehiculo.entidad);

    $(".g-aside").show();
    $(".g-button-aside-open").hide();
}

function borraFormularioCliente() {
    var matricula = $("#matricula").val();
    $("#formulario")[0].reset();
    $("#matricula").val(matricula);
}

// 4 Ventanas Modales *********************************************************

var ventanaEntidad = new VentanaEmergente({
    modal: 'entidadModal',
    titulo: 'Búsqueda por nombre',
    campos: ['nombreEntidad', 'poblacionEntidad'],
    campoID: 'idEntidad',
    callback: rellenaEntidadCampos
});

var ventanaModelo = new VentanaEmergente({
    modal: 'modeloModal',
    titulo: 'Búsqueda por modelo',
    campos: ['codigoModelo', 'descripcionModelo'],
    campoID: 'idModelo',
    callback: rellenaModeloCampos
});

var ventanaMotor = new VentanaEmergente({
    modal: 'motorModal',
    titulo: 'Búsqueda por motor',
    campos: ['codigoMotor', 'descripcionMotor'],
    campoID: 'idMotor',
    callback: rellenaMotorCampos
});

var ventanaMatricula = new VentanaEmergente({
    modal: 'matriculaModal',
    titulo: 'Busqueda de matrícula',
    campos: ['matricula', 'modelo.descripcionModelo', 'motor.descripcionMotor'],
    campoID: 'idVehiculo',
    callback: rellenaFormularioVehiculo
});

/*  Busquedas
 *********************************************************/

function buscarEntidad() {
    if ($("#nombreEntidad").val().length > 2) {
        var nombreEntidad = $("#nombreEntidad").val();
        promesa = peticionAjax('../consultaEntidadPorNombre.htm', nombreEntidad);
        promesa.then(function(listaEntidades) {
            if (listaEntidades.length == 0) {
                console.log("Error: la consulta entidad no ha obtenido ningun resultado");                             
            } else if (listaEntidades.length == 1) {
                rellenaEntidadCampos(listaEntidades[0]);
            } else {
                ventanaEntidad.abrir(listaEntidades); //Abre la ventana Modal con la lista
            }
        });
    } else {
        console.log("Campo nombre debe tener 3 o mas caracteres");
    }
}

function buscarModeloDescripcion() {
    if ($("#descripcionModelo").val().length > 2) {
        var descripcionModelo = $("#descripcionModelo").val();
        console.log("Campo modelo RELLENO " + descripcionModelo + " " + descripcionModelo.length);
        promesa = peticionAjax('../consultaModeloPorDescripcion.htm', descripcionModelo);
        promesa.then(function(listaModelos) {
            if (listaModelos.length == 0) {
                console.log("Error: la consulta del modelo no ha obtenido ningun resultado");
                $("#descripcionModelo").val("");
                $("#logoMarca").remove();
            } else if (listaModelos.length == 1) {
                rellenaModeloCampos(listaModelos[0]);
            } else {
                ventanaModelo.abrir(listaModelos); //Abre la ventana Modal con la lista
            }
        });
    } else {
        console.log("Campo nombre debe tener 3 o mas caracteres");
    }
}

function buscarMotorDescripcion() {
    if ($("#descripcionMotor").val().length > 2) {
        var descripcionMotor = $("#descripcionMotor").val();
        console.log("Campo motor RELLENO " + descripcionMotor + " " + descripcionMotor.length);
        promesa = peticionAjax('../consultaMotorPorDescripcion.htm', descripcionMotor);
        promesa.then(function(listaMotores) {
            if (listaMotores.length == 0) {
                console.log("Error: la consulta del motor no ha obtenido ningun resultado");
                $("#descripcionMotor").val("");
            } else if (listaMotores.length == 1) {
                rellenaModeloCampos(listaMotores[0]);
            } else {
                ventanaMotor.abrir(listaMotores); //Abre la ventana Modal con la lista
            }
        });
    } else {
        console.log("Campo nombre debe tener 3 o mas caracteres");
    }
}


