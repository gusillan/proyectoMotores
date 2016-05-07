

// Funciones ---Modelo---

var respuesta; // Variable global respuesta en JSON

function formModeloInicio() {
    document.getElementById("formModelo").action = "";
    document.getElementById("codigo").value = "";
    document.getElementById("codigo").focus();
    document.getElementById("botonAlta").disabled = true;
    document.getElementById("botonBaja").disabled = true;
    document.getElementById("botonModificar").disabled = true;   
    document.getElementById("ventanaEmergenteOpciones").options.length = 0;
    document.getElementById("ventanaEmergente").style.display = 'none';
}

function formModeloComprobarCodigo() {
    var codigo = document.getElementById("codigo").value.toUpperCase();
    if (codigo !== "") {
        objetoXML.open("POST", "consultaCodigoModelo.htm", true);
        objetoXML.onreadystatechange = formModeloRespuestaJson;
        objetoXML.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        objetoXML.send("codigo=" + codigo);
    } else {
        alert("Tiene que introducir algún caracter");
        document.getElementById("codigo").focus();
    }
}

function formModeloRespuestaJson() {
    if (objetoXML.readyState === 4) {
        respuesta = eval("("+objetoXML.responseText+")"); 
        if (respuesta.length === 0) {
            resp = confirm("No existe el codigo. Desea darlo de alta?");
            if (resp === true) {
                formModeloEntrada();
            } else {
                formModeloInicio();
            }
        }
        else if (respuesta.length === 1) {
            formModeloRellenar(0);
        }
        else if (respuesta.length > 1) {
            formModeloMenuEmergente();
        }
    }
    
}

function formModeloRellenar(numero) {    
    document.getElementById("idmodelo").value = respuesta[numero].idModelo;
    document.getElementById("codigo").value = respuesta[numero].codigo;
    document.getElementById("marca").value = respuesta[numero].marca;   
    document.getElementById("descripcion").value = respuesta[numero].descripcion;    
    document.getElementById("mesInicio").value = respuesta[numero].mesInicio;
    document.getElementById("yearInicio").value = respuesta[numero].yearInicio;
    document.getElementById("mesFin").value = respuesta[numero].mesFin;
    document.getElementById("yearFin").value = respuesta[numero].yearFin;
    document.getElementById("imagen").value = respuesta[numero].imagen;    

    document.getElementById("botonAlta").disabled = true;
    document.getElementById("botonBaja").disabled = false;
    document.getElementById("botonModificar").disabled = false;   
}

function formModeloMenuEmergente() {
    var s = document.getElementById("ventanaEmergenteOpciones");
    for (p = 0; p < respuesta.length; p++) {
        var opt = document.createElement("option");
        opt.value = p;
        opt.text = respuesta[p].codigo+ " - " + respuesta[p].descripcion;
        s.add(opt, p);
    }
    s.options[0].selected = "selected";   
    document.getElementById("botonBaja").disabled = false;
    document.getElementById("botonModificar").disabled = false;
    document.getElementById("ventanaEmergente").style.display = 'block';
}

function formModeloMenuEmergenteEleccion() {
    var eleccion = document.getElementById("ventanaEmergenteOpciones").selectedIndex;
    formModeloRellenar(eleccion);
    document.getElementById("ventanaEmergente").style.display = 'none';
}

function formModeloEntrada() {
    document.getElementById("botonAlta").disabled = false;
    document.getElementById("ventanaEmergenteOpciones").options.length = 0;
    document.getElementById("botonBaja").disabled = true;
    document.getElementById("botonModificar").disabled = true;
    document.getElementById("ventanaEmergente").style.display = 'none';
    document.getElementById("marca").focus();
}

function formModeloAlta() {
    document.getElementById("formModelo").action = "altaModelo.htm";
    document.getElementById("formModelo").submit();
    formModeloInicio();
}

function formModeloBaja() {
    respuesta = confirm("Seguro que desea dar de baja este modelo?");
    if (respuesta === true) {
        document.getElementById("formModelo").action = "bajaModelo.htm";
        document.getElementById("formModelo").submit();
    } else {
        formModeloInicio();
    }
}

function formModeloModificar() {
    document.getElementById("formModelo").action = "modificarModelo.htm";
    document.getElementById("formModelo").submit();
}
