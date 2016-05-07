/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
// FUNCIONES ENTIDAD ********************************
var listaEntidad = new Array;

function formEntidadInicio() {
    document.getElementById("formEntidad").action = "";
    document.getElementById("dni").value = "";
    document.getElementById("dni").focus();
    document.getElementById("botonAlta").disabled = true;
    document.getElementById("botonBaja").disabled = true;
    document.getElementById("botonModificar").disabled = true;
    document.getElementById("ventanaEmergenteOpciones").options.length = 0;
    document.getElementById("ventanaEmergente").style.display = 'none';
}

function comprobarDni(){
     var dni = document.getElementById("dni").value.toUpperCase();
     if (dni !== "") {
        objetoAJAX.open("POST", "consultaDni.htm", true);
        objetoAJAX.onreadystatechange = respuestaConsulta;
        objetoAJAX.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        objetoAJAX.send("dni=" + dni);
    } else {
        alert("Tiene que introducir algún caracter");
        document.getElementById("dni").focus();
    }   
}

function comprobarNombre() {
    var nombre = document.getElementById("nombre").value.toUpperCase();
    if (nombre !== "") {
        objetoAJAX.open("POST", "consultaNombre.htm", true);
        objetoAJAX.onreadystatechange = respuestaConsulta;
        objetoAJAX.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        objetoAJAX.send("nombre=" + nombre);
    } else {
        alert("Tiene que introducir algún caracter");
        document.getElementById("nombre").focus();
    }
}

function respuestaConsulta() {
    if (objetoAJAX.readyState === 4) {
        var respuesta = objetoAJAX.responseText;
        listaEntidad = eval("(" + respuesta + ")");
        if (listaEntidad.length == 0) {
            resp = confirm("No existe la Entidad. Desea darla de alta?");
            if (resp === true) {
                entidadEntrada();
            } else {
                formEntidadInicio();
            }            
        }
        if (listaEntidad.length == 1) {
            var entidad = listaEntidad[0];
            rellenarFormulario(entidad);
        }
        if (listaEntidad.length > 1) {
            rellenarListado(listaEntidad);
        }
    }
}

function rellenarFormulario(entidad) {

    document.getElementById("idEntidad").value = entidad.idEntidad;
    document.getElementById("dni").value = entidad.dni;
    document.getElementById("nombre").value = entidad.nombre;
    document.getElementById("direccion").value = entidad.direccion;
    document.getElementById("codigoPostal").value = entidad.cPostal;
    document.getElementById("poblacion").value = entidad.poblacion;
    document.getElementById("movil").value = entidad.movil;
    document.getElementById("telefono").value = entidad.telefono;
    document.getElementById("email").value = entidad.email;

    document.getElementById("botonAlta").disabled = true;
    document.getElementById("botonBaja").disabled = false;
    document.getElementById("botonModificar").disabled = false;
}

function rellenarListado(listaEntidad) {

    document.getElementById("ventanaEmergente").style.display = 'block';
    var s = document.getElementById("ventanaEmergenteOpciones");
    for (p = 0; p < listaEntidad.length; p++) {
        var opt = document.createElement("option");
        opt.value = p;
        opt.text = listaEntidad[p].dni + " - " + listaEntidad[p].nombre;
        s.add(opt, p);
    }
    s.options[0].selected = "selected";
    document.getElementById("botonBaja").disabled = false;
    document.getElementById("botonModificar").disabled = false;
    document.getElementById("ventanaEmergenteOpciones").focus();

}

function seleccionOpcion() {
    var eleccion = document.getElementById("ventanaEmergenteOpciones").selectedIndex;
    entidad = listaEntidad[eleccion];
    rellenarFormulario(entidad);
    document.getElementById("ventanaEmergenteOpciones").options.length = 0;
    document.getElementById("ventanaEmergente").style.display = 'none';
}

function entidadEntrada() {
    document.getElementById("botonAlta").disabled = false;   
    document.getElementById("botonBaja").disabled = true;
    document.getElementById("botonModificar").disabled = true;
    document.getElementById("ventanaEmergenteOpciones").options.length = 0;
    document.getElementById("ventanaEmergente").style.display = 'none';    
    document.getElementById("nombre").focus();
}

function entidadAlta() {
    document.getElementById("formEntidad").action = "entidadAlta.htm";
    document.getElementById("formEntidad").submit();
    formEntidadInicio();
}

function entidadBaja() {
    resp = confirm("Seguro que desea dar de baja esta Entidad?");
    if (resp === true) {
        document.getElementById("formEntidad").action = "entidadBaja.htm";
        document.getElementById("formEntidad").submit();
    } else {
        formEntidadInicio();
    }
}

function entidadModificar() {
    resp = confirm("Seguro que desea modificar esta Entidad?");
    if (resp === true) {
        document.getElementById("formEntidad").action = "entidadModificar.htm";
        document.getElementById("formEntidad").submit();
    } else {
        formEntidadInicio();
    }
    
}