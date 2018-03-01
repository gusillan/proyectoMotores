/*  Listener
 *********************************************************/
$("document").ready(function() {

    $("#codigo").blur(consultaCodigo);

});

/* Funciones Básicas Botones
 **********************************************************/


function guardar() {

    if (validarFormulario()) {
        var data = $("#formCategoria").serialize();
        $.ajax({
            url: '../guardaCategoria.htm',
            data: data,
            type: 'POST',
            success: limpiar
        });
    } else {
        console.log("Formulario no válido");
    }
}

function baja() {

    var data = $("#formCategoria").serialize();
    $.ajax({
        url: '../bajaCategoria.htm',
        data: data,
        type: 'POST',
        success: limpiar,
        error : comunicaError
       
    });
}


/* Funciones adicionales
 ********************************************************/

function consultaCodigo() {
    if ($("#codigo").val().length > 0) {
        console.log("vamos a consultar el código " + this.value);
        var codigo = this.value;
        $.getJSON('../consultaCategoria.htm', {codigo: codigo}, respuestaConsultaCategoria);

    }
}

function respuestaConsultaCategoria(listaObjetos) {
    console.log("Respuesta lista de Objetos " + listaObjetos);
    if (listaObjetos.length == 1) {
        var objeto = listaObjetos[0];
        rellenaFormulario(objeto);
    } else if (listaObjetos.length > 1) {
        alert("Existen varias categorias con ese Codigo.Consultar al administrador de la BBDD");
    } else if (listaObjetos.length < 1) {
        console.log("No existe ningun fabricante con ese Codigo");
        $("#idCategoria").val("");
        $("#categoria").val("");

    }
}

function rellenaFormulario(obj) {
    $("#idCategoria").val(obj.idCategoria);
    $("#codigo").val(obj.codigo);
    $("#categoria").val(obj.categoria);
    $("#tipo").val(obj.tipo);
    $("#baja").attr("disabled",false);
}

function comunicaError(error){
    console.log("Error "+error);
    alert ("Error en BBDD : "+error);
}
