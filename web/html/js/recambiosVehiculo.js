

/*  Variables globales
 *********************************************************/
var ventanaModelo = new VentanaEmergente({
    modal: 'modeloModal',
    titulo: 'Búsqueda por modelo',
    campos: ['codigo', 'descripcion'],
    campoID: 'idModelo',
    callback: rellenaModelo
});

var ventanaMotor = new VentanaEmergente({
    modal: 'motorModal',
    titulo: 'Búsqueda por motor',
    campos: ['codigo', 'descripcion'],
    campoID: 'idMotor',
    callback: rellenaMotor
});

var ventanaRecambios = new VentanaEmergente({
    modal: 'recambiosModal',
    titulo: 'Seleccionar recambio',
    campos: ['referencia', 'fabricante.nombre', 'descripcion'],
    campoID: 'idRecambio',
    callback: rellenaRecambio
});

var ventanaMatricula = new VentanaEmergente({
    modal: 'entidadModal',
    titulo: 'Busqueda de matrícula',
    campos: ['matricula', 'modelo.descripcion', 'motor.descripcion'],
    campoID: 'idVehiculo'
});


var modeloValido = false;
var motorValido = false;
var referenciaValido = false;


/*  Listener
 ***********************************************************/
$("document").ready(function() {

    $("#matricula").change(consultaMatricula);
    $("#codigoModelo").change(function() {
        modeloValido = false;
        compruebaAgregarReferencia();
        $("#g-tablaRecambioVehiculo.g-hideByDefault").hide();
        $("#g-tablaRecambioVehiculo tbody tr").remove();
        consultaModelo();
    });
    $("#codigoMotor").change(function() {
        motorValido = false;
        compruebaAgregarReferencia();
        $("#g-tablaRecambioVehiculo.g-hideByDefault").hide();
        $("#g-tablaRecambioVehiculo tbody tr").remove();
        consultaMotor();
    });
    $("#referencia").change(function() {
        referenciaValido = false;
        compruebaAgregarReferencia();
        consultaReferencia();
    });
    $("#agregar").click(agregarReferencia);


    //Botones de busqueda
    $("#buscarModelo").click(buscarModelo);
    $("#buscarMotor").click(buscarMotor);
    $("#buscarRecambio").click(buscarRecambio);



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

function rellenaFormulario(obj) {
    $("#idVehiculo").val(obj.idVehiculo);
    $("#matricula").val(obj.matricula);
    $("#chasis").val(obj.chasis);

    rellenaModelo(obj.modelo);
    rellenaMotor(obj.motor);
}


function rellenaModelo(modelo) {
    $("#idModelo").val(modelo.idModelo);
    $("#descripcionModelo").val(modelo.descripcion);
    $("#codigoModelo").val(modelo.codigo);
    $("#logoMarca").attr("src", "img/marcas/" + modelo.fabricante.logo);
    $("#silueta").attr("src", "img/imagenesVehiculos/" + modelo.imagen);
    /*$("#nombreFabricanteModelo").text(modelo.fabricante.nombre);*/
    modeloValido = true;
    compruebaAgregarReferencia();
    listarRecambios();
}

function rellenaMotor(motor) {
    $("#idMotor").val(motor.idMotor);
    $("#codigoMotor").val(motor.codigo);
    $("#descripcionMotor").val(motor.descripcion);
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

    motorValido = true;
    compruebaAgregarReferencia();
    listarRecambios();
}

function rellenaRecambio(objeto) {
    $("#idRecambio").val(objeto.idRecambio);
    $("#referencia").val(objeto.referencia);
    $("#descripcionRecambio").val(objeto.descripcion);
    $("#infoSustituciones").prop("title", "No tiene sustituciones");
    $("#infoSustituciones").show();
    referenciaValido = true;
    compruebaAgregarReferencia();
}


function compruebaAgregarReferencia() {
    if (motorValido & modeloValido & referenciaValido) {
        $("#agregar").prop("disabled", false);
        return true;
    } else {
        $("#agregar").prop("disabled", true);
        return false;
    }
}

function referenciaUnica() {

    if (referenciaValido) {
        var referencia = $("#referencia").val();
        var repeticiones = $("#g-tablaRecambioVehiculo tr td:contains('" + referencia + "')").length;
        if (repeticiones > 0) {
            console.log("Referencia repetida");
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

function agregarReferencia() {
    if (compruebaAgregarReferencia() && referenciaUnica()) {
        var data = $("#recambiosVehiculo").serialize();
        console.log("Agregar. Serializado " + data);
        $.ajax({
            url: '../agregarRecambio.htm',
            data: data,
            type: 'POST',
            success: mostrarLista
        });
        limpiarLinea();
    }
}




function listarRecambios() {
    if (motorValido & modeloValido) {
        console.log("Procedemos al listado")
        listado();
    } else {
        console.log("Falla alguno de los DOS campos clave");
        $("#g-tablaRecambioVehiculo tbody tr").remove();
    }
}




function listado() {
    var data = $("#recambiosVehiculo").serialize();

    $.ajax({
        url: '../listarRecambio.htm',
        data: data,
        type: 'POST',
        success: mostrarLista
    });
}

function ordenarPorCategoria(a, b) {
    return(a.recambio.categoria.codigo > b.recambio.categoria.codigo ? 1 : -1)
}

function mostrarLista(listaDesordenada) {
    console.log("listaDesordenada:");
    console.log(listaDesordenada);

    $("#g-tablaRecambioVehiculo").show();

    if (listaDesordenada.length > 0) {
        var lista = listaDesordenada.sort(ordenarPorCategoria);

        var tablaRecambios = '';
        $.each(lista, function(i) {
            tablaRecambios += '<tr>';
            tablaRecambios += '<td>' + lista[i].recambio.categoria.codigo + '</td>';
            tablaRecambios += '<td>' + lista[i].recambio.fabricante.codigo + '</td>';
            tablaRecambios += '<td>' + lista[i].recambio.descripcion + '</td>';
            tablaRecambios += '<td>' + lista[i].recambio.referencia + '</td>';
            //Si quieres añadir ya el valor, se pone value='+ .....value +'....
            tablaRecambios += '<td><input type="text" class="form-control g-input g-tiempoRecambio" size="8" id="tiempoRecambio'+i+'" title="Tiempo asociado a mano de obra en centesimal"></td>';
            tablaRecambios += '<td><button type="button" data-idModeloRecambio="' + lista[i].idModeloRecambio + '" class="btn btn-danger btn-xs g-botonEliminarAsignacion" >'
            tablaRecambios += '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></td>';
            tablaRecambios += '</tr>'
        });
        $("#g-tablaRecambioVehiculo tbody").html(tablaRecambios);


        //Se añade los listener cuando ya esta listado los recambios, si no existen los elementos html no funciona
        $(".g-botonEliminarAsignacion").click(function() {
            var idModeloRecambio = $(this).data("idmodelorecambio");
            console.log("Eliminar asignacion de recambio " + idModeloRecambio);

            var data = "idModelo=" + $('#idModelo').val() + "&idMotor=" + $('#idMotor').val() + "&idRecambio=" + idModeloRecambio;
            console.log("DATA : " + data);
            $.ajax({
                url: '../quitarRecambio.htm',
                data: data,
                type: 'POST',
                success: mostrarLista
            });

        });
    } else {
        console.log("borra");
        $("#g-tablaRecambioVehiculo tbody tr").remove();
    }
}


function limpiarLinea() {
    $("#referencia").val("").change().focus();
    $("#descripcionRecambio").val("");
}




/*  Busquedas
 *********************************************************/

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


