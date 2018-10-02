/*  Listener
 ******************************************************************************/
$("document").ready(function() {

    console.log("Codigo " + getQueryVariable("codigo"));
    if (getQueryVariable("codigo")) {
        $("#codigo").val(getQueryVariable("codigo"));        
    }

    $("#fechaInicio").mask("99/9999"); // sin lineas("99/9999", {placeholder: " "})
    $("#fechaFin").mask("99/9999");

    $("#codigo").change(consultaCodigo);
    $("#codigoMarca").change(consultarMarca);
    $('#archivo').change(subirImagen);           

});

/* Funciones Menú Principal
 ******************************************************************************/

function guardar() {

    if (validarFormulario()) {
        envioFormulario('../guardaModelo.htm');
    } else {
        console.log("ERROR - Formulario no válido");
    }
}

function baja() {
    envioFormulario('../bajaModelo.htm');
}

/* Funciones adicionales
 ******************************************************************************/

function consultaCodigo() {
    if (!vacio($("#codigo"))) {
        var codigo = this.value;
        peticionAjax('../consultaModelo.htm', codigo, respuestaConsultaCampo);
    } else {
        borraFormulario();
    }
}

function respuestaCeroObjetos() {
    borraFormulario();
}

function respuestaVariosObjetos(listaObjetos) {
   
    $('#myModal').modal('show');    //Abre la ventana Modal con la lista
    rellenaListaMotores(listaObjetos);
}

function borraFormulario() {
    var codigo = $("#codigo").val();
    $("#formulario")[0].reset();
    $("#codigo").val(codigo);
    $("#imagenModelo").attr("src", ""); 
    $("#logoMarca").attr("src", "");
}

function rellenaFormulario(obj) {
    $("#idModelo").val(obj.idModelo);
    $("#codigo").val(obj.codigo);
    $("#descripcion").val(obj.descripcion);
    $("#codigoMarca").val(obj.fabricante.codigo);
    rellenaMarca(obj.fabricante);
    $("#fechaInicio").val(obj.fechaInicio);
    $("#fechaFin").val(obj.fechaFin);
    $("#imagen").val(obj.imagen);
    muestraImagen();
    $("#baja").attr("disabled", false);
    updateFocusables();

}

function muestraImagen() {
    if (!vacio($("#imagen"))) {
        $("#imagenModelo").attr("src", "img/imagenesVehiculos/" + $("#imagen").val());
    }
}

/* Subir imagen
 ******************************************************************************/
function subirImagen() {

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
    var nombreFichero = $('#archivo')[0].files[0].name
    for (var i = 0; i < files.length; i++) {
        resizeAndUpload(files[i]);
    }

}

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
