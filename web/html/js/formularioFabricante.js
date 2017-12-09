/*  Listener
 *********************************************************/
$("document").ready(function() {

    $("#codigo").blur(consultaCodigo);
    $("#logo").focus(rellenarLogo);

});

/* Funciones Básicas Botones
 **********************************************************/


function guardar() {

    if (validarFormulario()) {
        var data = $("#formFabricante").serialize();
        $.ajax({
            url: '../guardaFabricante.htm',
            data: data,
            type: 'POST',
            success: limpiar
        });
    } else {
        console.log("Formulario no válido");
    }
}

function baja() {
    // Confirmar Baja
    var data = $("#formFabricante").serialize();
    $.ajax({
        url: '../bajaFabricante.htm',
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
        $.getJSON('../consultaFabricante.htm', {codigo: codigo}, respuestaConsultaFabricante);

    }
}

function respuestaConsultaFabricante(listaObjetos) {
    console.log("Respuesta lista de Objetos "+listaObjetos);
    if (listaObjetos.length == 1) {
        var objeto = listaObjetos[0];
        rellenaFormulario(objeto);
    } else if (listaObjetos.length > 1) {
        alert("Existen varios fabricantes con ese Codigo.Consultar al administrador de la BBDD");
    } else if (listaObjetos.length < 1) {
        console.log("No existe ningun fabricante con ese Codigo");        
    }
}

function rellenaFormulario(obj){
    $("#idFabricante").val(obj.idFabricante);
    $("#codigo").val(obj.codigo);
    $("#nombre").val(obj.nombre);
    $("#logo").val(obj.logo);
    $('#imgLogo').attr("src", "img/marcas/" + obj.logo);
    $("#baja").attr("disabled",false);
}

function rellenarLogo(){
    console.log("Vamos a rellenarlo con ");//+$("#nombre").val()+".PNG");
}