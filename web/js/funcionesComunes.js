
// Variables globales *******

var dniFormateado;
var expresion_regular_letras = /^[a-zA-Z]+$/;

//***************************

function minmax(min, max, dato) {
    if (dato.length > max) {
        console.log("excedido limite máximo");
        return false;
    } else if (dato.length < min) {
        console.log("inferior al mínimo");
        return false;
    }
    return true;
}

function numero(dato) {
    if (/^([0-9])*$/.test(dato)) { // usada hasta ahora /^([0-9])*$/   /^-?[0-9]+([,\.][0-9]*)?$/
        return true;
    } else {
        return false;
    }
}
function numeroDecimal(dato) {
    if (/^[0-9]+([,\.][0-9]*)?$/.test(dato)) {
        return true;
    } else {
        return false;
    }
}
function vacio(dato) {
    if (dato.length < 1) {
        return true;
    } else {
        return false;
    }
}

function dni(dato) {
    var letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];

    if (!(/^\d{8}[A-Z]$/.test(dato))) {
        return false;
    }

    if (dato.charAt(8) !== letras[(dato.substring(0, 8)) % 23]) {
        return false;
    }
}

function validateDNI(dni) {
    var numero, let, letra;
    var expresion_regular_dni = /^[XYZ]?\d{5,8}[A-Z]$/;

    dni = dni.toUpperCase();

    if (expresion_regular_dni.test(dni) === true) {
        numero = dni.substr(0, dni.length - 1);
        numero = numero.replace('X', 0);
        numero = numero.replace('Y', 1);
        numero = numero.replace('Z', 2);
        let = dni.substr(dni.length - 1, 1);
        numero = numero % 23;
        letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
        letra = letra.substring(numero, numero + 1);
        if (letra != let) {
            //alert('Dni erroneo, la letra del NIF no se corresponde');
            return false;
        } else {
            //alert('Dni correcto');
            return true;
        }
    } else {
        //alert('Dni erroneo, formato no válido');
        return false;
    }
}
function formatearDni(dni) {
    dni = dni.toUpperCase();
    if (dni.length > 9) {
        alert("El DNI/CIF no puede tener mas de 9 cifras");
        return false;
    } else {
        var primera = dni.substring(0, 1);
        if (expresion_regular_letras.test(primera)) {
            console.log("LETRA " + primera);
            if (primera == 'X' || primera == 'Y' || primera == 'Z') {
                console.log("EXTRANJERO"); //****** DNI EXTRANJERO

            } else {
                console.log("EMPRESA");   //******* CIF EMPRESA
                if (dni.length == 9) {
                    console.log("CORRECTO");
                } else {
                    console.log("INCORRECTO");
                    alert("El CIF debe tener 9 cifras");
                    return false;
                }
            }
        } else {
            console.log("NUMERO " + primera); //***** DNI NORMALIZADO
            dni = comprobarDNI(dni);
            if (dni = "ERROR1") {
                alert("LETRA DNI ERRONEA");
            } else {
                return dni;
            }
        }
        console.log("primera " + dni.substring(0, 1));
        console.log("última " + dni.substring(dni.length - 1, dni.length));
    }

}
function comprobarCIF(cif) {

}

function validarDNI(){
    return true;
}
   
function comprobarDNI(dni) {
    var ultima = dni.substring(dni.length - 1, dni.length);
    var digitos = dni.length;
    
    if (expresion_regular_letras.test(ultima)) {
        console.log("tiene letra al final . Añadir 0 si es necesario y comprobarla");
        dniSinLetra = dni.substring(0, dni.length - 1);
        console.log("DNI sin Letra " + dniSinLetra);
        console.log("comparativa " + ultima + " - " + dniLetra(dniSinLetra));
        if (ultima == dniLetra(dniSinLetra)) {
            console.log("Letra DNI correcta");
            dni = pad(dni, 9);
            return dni;
        } else {
            alert("Letra DNI ERRONEA");
            return "ERROR1"; // LETRA DNI ERRONEA

        }
    } else {
        console.log("No tiene letra.Añadir 0 y calcularla");
        dni = dni + dniLetra(dni);
        dni = pad(dni, 9);
        console.log("DNI DEFINITIVO " + dni);
        return dni;
    }
    if (digitos < 9) {
        dni = pad(dni, 9);
        console.log(dni);
    } else {

    }

}
function dniLetra(dni) {
    cadena = "TRWAGMYFPDXBNJZSQVHLCKET";
    posicion = dni % 23;
    letra = cadena.substring(posicion, posicion + 1);
    return letra;

}
function comprobarEXT(dni) {

}
function mes(mes) {
    if (mes < 1 || mes > 12) {
        return true;
    } else {
        return false;
    }
}
function year(year) {
    if (year < 1950 || year > 2025) {
        return true;
    } else {
        return false;
    }
}
function confirmarAlta() {
    if (validacion()) {
        var resp = confirm('Confirma el ALTA?');
        if (resp == true) {
            return true;
        } else {
            return false;
        }
    } else {
        console.log("ERROR DE VALIDACION");
    }
}
function confirmarBaja() {
    if (validacion()) {
        var resp = confirm('Confirma la BAJA?');
        if (resp == true) {
            baja();
        } else {
            return false;
        }
    } else {
        console.log("ERROR DE VALIDACION");
    }
}
function confirmarModificacion() {
    if (validacion()) {
        var resp = confirm('Confirma la MODIFICACION?');
        if (resp == true) {
            modificar();
        } else {
            return false;
        }
    } else {
        console.log("ERROR DE VALIDACION");
    }
}

function procesaRespuesta(listaObjetos) {
    if (listaObjetos.length == 1) {
        var objeto = listaObjetos[0];
        rellenaForm(objeto);
    } else if (listaObjetos.length > 1) {
        ventanaOpciones(listaObjetos);
    } else if (listaObjetos.length < 1) {
        $('#baja').attr('disabled', true);
        $('#modificar').attr('disabled', true);
    }
}

function irMarca() {
    location.href = "formularioFabricante.htm";
}

// Funcion que rellena 0 por la izquierda
function pad(str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}