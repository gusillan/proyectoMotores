/*  Variables globales
 *********************************************************/
ventanaRecambiosA = new VentanaEmergente({
    modal: 'recambiosModal',
    titulo: 'Seleccionar recambio',
    campos: ['referencia', 'fabricante.nombre', 'descripcion'], //,'fabricante.nombre'],
    campoID: 'idRecambio',
    callback: rellenaRecambioA
});

ventanaRecambiosB = new VentanaEmergente({
    modal: 'recambiosModal',
    titulo: 'Seleccionar recambio',
    campos: ['referencia', 'fabricante.nombre', 'descripcion'], //,'fabricante.nombre'],
    campoID: 'idRecambio',
    callback: rellenaRecambioB
});


/*  Listener
 ***********************************************************/
$("document").ready(function() {

    $("#referenciaA").change(consultaReferenciaA);
    $("#referenciaB").change(consultaReferenciaB);

});

function consultaReferenciaA() {

    if (!vacio($("#referenciaA"))) {
        console.log("Vamos a consultar la Referencia " + this.value);
        var referencia = this.value;
        $.getJSON('../consultaReferencia.htm', {referencia: referencia}, respuestaConsultaReferenciaA);

    }
}

function respuestaConsultaReferenciaA(listaObjetos) {
    console.log(listaObjetos);
    if (listaObjetos.length === 1) {
        var objeto = listaObjetos[0];
        rellenaRecambioA(objeto);
    } else if (listaObjetos.length > 1) {
        console.log("Existen varias categorias con ese Codigo.Consultar al administrador de la BBDD");
        console.log("Esta es la lista " + listaObjetos);
        ventanaRecambiosA.abrir(listaObjetos);
    } else if (listaObjetos.length < 1) {
        console.log("No existe ningun fabricante con ese Codigo");
    }
}
function rellenaRecambioA(objeto) {
    $("#idRecambioA").val(objeto.idRecambio);
    $("#descripcionA").val(objeto.descripcion);
    $("#codigoMarcaA").val(objeto.fabricante.codigo);
    $("#marcaA").val(objeto.fabricante.nombre);
    $("#logoMarcaA").attr("src", "img/marcas/" + objeto.fabricante.logo);
    $("#sustitucion").focus();

}

function consultaReferenciaB() {

    if (!vacio($("#referenciaB"))) {
        console.log("Vamos a consultar la Referencia " + this.value);
        var referencia = this.value;
        $.getJSON('../consultaReferencia.htm', {referencia: referencia}, respuestaConsultaReferenciaB);

    }
}

function respuestaConsultaReferenciaB(listaObjetos) {
    console.log(listaObjetos);
    if (listaObjetos.length === 1) {
        var objeto = listaObjetos[0];
        rellenaRecambioB(objeto);
    } else if (listaObjetos.length > 1) {
        console.log("Existen varias categorias con ese Codigo.Consultar al administrador de la BBDD");
        console.log("Esta es la lista " + listaObjetos);
        ventanaRecambiosB.abrir(listaObjetos);
    } else if (listaObjetos.length < 1) {
        console.log("No existe ningun fabricante con ese Codigo");
    }
}
function rellenaRecambioB(objeto) {
    $("#idRecambioB").val(objeto.idRecambio)
    $("#descripcionB").val(objeto.descripcion);
    $("#codigoMarcaB").val(objeto.fabricante.codigo);
    $("#marcaB").val(objeto.fabricante.nombre);
    $("#logoMarcaB").attr("src", "img/marcas/" + objeto.fabricante.logo);  

}

/* Funciones Básicas Botones
 **********************************************************/


function guardar() {

    if (validarFormulario()) {
        var data = $("#formSustitucion").serialize();
        console.log("Serializacion formulario -> : "+data)      
        $.ajax({
            url: '../guardaSustitucion.htm',
            data: data,
            type: 'POST',
            success: limpiar
        });
    } else {
        console.log("Formulario no válido");
    }
}
