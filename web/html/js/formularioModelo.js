/*  Listener
 *********************************************************/
$("document").ready(function() {


    $("#fechaInicio").mask("99/9999"); // sin lineas("99/9999", {placeholder: " "})
    $("#fechaFin").mask("99/9999");

    $("#codigo").blur(consultaCodigo);
    $("#codigoMarca").blur(consultarMarca);


});

/* Funciones Básicas Botones
 **********************************************************/

function guardar() {

    if (validarFormulario()) {
        var data = $("#formModelo").serialize();
        console.log("Serializada " + data);
        $.ajax({
            url: '../guardaModelo.htm',
            data: data,
            type: 'POST',
            success: limpiar
        });
    } else {
        console.log("Formulario no valido");
    }
}

function baja() {
    // Confirmar Baja
    var data = $("#formModelo").serialize();
    $.ajax({
        url: '../bajaModelo.htm',
        data: data,
        type: 'POST',
        success: limpiar
    });
}

/* Funciones adicionales
 ********************************************************/

function consultaCodigo() {
    if ($("#codigo").val().length > 0) {
        console.log("vamos a consultar el código " + this.value);
        var codigo = this.value;
        $.getJSON('../consultaModelo.htm', {codigo: codigo}, respuestaConsultaModelo);

    }
}

function respuestaConsultaModelo(listaObjetos) {

    if (listaObjetos.length == 1) {
        var objeto = listaObjetos[0];
        rellenaFormulario(objeto);
    } else if (listaObjetos.length > 1) {
        console.log("Existen varios fabricantes con ese Codigo.Consultar al administrador de la BBDD");
        console.log("Esta es la lista " + listaObjetos);
        $('#myModal').modal('show');    //Abre la ventana Modal con la lista
        rellenaListaMotores(listaObjetos);
    } else if (listaObjetos.length < 1) {
        console.log("No existe ningun fabricante con ese Codigo");
    }
}
function rellenaFormulario(obj) {
    $("#idModelo").val(obj.idModelo);
    $("#codigo").val(obj.codigo);
    $("#descripcion").val(obj.descripcion);

    $("#baja").attr("disabled", false);

}
function consultarMarca() {
    var marca = $("#codigoMarca").val()
    console.log("Consultar marca " + marca);
    $.ajax({
        url: '../consultaFabricante.htm',
        data: {codigo: marca},
        type: 'POST',
        success: respuestaConsultaMarca
    });
}

function respuestaConsultaMarca(listaObjetos) {

    if (listaObjetos.length == 1) {
        var objeto = listaObjetos[0];
        rellenaMarca(objeto);
    } else if (listaObjetos.length > 1) {
        console.log("Existen varios fabricantes con ese Codigo.Consultar al administrador de la BBDD");
    } else if (listaObjetos.length < 1) {
        console.log("No existe ningun fabricante con ese Codigo");
    }
}

function rellenaMarca(marca) {
    $("#marcaMotor").val(marca.nombre);
    $("#logoMarca").attr("src", "img/marcas/" + marca.logo);
}