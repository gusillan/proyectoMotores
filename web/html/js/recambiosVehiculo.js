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

ventanaRecambios = new VentanaEmergente({
    modal: 'motoresModal',
    titulo: 'Seleccionar recambio',
    campos: ['referencia', 'fabricante', 'descripcion'], //,'fabricante.nombre'],
    campoID: 'idRecambio',
    filtros: [],
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
    $("#descripcionMotor").val(motor.descripcion);
    $("#codigoMotor").val(motor.codigo);
}

function agregarRecambio(){
    console.log("Agregar linea");
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

function rellenaRecambio(objeto){
    $("#descripcionRecambio").val(objeto.descripcion);
}