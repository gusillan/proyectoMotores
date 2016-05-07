
// Funciones ---- Vehiculo ----

var respuestaVehiculo;  // Variable global respuesta Json

function formVehiculoInicio() {
    document.getElementById("formVehiculo").action = "";
    document.getElementById("matricula").value = "";
    document.getElementById("matricula").focus();
    document.getElementById("botonAlta").disabled = true;
    document.getElementById("botonBaja").disabled = true;
    document.getElementById("botonModificar").disabled = true;
    document.getElementById("ventanaEmergenteOpciones").options.length = 0;
    document.getElementById("ventanaEmergente").style.display = 'none';
}

function comprobarMatricula() {
    var matricula = document.getElementById("matricula").value.toUpperCase();
    if (matricula !== "") {
        objetoAJAX.open("POST", "consultaMatricula.htm", true);
        objetoAJAX.onreadystatechange = vehiculoRespuestaJson;
        objetoAJAX.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        objetoAJAX.send("matricula=" + matricula);
    } else {
        alert("Tiene que introducir algún caracter");
        document.getElementById("matricula").focus();
    }
}

function vehiculoRespuestaJson() {
    if (objetoAJAX.readyState === 4) {
        respuestaVehiculo = eval("("+objetoAJAX.responseText+")");        
        if (respuestaVehiculo.length === 0) {
            resp = confirm("No existe el vahiculo. Desea darle de alta?");
            if (resp === true) {
                formVehiculoEntrada();
            } else {
                formVehiculoInicio();
            }
        }
        else if (respuestaVehiculo.length === 1) {
            formVehiculoRellenar(0);
        }
        else if (respuestaVehiculo.length > 1) {
            formVehiculoMenuEmergente();
        }
    }
}

function formVehiculoRellenar(numero) {
    document.getElementById("idVehiculo").value = respuestaVehiculo[numero].idVehiculo;
    document.getElementById("matricula").value = respuestaVehiculo[numero].matricula;
    document.getElementById("chasis").value = respuestaVehiculo[numero].chasis;
    document.getElementById("fechaMatricula").value = respuestaVehiculo[numero].fechaMatricula;
    document.getElementById("modelo").value = respuestaVehiculo[numero].idModelo;
    document.getElementById("motor").value = respuestaVehiculo[numero].idMotor;
    document.getElementById("propietario").value = respuestaVehiculo[numero].idEntidad;
    
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
