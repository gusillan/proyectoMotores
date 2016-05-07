
// Funciones ---- Marca ----

var respuestaMarca;  // Variable global respuesta Json

function formMarcaInicio() {
    document.getElementById("formMarca").action = "";
    document.getElementById("nombre").value = "";
    document.getElementById("nombre").focus();
    document.getElementById("botonAlta").disabled = true;
    document.getElementById("botonBaja").disabled = true;
    document.getElementById("botonModificar").disabled = true;
    document.getElementById("ventanaEmergenteOpciones").options.length = 0;
    document.getElementById("ventanaEmergente").style.display = 'none';
}

function formMarcaComprobarMarca() {
    var descripcionMarca = document.getElementById("nombre").value.toUpperCase();
    if (descripcionMarca !== "") {
        objetoXML.open("POST", "consultaMarca.htm", true);
        objetoXML.onreadystatechange = formMarcaRespuestaJson;
        objetoXML.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        objetoXML.send("descripcionMarca=" + descripcionMarca);
    } else {
        alert("Tiene que introducir algún caracter");
        document.getElementById("nombre").focus();
    }
}

function formMarcaRespuestaJson() {
    if (objetoXML.readyState === 4) {
        respuestaMarca = eval("("+objetoXML.responseText+")");
        
        if (respuestaMarca.length === 0) {
            resp = confirm("No existe la marca. Desea darla de alta?");
            if (resp === true) {
                formMarcaEntrada();
            } else {
                formMarcaInicio();
            }
        }
        else if (respuestaMarca.length === 1) {
            formMarcaRellenar(0);
        }
        else if (respuestaMarca.length > 1) {
            formMarcaMenuEmergente();
        }
    }
}

function formMarcaRellenar(numero) {
    document.getElementById("idMarca").value = respuestaMarca[numero].idMarca;
    document.getElementById("nombre").value = respuestaMarca[numero].nombre;
    document.getElementById("logotipo").value = respuestaMarca[numero].logotipo;

    document.getElementById("botonAlta").disabled = true;
    document.getElementById("botonBaja").disabled = false;
    document.getElementById("botonModificar").disabled = false;
}
function formMarcaMenuEmergente() {    
    var s = document.getElementById("ventanaEmergenteOpciones");
    
    for (p = 0; p < respuestaMarca.length; p++) {
        var opt = document.createElement("option");
        opt.value = p;
        opt.text = respuestaMarca[p].nombre;
        s.add(opt, p);
    }
    s.options[0].selected = "selected";
    document.getElementById("botonBaja").disabled = false;
    document.getElementById("botonModificar").disabled = false;
    document.getElementById("ventanaEmergente").style.display = 'block';
    
}

function seleccionOpcion() {
    var eleccion = document.getElementById("ventanaEmergenteOpciones").selectedIndex;
    document.getElementById("ventanaEmergente").style.display = 'none';
    formMarcaRellenar(eleccion);
}

function formMarcaEntrada() {
    document.getElementById("botonAlta").disabled = false;
    document.getElementById("ventanaEmergenteOpciones").options.length = 0;
    document.getElementById("botonBaja").disabled = true;
    document.getElementById("botonModificar").disabled = true;
    document.getElementById("ventanaEmergente").style.display = 'none';
    document.getElementById("categoriaMarca").focus();
}

function formMarcaAlta() {
    document.getElementById("formMarca").action = "altaMarca.htm";
    document.getElementById("formMarca").submit();
    formMarcaInicio();
}

function formMarcaBaja() {
    respuesta = confirm("Seguro que desea dar de baja esta marca?");
    if (respuesta == true) {
        document.getElementById("formMarca").action = "bajaMarca.htm";
        document.getElementById("formMarca").submit();
    } else {
        formMarcaInicio();
    }
}

function formMarcaModificar() {
    document.getElementById("formMarca").action = "modificarMarca.htm";
    document.getElementById("formMarca").submit();
}
