/*  Listener
 *********************************************************/
$("document").ready(function() {

    //consultaCategoriaRecambio();
       

    //$("#fechaInicio").mask("99/9999"); // sin lineas("99/9999", {placeholder: " "})
    //$("#fechaFin").mask("99/9999");

    $("input[name='tipoMO']").change(tipoMO);   


});


/* Funciones Básicas Botones
 **********************************************************/

function guardar() {

    if (validarFormulario()) {
        var data = $("#formManoObra").serialize();
        console.log("Serializada " + data);
        $.ajax({
            url: '../guardaManoObra.htm',
            data: data,
            type: 'POST',
            success: limpiar
        });
    } else {
        console.log("Formulario no valido");
    }
}

function baja() {

    var data = $("#formManoObra").serialize();
    $.ajax({
        url: '../bajaManoObra.htm',
        data: data,
        type: 'POST',
        success: limpiar
    });
}

/* Funciones adicionales
 ********************************************************/

function consultaCategoriaRecambio() {
    
        $.getJSON('../consultaTodasCategorias.htm', respuestaConsultaCategoria);

    
}

function respuestaConsultaCategoria(listaObjetos) {

    if (listaObjetos.length === 1) {
        var objeto = listaObjetos[0];
        rellenaFormulario(objeto);
    } else if (listaObjetos.length > 1) {
        console.log("Existen varios fabricantes con ese Codigo.Consultar al administrador de la BBDD");
        console.log("Esta es la lista " + listaObjetos);
        $('#myModal').modal('show');    //Abre la ventana Modal con la lista
        rellenaListaMotores(listaObjetos);
    } else if (listaObjetos.length < 1) {
        console.log("Error al consultar categorias.Consulte al administrador de BBDD");
        
    }
}

function tipoMO(){
    console.log("Evento localizado");
    if ($("#libre").is(':checked')){
        
        console.log("MANO DE OBRA LIBRE");        
        $("#codigoMOLibre").show();
        $("#codigoMOCategoria").hide();
        
    }else{
        
        console.log("ASOCIADO A CATEGORIA");
        $("#codigoMOCategoria").show();
        $("#codigoMOLibre").hide();
    }
}
/*function rellenaFormulario(obj) {
    $("#idModelo").val(obj.idModelo);
    $("#codigo").val(obj.codigo);
    $("#descripcion").val(obj.descripcion);
    $("#codigoMarca").val(obj.fabricante.codigo);
    rellenaMarca(obj.fabricante);
    //$("#marca").val(obj.fabricante.nombre);
    $("#fechaInicio").val(obj.fechaInicio);
    $("#fechaFin").val(obj.fechaFin);
    $("#imagen").val(obj.imagen);
    muestraImagen();
    //$("#imagenModelo").attr("src", "img/imagenesVehiculos/" + obj.imagen);
    $("#baja").attr("disabled", false);
    updateFocusables();

}

function consultarMarca() {
    var marca = $("#codigoMarca").val();
    console.log("Consultar marca " + marca);
    $.ajax({
        url: '../consultaFabricante.htm',
        data: {codigo: marca},
        type: 'POST',
        success: respuestaConsultaMarca
    });
}

function respuestaConsultaMarca(listaObjetos) {

    if (listaObjetos.length === 1) {
        var objeto = listaObjetos[0];
        rellenaMarca(objeto);
    } else if (listaObjetos.length > 1) {
        console.log("Existen varios fabricantes con ese Codigo.Consultar al administrador de la BBDD");
    } else if (listaObjetos.length < 1) {
        console.log("No existe ningun fabricante con ese Codigo");
        $("#fabricante").val('');
        $("#codigoMarca").val('');
    }
}

function rellenaMarca(marca) {
    $("#marca").val(marca.nombre);
    $("#logoMarca").attr("src", "img/marcas/" + marca.logo);
}


function muestraImagen() {
    if (!vacio($("#imagen"))) {
        $("#imagenModelo").attr("src", "img/imagenesVehiculos/" + $("#imagen").val());
    }
}
*/



