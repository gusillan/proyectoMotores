/*  Listener
 *********************************************************/
$("document").ready(function() {

    listadoCategoriaRecambio();

    //$("#listaCategorias").change(consultarMOAsociada);
    $("#codigo").blur(consultaCodigo);
    $("#tiempo").change(formatearTiempo);

    $("#codigo").mask("99.99");


});

var cMOCategoria = "0";
var cMOPrincipal = "0";


/* Funciones Básicas Botones
 **********************************************************/

function guardar() {

    if (validarFormulario()) {
        envioFormulario('../guardaManoObra.htm');
    } else {
        console.log("ERROR - Formulario no Válido");
    }
}

function baja() {
    envioFormulario('../bajaManoObra.htm');
}

/* Funciones adicionales
 ********************************************************/
function consultaCodigo() {
    if (!vacio($("#codigo"))) {
        var codigo = this.value;
        console.log("Vamos a consultar " + codigo); // Borrar
        peticionAjax('../consultaManoObra.htm', codigo, respuestaConsultaCampo);
    } else {
        borrarFormulario();
    }
}

function borrarFormulario() {
    var codigo = $("#codigo").val();
    $("#formulario")[0].reset();
    $("#codigo").val(codigo);
}

function respuestaCeroObjetos(){
    console.log("Zero Obj");
    borrarFormulario();
}

function respuestaVariosObjetos(){
    console.log("ERROR - No puede haber codigo repetidos en esta BBDD.Consultar al administrador");
}

function listadoCategoriaRecambio() {
    console.log("Listado categorias de recambio"); // borrar    
    $.getJSON('../listadoCategoriaRecambio.htm', respuestaConsultaCategoriaRecambio);
}

function respuestaConsultaCategoriaRecambio(listaObjetos) {
    //$("#listaCategorias").append('<option value=0>' + "--");
    $.each(listaObjetos, function(key, registro) {
        $("#listaCategorias").append('<option value=' + registro.idCategoria + '>' + '(' + registro.codigo + ') ' + registro.categoria + '</option>');
    });
    $("#listaCategorias option[value='35']").attr("selected", true); // Es el codigo de Varios
}

function codigoCategoria() {
    var codigoPrincipal = $(this).val();
    cMOPrincipal = pad(codigoPrincipal, 3);
    $("#codigoMOLibre").val(cMOPrincipal);
    console.log("cambio en select " + codigoPrincipal);
    mostrarCodigoMO();

}

function pad(str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}

function formatearTiempo() {
    var tiempoDecimal = parseFloat($("#tiempo").val());
    $("#tiempo").val(tiempoDecimal.toFixed(2));
}


function rellenaFormulario(obj) {
    $("#idManoObra").val(obj.idManoObra);
    $("#codigo").val(obj.codigo);
    $("#descripcion").val(obj.descripcion);
    $("#infoDescripcion").val(obj.infoDescripcion);
    $("#tiempo").val(obj.tiempo);
    formatearTiempo();
    $('#listaCategorias option[value="' + obj.categoria.idCategoria + '"]').prop('selected', true);
    $("#baja").attr("disabled", false);
}


