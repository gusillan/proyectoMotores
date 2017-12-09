


/*  Variables globales
 *********************************************************/
var listaMotoresJson = [];      //Json obtenido de los Motores





/*  Listener
 *********************************************************/
$("document").ready(function() {

    $("#codigo").blur(consultaCodigo);
    $("#codigoMarca").blur(consultarMarca);

    $('#kw').blur(function() {
        var kw = this.value;
        var cv = kw * 1.36;
        $('#cv').val(cv.toFixed(2));
    });



    //Modal************ 
    $("#cancelarModal").click(function() {
        $('#myModal').modal('hide');
        $("#tableItems tr").remove();
    });

    $('#myModal').on('shown.bs.modal', function() {
        $("#tableItems tr")[0].focus();
    });
    $('#myModal').on('hidden.bs.modal', function() {
        $('#descripcion').focus();
    });

    $("#seleccionarItem").click(function() {
        idMotor = $("#tableItems tr.o-selected").attr("data-idMotor");
        for (var i = 0; i < listaMotoresJson.length; i++) {
            if (listaMotoresJson[i].idMotor == idMotor) {
                rellenaFormulario(listaMotoresJson[i]);
                $('#myModal').modal('hide');
                $("#tableItems tr").remove();
            }
        }
    });
    //***********Modal


    $("#nuevoMotorBotonGroup").click(function(){      
        var codigo = $("#codigo").val();
        limpiar();
        $('#descripcion').focus();
        $("#codigo").val(codigo);
        $("#nuevoMotorBotonGroup").addClass("g-hide");
    });


});




/* Funciones Básicas Botones
 **********************************************************/

function guardar() {

    if (validarFormulario()) {
        var data = $("#formMotor").serialize();
        console.log("Serializada " + data);
        $.ajax({
            url: '../guardaMotor.htm',
            data: data,
            type: 'POST',
            success: limpiar
        });
    } else {
        console.log("Formulario no valido");
    }
}

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
        console.log("Esta es la lista " + listaObjetos);
        $('#myModal').modal('show');    //Abre la ventana Modal con la lista
        rellenaListaMotores(listaObjetos);
    } else if (listaObjetos.length < 1) {
        console.log("No existe ningun fabricante con ese Codigo");
    }
}

function rellenaFormulario(obj) {
    $("#idMotor").val(obj.idMotor);
    $("#codigo").val(obj.codigo);
    $("#descripcion").val(obj.descripcion);
    $('#combustible option[value="' + obj.combustible + '"]').prop('selected', true);
    $("#cilindrada").val(obj.cilindrada);
    $("#kw").val(obj.kw);
    var kw = $('#kw').val();
    var cv = kw * 1.36;
    $('#cv').val(cv.toFixed(2));
    $("#idMarca").val(obj.idMotor);
    $("#codigoMarca").val(obj.fabricante.codigo);
    $("#marcaMotor").val(obj.fabricante.nombre);

    //$("#logoMarca").attr("src", ""+obj.fabricante.logo);  //RESOLVER PORQUE EL SERVIDOR NO CARGA LAS IMAGENES DE LA CARPETA
    
    $("#nuevoMotorBotonGroup").removeClass("g-hide"); 
}

function consultarMarca() {
    var marca = $("#codigoMarca").val()
    console.log("Consultar marca " + marca);
    $.ajax({
        url: '../consultaFabricante.htm',
        data: {codigo: marca},
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

function rellenaMarca(marca) {
    $("#marcaMotor").val(marca.nombre);
    $("#imgLogo").attr("src", "..img/marcas/" + marca.logo);
}

/* Rellenar lista de motores 
 **********************************************************/
function rellenaListaMotores(listaMotores) {
    listaMotoresJson = listaMotores;
    
    var items = [];
    for (var i = 0; i < listaMotores.length; i++) {
        items.push('<tr data-idMotor="' + listaMotores[i].idMotor
                + '" tabindex="0"><td>' + listaMotores[i].codigo
                + '</td"><td>' + listaMotores[i].descripcion
                + '</td"><td>' + listaMotores[i].kw
                + '</td"><td>' + listaMotores[i].fabricante.nombre
                + '</td></tr>'
                );
    }
    $("#tableItems").append(items);
    $('#tableItems tr:odd').addClass("striped");

    //Una vez puesto los elementos en el html se pone el listener
    $("#tableItems tr").dblclick(function() {
        idMotor = $(this).attr("data-idMotor");
        for (var i = 0; i < listaMotores.length; i++) {
            if (listaMotores[i].idMotor == idMotor) {
                rellenaFormulario(listaMotores[i]);
                $('#myModal').modal('hide');
                $("#tableItems tr").remove();
            }
        }
    });
    $("#tableItems tr").click(function() {
        $("#tableItems tr").removeClass("o-selected");
        $(this).addClass("o-selected");
    });
    $("#tableItems tr").enterKey(function() {
        $("#tableItems tr").removeClass("o-selected");
        $(this).addClass("o-selected");
    });
}