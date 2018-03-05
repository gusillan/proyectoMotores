/*  Listener
 *********************************************************/
$("document").ready(function() {

    listadoCategoriaRecambio();
    listadoCategoriaMO();
       

    //$("#fechaInicio").mask("99/9999"); // sin lineas("99/9999", {placeholder: " "})
    //$("#fechaFin").mask("99/9999");

    $("input[name='tipoMO']").change(tipoMO);   
    $("#listaCategorias").blur(codigoCategoria);
    $("#categoriaMO").blur(categoriaMO);
    $("#codigoMOLibre").blur(comprobarCodigoMOLibre);

});

var cMOCategoria="0";
var cMOPrincipal="0";
var cModelo="0";
var cMotor="0";

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

function listadoCategoriaRecambio() {
    
        $.getJSON('../listadoCategoriaRecambio.htm', respuestaConsultaCategoriaRecambio);    
}

function respuestaConsultaCategoriaRecambio(listaObjetos) {

    $.each(listaObjetos,function(key,registro){
        $("#listaCategorias").append('<option value='+registro.idCategoria+'>'+registro.categoria+'</option>');        
    });
}

function listadoCategoriaMO() {
    
        $.getJSON('../listadoCategoriaMO.htm', respuestaConsultaCategoriaMO);    
}

function respuestaConsultaCategoriaMO(listaObjetos) {

    $.each(listaObjetos,function(key,registro){
        $("#categoriaMO").append('<option value='+registro.codigo+'>'+registro.codigo+" - "+registro.categoria+'</option>'); 
        
    });
    $("#categoriaMO option[value='10']").attr("selected",true);
}



function tipoMO(){
    console.log("Evento localizado");
    if ($("#libre").is(':checked')){
        
        console.log("MANO DE OBRA LIBRE");        
        $("#ocultoMO").show();
        $("#ocultoCat").hide();
        
    }else{
        
        console.log("ASOCIADO A CATEGORIA");
        $("#ocultoCat").show();
        $("#ocultoMO").hide();
    }
}

function codigoCategoria(){
    var codigoPrincipal = $(this).val();
    cMOPrincipal = pad(codigoPrincipal,3);
    $("#codigoMOLibre").val(cMOPrincipal);
    console.log("cambio en select "+codigoPrincipal);
    mostrarCodigoMO(); 
    
}

function categoriaMO(){
    cMOCategoria = $(this).val();
    console.log("cambio en select "+cMOCategoria);
    mostrarCodigoMO();
   
}

function mostrarCodigoMO(){
     $("#codigoMO").val(cMOCategoria+"."+cMOPrincipal+"."+cModelo+"."+cMotor);
}

function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

function comprobarCodigoMOLibre(){
    
    rango = $("#categoriaMO").val()*10;
    cMOPrincipal = $(this).val();
    console.log("Comprobamos "+$(this).val())
    console.log ("Rango "+rango+" - "+rango+99);
    mostrarCodigoMO();
    
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



