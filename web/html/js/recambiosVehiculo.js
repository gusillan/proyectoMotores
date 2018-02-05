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

ventanaRecambios = new VentanaEmergente({
    modal: 'recambiosModal',
    titulo: 'Seleccionar recambio',
    campos: ['referencia', 'fabricante.nombre', 'descripcion'],
    campoID: 'idRecambio',
    callback: rellenaRecambio
});

ventanaMatricula = new VentanaEmergente({
    modal: 'entidadModal',
    titulo: 'Busqueda de matrícula',
    campos: ['matricula', 'modelo.descripcion', 'motor.descripcion'],
    campoID: 'idVehiculo'
});

/*  Listener
 ***********************************************************/
$("document").ready(function() {

    $("#matricula").change(consultaMatricula);
    $("#codigoModelo").change(consultaModelo);
    $("#codigoMotor").change(consultaMotor);
    $("#referencia").change(consultaReferencia);
    $("#agregar").click(agregarRecambio);
    $("#limpiarLinea").click(limpiarLinea);

    $("#descripcionMotor").change(listarRecambios);
    $("#descripcionModelo").change(listarRecambios);


    //consultaModelo();

});

function rellenaFormulario(obj) {
    $("#idVehiculo").val(obj.idVehiculo);
    $("#matricula").val(obj.matricula);
    $("#chasis").val(obj.chasis);

    rellenaModelo(obj.modelo);
    rellenaMotor(obj.motor);
}

function rellenaMotor(motor) {
    $("#codigoMotor").val(motor.codigo);
    $("#idMotor").val(motor.idMotor);
    $("#descripcionMotor").val(motor.descripcion).change();
}

function rellenaRecambio(objeto) {
    $("#descripcionRecambio").val(objeto.descripcion);
    $("#idRecambio").val(objeto.idRecambio)

}

function modeloMotor() {
    if (!vacio($("#descripcionModelo")) & !vacio($("#descripcionMotor"))) {
        return true;
    } else {
        return false;
    }
}

function agregarRecambio() {
    if (modeloMotor() & !vacio($("#descripcionRecambio"))) {
        console.log("agregamos recambio " + $("#referencia").val());
        agregarReferencia();
    } else {
        console.log("No es posible agregar este recambio");
    }
}

function agregarReferencia() {

    var data = $("#recambiosVehiculo").serialize();
    $.ajax({
        url: '../agregarRecambio.htm',
        data: data,
        type: 'POST',
        success: mostrarLista
    });

}

function respuestaConsultaReferencia(listaObjetos) {
    console.log(listaObjetos);
    if (listaObjetos.length === 1) {
        var objeto = listaObjetos[0];
        rellenaRecambio(objeto);
    } else if (listaObjetos.length > 1) {
        console.log("Existen varias categorias con ese Codigo.Consultar al administrador de la BBDD");
        console.log("Esta es la lista " + listaObjetos);
        ventanaRecambios.abrir(listaObjetos);
    } else if (listaObjetos.length < 1) {
        console.log("No existe ningun fabricante con ese Codigo");
    }
}



function listarRecambios() {
    if (modeloMotor()) {
        console.log("Procedemos al listado")
        listado();
    } else {
        console.log("Falla alguno de los DOS campos clave");
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

function mostrarLista(lista) {
    limpiarLinea();
    console.log(lista);
    console.log("Longitud lista " + lista.length);

    var tablaRecambios = '';
    if (lista.length > 0) {
        $.each(lista, function(i) {
            tablaRecambios += '<tr>';
            tablaRecambios += '<td>'+lista[i].recambio.categoria.codigo+'</td>';
            tablaRecambios += '<td>'+lista[i].recambio.descripcion+'</td>';
            tablaRecambios += '<td>'+lista[i].recambio.referencia+'</td>';
            tablaRecambios += '<td><button type="button" data-idModeloRecambio="'+lista[i].idModeloRecambio +'" class="btn btn-danger btn-xs g-botonEliminarAsignacion" >'
            tablaRecambios += '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></td>';
            tablaRecambios += '</tr>'
        });
    }
    $("#g-tablaRecambioVehiculo tbody").html(tablaRecambios);


    //Se añade los listener cuando ya esta listado los recambios, si no existen los elementos html no funciona
    $(".g-botonEliminarAsignacion").click( function(){
        var idModeloRecambio = $(this).data("idmodelorecambio");
        console.log("Eliminar asignacion de recambio "+idModeloRecambio);

        //Hacer la peticion de eliminado aqui utilizando idModeloRecambio
        //Despues de hacer la peticion se deberia mostrar lista de nuevo
    });
}


function limpiarLinea() {
    $("#descripcionRecambio").val("");
    $("#referencia").val("").focus();
}