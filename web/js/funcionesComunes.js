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
    if (/^([0-9])*$/.test(dato)) {
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

function irMarca() {    
    var ventanaMarca = window.open('formularioFabricante.htm?cierre=close', 'miventana', 'titlebar=no, menubar=no, toolbar=no, location=no, status=no, width=1000, height=500');  
}
