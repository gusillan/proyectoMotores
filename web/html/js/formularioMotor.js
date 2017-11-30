/*  Listener
 *********************************************************/
$("document").ready(function() {

    $("#codigo").blur(consultaCodigo);
    $("#idMarca").blur(consultarMarca);
    
    $('#kw').blur(function() {
        var kw = this.value;
        var cv = kw * 1.36;
        $('#cv').val(cv.toFixed(2));
    });

});

/* Funciones Básicas Botones
 **********************************************************/

/* Funciones adicionales
 ********************************************************/

function consultaCodigo() {
    if ($("#codigo").val().length > 0) {
        console.log("vamos a consultar el código " + this.value);
        var codigo = this.value;
        $.getJSON('../consultaCodigoMotor.htm', {codigo: codigo}, respuestaConsultaMotores);

    }
}

function respuestaConsultaMotores(listaObjetos) {
    
    if (listaObjetos.length == 1) {
        var objeto = listaObjetos[0];
        rellenaFormulario(objeto);
    } else if (listaObjetos.length > 1) {
        console.log("Existen varios fabricantes con ese Codigo.Consultar al administrador de la BBDD");
    } else if (listaObjetos.length < 1) {
        console.log("No existe ningun fabricante con ese Codigo");        
    }
}

function rellenaFormulario(obj){
    $("#idMotor").val(obj.idMotor);
    $("#codigo").val(obj.codigo);
    $("#descripcion").val(obj.descripcion);
    $('#combustible option[value="' + obj.combustible + '"]').prop('selected', true);
    $("#cilindrada").val(obj.cilindrada);
    $("#kw").val(obj.kw);
    var kw = $('#kw').val();
    var cv = kw * 1.36;    
    $('#cv').val(cv.toFixed(2));
    $("#idMarca").val(obj.fabricante.codigo);
    $("#marcaMotor").val(obj.fabricante.nombre);
}

function consultarMarca(){
    var marca = $("#idMarca").val()
    console.log("Consultar marca "+marca);
    $.ajax({
        url: '../consultaFabricante.htm',
        data: {codigo : marca},
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

function rellenaMarca(marca){
    $("#marcaMotor").val(marca.nombre);
}