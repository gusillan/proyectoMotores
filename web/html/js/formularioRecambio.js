/*  Listener
 *********************************************************/
$("document").ready(function() {

    $("#referencia").blur(consultaReferencia);


    $("#pvp, #descuento").change(function() {
        var value = this.value;
        value = value.replace(",", ".");
        var number = parseFloat(value);
        number = number.toFixed(2);
        this.value = number;
        calcularNeto();           
    });
    
    $("#stock").change(function() {
        var value = this.value;
        value = value.replace(",", ".");
        var number = parseFloat(value);
        number = number.toFixed(1);
        this.value = number;
    });

});

/* Funciones Básicas Botones
 **********************************************************/


function guardar() {

    if (validarFormulario()) {
        var data = $("#formRecambio").serialize();
        $.ajax({
            url: '../guardaRecambio.htm',
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


/* Funciones adicionales
 ********************************************************/

function consultaReferencia() {
    if (!vacio($("#referencia"))) {
        console.log("Vamos a consultar la Referencia " + this.value);
        var referencia = this.value;
        $.getJSON('../consultaReferencia.htm', {referencia: referencia}, respuestaConsultaReferencia);

    }
}

function respuestaConsultaReferencia(listaObjetos) {
    console.log(listaObjetos);
    if (listaObjetos.length == 1) {
        var objeto = listaObjetos[0];
        rellenaFormulario(objeto);
    } else if (listaObjetos.length > 1) {
        alert("Existen varias categorias con ese Codigo.Consultar al administrador de la BBDD");
    } else if (listaObjetos.length < 1) {
        console.log("No existe ningun fabricante con ese Codigo");
    }
}

function rellenaFormulario(obj) {
    $("#idRecambio").val(obj.idRecambio);
    $("#referencia").val(obj.referencia);
    $("#codigoMarca").val(obj.fabricante.codigo);
    $("#fabricante").val(obj.fabricante.nombre);
    $("#descripcion").val(obj.descripcion);
    $("#pvp").val(obj.pvp.toFixed(2));
    $("#descuento").val(obj.descuento.toFixed(2));
    calcularNeto();
    $("#stock").val(obj.stock.toFixed(1));
    $("#ubicacion").val(obj.ubicacion);
    $("#codigoCategoria").val(obj.categoria.codigo);
    $("#categoria").val(obj.categoria.categoria);
    $("#informacion").val(obj.informacion);
    $("#baja").attr("disabled", false);
    $("#descripcion").focus();

}

function calcularNeto() {
    var pvp = parseFloat($("#pvp").val());
    var descuento = parseFloat($("#descuento").val());
    neto = pvp * (100 - descuento) / 100;
    if (!isNaN(neto)) {
        $("#neto").val(neto.toFixed(2));
    }
}
