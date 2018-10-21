/*  Listener
 ******************************************************************************/
$("document").ready(function() {

    console.log("Codigo " + getQueryVariable("codigo"));
    if (getQueryVariable("codigo")) {
        $("#codigo").val(getQueryVariable("codigo"));
    }

    $("#inicioModelo").mask("99/9999"); // sin lineas("99/9999", {placeholder: " "})
    $("#finModelo").mask("99/9999");

    $("#codigoModelo").change(consultaModelo);
    $("#codigoFabricante").change(consultaFabricanteMin);
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

function consultaModelo() {
    if (!vacio($("#codigoModelo"))) {
        var modelo = this.value;
        console.log("Consultamos " + modelo); // Borrar
        promesa = peticionAjax('../consultaModelo.htm', modelo);
        promesa.then(function(listaModelos) {
            if (listaModelos.length == 1) {
                var modelo = listaModelos[0];
                rellenaFormularioModelo(modelo);
            } else if (listaModelos.length > 1) {
                console.log("Existen varios Modelos con el mismo codigo.Consultar con el administrador de la BBDD");
            } else if (listaModelos.length < 1) {
                console.log("No existe ningún modelo con ese código"); //Borrar
                borraFormularioModelo();
                //darAltaModelo();
            }
        });
    } else {
        borraFormularioModelo();
    }
}

function rellenaFormularioModelo(modelo) {
    $("#idModelo").val(modelo.idModelo);
    $("#codigoModelo").val(modelo.codigoModelo);
    $("#descripcionModelo").val(modelo.descripcionModelo);
    $("#codigoFabricante").val(modelo.fabricante.codigoFabricante);
    rellenaFabricanteCampos(modelo.fabricante);
    $("#inicioModelo").val(modelo.inicioModelo);
    $("#finModelo").val(modelo.finModelo);
    $("#imagen").val(modelo.imagenModelo);
    muestraImagen();
    $("#baja").attr("disabled", false);
    updateFocusables();

}

function borraFormularioModelo() {
    var codigoModelo = $("#codigoModelo").val();
    $("#formulario")[0].reset();
    $("#codigoModelo").val(codigoModelo);
    $("#imagen").attr("src", "");
    $("#logoFabricante").attr("src", "");
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

    var files = $('#archivo')[0].files; //archivo
    console.log("Funcion change " + files[0].value);
    var nombreFichero = $('#archivo')[0].files[0].name //archivo
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
