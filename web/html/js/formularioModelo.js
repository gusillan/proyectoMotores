/*  Listener
 *********************************************************/
$("document").ready(function() {

    console.log("Codigo " + getQueryVariable("codigo"));
    if (getQueryVariable("codigo")) {
        $("#codigo").val(getQueryVariable("codigo"));
    }

    consultarMarca();
    muestraImagen();
    

    $("#fechaInicio").mask("99/9999"); // sin lineas("99/9999", {placeholder: " "})
    $("#fechaFin").mask("99/9999");

    $("#codigo").change(consultaCodigo);
    $("#codigoMarca").change(consultarMarca);


    $('#archivo').change(function() {

        var dataFile = new FormData();
        var files = document.getElementById("archivo").files;
        var file = files[0];
        console.log("FIles " + file.size);
        dataFile.append("file", file);

        $.ajax({
            url: '../guardaImagen.htm',
            type: 'POST',
            data: dataFile,
            processData: false,
            contentType: false,
        });

        var files = $('#archivo')[0].files;
        console.log("Funcion change " + files[0].value);
        $('#imagen').val(files[0].name);
        for (var i = 0; i < files.length; i++) {
            resizeAndUpload(files[i]);
        }
    });


});

/* Funciones Básicas Botones
 **********************************************************/

function guardar() {

    if (validarFormulario()) {
        var data = $("#formModelo").serialize();
        console.log("Serializada " + data);
        $.ajax({
            url: '../guardaModelo.htm',
            data: data,
            type: 'POST',
            success: limpiar
        });
    } else {
        console.log("Formulario no valido");
    }
}

function baja() {

    var data = $("#formModelo").serialize();
    $.ajax({
        url: '../bajaModelo.htm',
        data: data,
        type: 'POST',
        success: limpiar
    });
}

/* Funciones adicionales
 ********************************************************/

function consultaCodigo() {
    if (!vacio($("#codigo"))) {
        console.log("vamos a consultar el código " + this.value);
        console.log($("#codigo").val().length);
        var codigo = this.value;
        $.getJSON('../consultaModelo.htm', {codigo: codigo}, respuestaConsultaModelo);

    }
}

function respuestaConsultaModelo(listaObjetos) {

    if (listaObjetos.length === 1) {
        var objeto = listaObjetos[0];
        rellenaFormulario(objeto);
    } else if (listaObjetos.length > 1) {
        console.log("Existen varios fabricantes con ese Codigo.Consultar al administrador de la BBDD");
        console.log("Esta es la lista " + listaObjetos);
        $('#myModal').modal('show');    //Abre la ventana Modal con la lista
        rellenaListaMotores(listaObjetos);
    } else if (listaObjetos.length < 1) {
        console.log("No existe ningun fabricante con ese Codigo");
        $("#descripcion").val("");
        $("#idModelo").val("")


    }
}
function rellenaFormulario(obj) {
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

function muestraImagen() {
    if (!vacio($("#imagen"))) {
        $("#imagenModelo").attr("src", "img/imagenesVehiculos/" + $("#imagen").val());
    }
}

/* Subir imagen
 **********************************************************/
function resizeAndUpload(file) {

    console.log("Redimension de imagen");
    var reader = new FileReader();
    reader.onloadend = function() {

        var tempImg = new Image();
        tempImg.src = reader.result;
        tempImg.onload = function() {

            var MAX_WIDTH = 360;
            var MAX_HEIGHT = 186;
            var tempW = tempImg.width;
            var tempH = tempImg.height;
            if (tempW > tempH) {
                if (tempW > MAX_WIDTH) {
                    tempH *= MAX_WIDTH / tempW;
                    tempW = MAX_WIDTH;
                }
            } else {
                if (tempH > MAX_HEIGHT) {
                    tempW *= MAX_HEIGHT / tempH;
                    tempH = MAX_HEIGHT;
                }
            }

            var canvas = document.createElement('canvas');
            canvas.width = tempW;
            canvas.height = tempH;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(this, 0, 0, tempW, tempH);
            var dataURL = canvas.toDataURL("image/png");

            $("#imagenModelo").attr("src", dataURL);
            //$("#imagen").val(dataURL);

            //Post dataurl to the server with AJAX
        };

    };
    reader.readAsDataURL(file);
}
