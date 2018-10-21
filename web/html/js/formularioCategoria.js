/*  Listener
 ******************************************************************************/
$("document").ready(function() {

    $("#codigoCategoria").change(consultaCategoria);

});

/* Funciones Menú Principal
 ******************************************************************************/

function guardar() {
    if (validarFormulario()) {
        envioFormulario('../guardaCategoria.htm');
    } else {
        console.log("ERROR - Formulario no válido");
    }
}

function baja() {
    envioFormulario('../bajaCategoria.htm');
}

/* Funciones adicionales
 ******************************************************************************/

function consultaCategoria() {
    if (!vacio($("#codigoCategoria"))) {
        var codigoCategoria = this.value;
        console.log("vamos a consultar el código " + codigoCategoria);
        promesa = peticionAjax('../consultaCategoria.htm', codigoCategoria);
        promesa.then(function(listaCategorias) {
            if (listaCategorias.length == 1) {
                rellenaFormularioCategoria(listaCategorias[0]);
            } else if (listaCategorias.length > 1) {
                alert("Existen varias categorias con ese Codigo.Consultar al administrador de la BBDD");
            } else if (listaCategorias.length < 1) {
                console.log("No existe ninguna categoria con ese Codigo");
                $("#idCategoria").val("");
                $("#categoria").val("");
            }
        });

    } else {
        borraFormularioCategoria();
    }
}

function rellenaFormularioCategoria(categoria) {
    $("#idCategoria").val(categoria.idCategoria);
    $("#codigoCategoria").val(categoria.codigoCategoria);
    $("#categoria").val(categoria.categoria);
    $("#baja").attr("disabled", false);
}

function borraFormularioCategoria(){
    var codigoCategoria = $("#codigoCategoria").val();
    $("#formulario")[0].reset();
    $("#codigoCategoria").val(codigoCategoria);
}

function comunicaError(error) {
    console.log("Error " + error);
    alert("Error en BBDD : " + error);
}
