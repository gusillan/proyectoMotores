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

/*  Listener
 ***********************************************************/
$("document").ready(function() {

    $("#matricula").change(consultaMatricula);
    $("#codigoModelo").change(consultaModelo);
    $("#codigoMotor").change(consultaMotor);
    $("#referencia").change(consultaReferencia);
    $("#agregar").click(agregarRecambio);

    $("#descripcionMotor").change(listarRecambios);
    $("#descripcionModelo").change(listarRecambios);


    consultaModelo();

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
    console.log("Agregar linea");
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
        success: agregar_lista
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


function agregar_lista(objeto) {

    console.log("Agregado " + objeto.referencia + " " + objeto.descripcion + " " + objeto.categoria.categoria);

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
    //var modelo =  $('#idModelo').val();     
    //console.log("idModelo " + $('#idModelo').val());
    //console.log("idMotor " + $('#idMotor').val());
    
    var data = $("#recambiosVehiculo").serialize();
    
    $.ajax({
     url: '../listarRecambio.htm',
     data: data,
     type: 'POST',
     success: mostrarLista
     });    
}

function mostrarLista(lista) {
    
    console.log("Longitud lista "+lista.length);
       
    $.each(lista,function (i){
        console.log(lista[i].recambio.idRecambio + " "+lista[i].recambio.referencia+" "+lista[i].recambio.descripcion);
    });
}