/*  Listener
 *********************************************************/
$("document").ready(function() {

/*    $("#codigo").blur(consultaCodigo);
*/

    $("#pvp, #descuento").change(function(){
        var value = this.value;
        value = value.replace(",", ".");
        var number = parseFloat(value);
        number = number.toFixed(2);
        this.value = number;

        var pvp = parseFloat( $("#pvp").val() );
        var descuento = parseFloat( $("#descuento").val() );
        neto = pvp * (100-descuento)/100;
        if (! isNaN(neto) ){
            $("#neto").val( neto.toFixed(2) ); 
        }
    });
    $("#stock").change(function(){
        var value = this.value;
        value = value.replace(",", ".");
        var number = parseFloat(value);
        number = number.toFixed(1);
        this.value = number;
    });



});

/* Funciones Básicas Botones
 **********************************************************/


/*function guardar() {

    if (validarFormulario()) {
        var data = $("#formCategoriaRecambio").serialize();
        $.ajax({
            url: '../guardaCategoriaRecambio.htm',
            data: data,
            type: 'POST',
            success: limpiar
        });
    } else {
        console.log("Formulario no válido");
    }
}

function baja() {

    var data = $("#formCategoriaRecambio").serialize();
    $.ajax({
        url: '../bajaCategoriaRecambio.htm',
        data: data,
        type: 'POST',
        success: limpiar
    });
}
*/

/* Funciones adicionales
 ********************************************************/
/*
function consultaCodigo() {
    if ($("#codigo").val().length > 0) {
        console.log("vamos a consultar el código " + this.value);
        var codigo = this.value;
        $.getJSON('../consultaCategoriaRecambio.htm', {codigo: codigo}, respuestaConsultaCategoria);

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
    $("#baja").attr("disabled",false);
}
*/
