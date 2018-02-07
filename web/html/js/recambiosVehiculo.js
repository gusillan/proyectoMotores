/*  Globarles
 ***********************************************************/


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
    $("#codigoModelo").change(function(){
        modeloValido = false;
        compruebaAgregarReferencia();
        $("#g-tablaRecambioVehiculo tbody tr").remove();
        consultaModelo();
    });
    $("#codigoMotor").change(function(){
        motorValido = false;
        compruebaAgregarReferencia();
        $("#g-tablaRecambioVehiculo tbody tr").remove();
        consultaMotor();
    });
    $("#referencia").change(function(){
        referenciaValido = false;
        compruebaAgregarReferencia();
        consultaReferencia();
    });
    $("#agregar").click(agregarReferencia);
    $("#limpiarLinea").click(limpiarLinea);

    //$("#agregar").prop("disabled",true);

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
    motorValido = true;
    compruebaAgregarReferencia();
    listarRecambios();
}

function rellenaRecambio(objeto) {
    $("#descripcionRecambio").val(objeto.descripcion);
    $("#idRecambio").val(objeto.idRecambio);
    referenciaValido = true;
    compruebaAgregarReferencia();
}


function compruebaAgregarReferencia() {
    if (motorValido & modeloValido & referenciaValido) {
        $("#agregar").prop("disabled",false);
        return true;
    } else {
        $("#agregar").prop("disabled",true);
        return false;
    }
}

function agregarReferencia() {
    if ( compruebaAgregarReferencia() ){
        var data = $("#recambiosVehiculo").serialize();
        console.log("Agregar. Serializado " + data);
        $.ajax({
            url: '../agregarRecambio.htm',
            data: data,
            type: 'POST',
            success: mostrarLista
        });        
    }
}


function respuestaConsultaReferencia(listaObjetos) {
//    console.log(listaObjetos);
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

function ordenarPorCategoria(a,b){
    return(a.recambio.categoria.codigo > b.recambio.categoria.codigo ? 1 : -1)
}


function mostrarLista(listaDesordenada) {
    
    var lista = listaDesordenada.sort(ordenarPorCategoria);
    
    var tablaRecambios = '';
    if (lista.length > 0) {
        $.each(lista, function(i) {
            tablaRecambios += '<tr>';
            tablaRecambios += '<td>' + lista[i].recambio.categoria.codigo + '</td>';
            tablaRecambios += '<td>' + lista[i].recambio.descripcion + '</td>';
            tablaRecambios += '<td>' + lista[i].recambio.referencia + '</td>';
            tablaRecambios += '<td><button type="button" data-idModeloRecambio="' + lista[i].idModeloRecambio + '" class="btn btn-danger btn-xs g-botonEliminarAsignacion" >'
            tablaRecambios += '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></td>';
            tablaRecambios += '</tr>'
        });
    }
    $("#g-tablaRecambioVehiculo tbody").html(tablaRecambios);


    //Se añade los listener cuando ya esta listado los recambios, si no existen los elementos html no funciona
    $(".g-botonEliminarAsignacion").click(function() {
        var idModeloRecambio = $(this).data("idmodelorecambio");
        console.log("Eliminar asignacion de recambio " + idModeloRecambio);
        
        var data = "idModelo="+$('#idModelo').val()+"&idMotor="+$('#idMotor').val()+"&idRecambio="+idModeloRecambio;
        console.log("DATA : " + data);
        $.ajax({
            url: '../quitarRecambio.htm',
            data: data,
            type: 'POST',
            success: mostrarLista
        });

    });
}


function limpiarLinea() {
    $("#referencia").val("").change().focus();
    $("#descripcionRecambio").val("");
}