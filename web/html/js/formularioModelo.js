/*  Listener
 *********************************************************/
$("document").ready(function() {
    
    console.log("Codigo "+ getQueryVariable("codigo"));
    if (getQueryVariable("codigo")){
        $("#codigo").val(getQueryVariable("codigo"));
    }
    
    $("#fechaInicio").mask("99/9999"); // sin lineas("99/9999", {placeholder: " "})
    $("#fechaFin").mask("99/9999");

    $("#codigo").blur(consultaCodigo);
    $("#codigoFabricante").blur(consultarMarca);


    $('#archivo').change(function() {
        
        //var formulario = document.getElementById("formModelo");
        //var data = $("#formModelo").serialize();
        var dataFile = new FormData($("#formModelo"));
        var files = document.getElementById("archivo").files;
        var file = files[0];
        console.log("FIles " + file.size);
        dataFile.append("file", file);
        dataFile.append("prueba", "Gus");
        
        console.log("DataFIle  "+dataFile.length);


        //console.log("Serializada " + dataFile);
        //console.log($("#codigo").val());
        //console.log($("#descripcion").val());
        //console.log($("#archivo").val());

   

        $.ajax({
            url: '../guardaImagen.htm',
            type : 'POST',
            data: dataFile,
            processData : false,
            contentType: false,
            cache : false,
            success: limpiar
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
    // Confirmar Baja
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
    $("#codigoFabricante").val(obj.fabricante.codigo);
    $("#marcaModelo").val(obj.fabricante.nombre);
    $("#fechaInicio").val(obj.fechaInicio);
    $("#fechaFin").val(obj.fechaFin);
    $("#imagen").val(obj.imagen);
    $("#imagenModelo").attr("src", "img/imagenesVehiculos/" + obj.imagen);
    $("#baja").attr("disabled", false);
    updateFocusables();

}
function consultarMarca() {
    var marca = $("#codigoFabricante").val();
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
        $("#codigoFabricante").val('');
    }
}

function rellenaMarca(marca) {
    $("#marcaModelo").val(marca.nombre);
    $("#logoMarca").attr("src", "img/marcas/" + marca.logo);
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
