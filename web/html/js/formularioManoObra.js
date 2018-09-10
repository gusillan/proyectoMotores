/*  Listener
 *********************************************************/
$("document").ready(function() {

    listadoCategoriaRecambio();
    listadoCategoriaMO();
       
    
     
    $("#listaCategorias").blur(consultarMOAsociada);    
    $("#codigo").change(mostrarCodigoMO);
    $("#tiempo").blur(formatearTiempo);
    $("#codigoModelo").change(consultaModelo);
    $("#codigoMotor").change(consultaMotor);
    
    $("#codigo").mask("99.99");
    

});

var cMOCategoria="0";
var cMOPrincipal="0";


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
    $("#listaCategorias").append('<option value=0>'+"--");
    $.each(listaObjetos,function(key,registro){
        $("#listaCategorias").append('<option value='+registro.idCategoria+'>'+'('+registro.codigo+') '+registro.categoria+'</option>');        
    });
    $("#listaCategorias option[value='0']").attr("selected",true);
}

function listadoCategoriaMO() {
    
        $.getJSON('../listadoCategoriaMO.htm', respuestaConsultaCategoriaMO);    
}

function respuestaConsultaCategoriaMO(listaObjetos) {
    $("#categoriaMO").append('<option value=0>'+"--");
    $.each(listaObjetos,function(key,registro){
        
        $("#categoriaMO").append('<option value='+registro.codigo+'>'+registro.codigo+" - "+registro.categoria+'</option>'); 
        
    });
    $("#categoriaMO option[value='0']").attr("selected",true);
}



/*function tipoMO(){
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
*/
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
     $("#codigoMO").val($("#codigo").val()+"."+$("#idModelo").val()+"."+$("#idMotor").val());
}

function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

/*function comprobarCodigoMOLibre(){
    
    rango = parseInt($("#categoriaMO").val()*10);
    cMOPrincipal = parseInt($(this).val());
    console.log("Comprobamos "+$(this).val())
    var rangoInf = rango;
    var rangoSup = rango+99;
    console.log ("Rango "+rangoInf+" - "+rangoSup);
    if (cMOPrincipal>=rangoInf && cMOPrincipal<=rangoSup){
        console.log("Damos del alta");
        mostrarCodigoMO();
    }else{
        console.log("Rango NO valido");
        alert ("El codigo debe ser un numero de 3 cifras entre "+rangoInf+" y "+rangoSup);
        $("#codigoMOLibre").focus();
    }
   
    
}*/

function formatearTiempo(){
    var tiempoDecimal = parseFloat($("#tiempo").val());
    $("#tiempo").val(tiempoDecimal.toFixed(2));
}

function consultarMOAsociada(){
    var categoriaAsociada = $("#listaCategorias").val();
    if (categoriaAsociada ==0){
        $("#codigo").focus();
    }else{        
        console.log("Vamos a consultar la MO asociada a " + categoriaAsociada);
        $.getJSON('../consultaManoObraAsociada.htm', {categoria: categoriaAsociada}, respuestaConsultaCategoriaAsociada);
       
    }
    
}
function respuestaConsultaCategoriaAsociada(listaObjetos){
    console.log("llegaste AQUI");
    if (listaObjetos.length === 1) {
        var objeto = listaObjetos[0];
        console.log("llego 1 objeto "+objeto);
        rellenaFormulario(objeto);
    } else if (listaObjetos.length > 1) {
        console.log("Existen varios fabricantes con ese Codigo.Consultar al administrador de la BBDD");
        
    } else if (listaObjetos.length < 1) {
        console.log("No existe ningun fabricante con ese Codigo");
    }
        
}
function rellenaFormulario(obj) {
    $("#idManoObra").val(obj.idManoObra);
    $("#codigoMO").val(obj.codigo);
    $("#descripcion").val(obj.descripcion);
    $("#codigo").val(obj.codigo);
    $("#descripcionMO").val(obj.descripcion);
    $("#tiempo").val(obj.tiempo);
    /*rellenaMarca(obj.fabricante);
    //$("#marca").val(obj.fabricante.nombre);
    $("#fechaInicio").val(obj.fechaInicio);
    $("#fechaFin").val(obj.fechaFin);
    $("#imagen").val(obj.imagen);
    muestraImagen();
    //$("#imagenModelo").attr("src", "img/imagenesVehiculos/" + obj.imagen);
    $("#baja").attr("disabled", false);
    updateFocusables();*/

}
/*
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



