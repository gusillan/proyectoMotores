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
function consultaCodigo() {
    if (!vacio($("#codigo"))) {
        var codigo = this.value;
        console.log("Vamos a consultar " + codigo);
        peticionAjax('../consultaManoObra.htm', codigo, respuestaConsultaCampo);
    } else {
        borrarFormulario();
    }

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

/*function consultarMOAsociada() {
    var categoriaAsociada = $("#listaCategorias").val();
    if (categoriaAsociada == 0) {
        $("#codigo").focus();
    } else {
        console.log("Vamos a consultar la MO asociada a " + categoriaAsociada);
        $.getJSON('../consultaManoObraAsociada.htm', {categoria: categoriaAsociada}, respuestaConsultaCategoriaAsociada);
    }
}

function respuestaConsultaCategoriaAsociada(listaObjetos) {
    console.log("llegaste AQUI");
    if (listaObjetos.length === 1) {
        var objeto = listaObjetos[0];
        console.log("llego 1 objeto " + objeto);
        rellenaFormulario(objeto);
    } else if (listaObjetos.length > 1) {
        console.log("Existen varios fabricantes con ese Codigo.Consultar al administrador de la BBDD");

    } else if (listaObjetos.length < 1) {
        console.log("No existe ningun fabricante con ese Codigo");
    }
}
*/
function rellenaFormulario(obj) {
    $("#idManoObra").val(obj.idManoObra);
    $("#codigo").val(obj.codigo);
    $("#descripcion").val(obj.descripcion);
    $("#infoDescripcion").val(obj.infoDescripcion);
    $("#tiempo").val(obj.tiempo);
    $('#listaCategorias option[value="' + obj.categoria.idCategoria + '"]').prop('selected', true);
}


