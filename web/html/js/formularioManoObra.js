/*  Listener
 *********************************************************/
$("document").ready(function() {

    listadoCategoriaRecambio();

    //$("#listaCategorias").change(consultarMOAsociada);
    $("#codigoManoObra").change(consultaManoObra);
    $("#tiempoManoObra").change(formatearTiempo);

    $("#codigoManoObra").mask("99.99");


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
function consultaManoObra() {
    if (!vacio($("#codigoManoObra"))) {
        var codigoManoObra = this.value;
        promesa =  peticionAjax('../consultaManoObra.htm', codigoManoObra);
        promesa.then(function(listaManoObra){
            if (listaManoObra.length === 1){
                var manoObra = listaManoObra[0];
                rellenaFormularioManoObra(manoObra);
            }else if (listaManoObra.length > 1){
                console.log ("ERROR - No puede haber codigos de mano de obra repetidos")
            }else if (listaManoObra.length <1){
                console.log("No existe Mano Obra con ese codigo"); // Borrar
                borrarFormularioManoObra();
                desactivarBajaManoObra();
            }
        });
    } else {
        borrarFormularioManoObra();
    }
}

function rellenaFormularioManoObra (manoObra) {
    $("#idManoObra").val(manoObra.idManoObra);
    $("#codigoManoObra").val(manoObra.codigoManoObra);
    $("#descripcionManoObra").val(manoObra.descripcionManoObra);
    $("#infoManoObra").val(manoObra.infoManoObra);
    $("#tiempoManoObra").val(manoObra.tiempoManoObra);
    formatearTiempo();
    $('#listaCategorias option[value="' + manoObra.categoria.idCategoria + '"]').prop('selected', true);
    $("#baja").attr("disabled", false);
}

function borrarFormularioManoObra() {
    var codigoManoObra = $("#codigoManoObra").val();
    $("#formulario")[0].reset();
    $("#codigoManoObra").val(codigoManoObra);
}

function desactivarBajaManoObra(){
    $("#baja").attr("disabled",true);
}

function activarBajaManoObra(){
    $("#baja").attr("disabled",false);
}


function listadoCategoriaRecambio() {
    console.log("Listado categorias de recambio"); // borrar    
    $.getJSON('../listadoCategoriaRecambio.htm', respuestaConsultaCategoriaRecambio);
}

function respuestaConsultaCategoriaRecambio(listaObjetos) {
    //$("#listaCategorias").append('<option value=0>' + "--");
    $.each(listaObjetos, function(key, registro) {
        $("#listaCategorias").append('<option value=' + registro.idCategoria + '>' + '(' + registro.codigoCategoria + ') ' + registro.categoria + '</option>');
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
    var tiempoDecimal = parseFloat($("#tiempoManoObra").val());
    $("#tiempoManoObra").val(tiempoDecimal.toFixed(2));
}





