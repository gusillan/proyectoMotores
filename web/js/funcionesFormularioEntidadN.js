$(function() {

    $('input').keyup(function() {
        this.value = this.value.toUpperCase();
    });
    $('#dni').blur(function() {
        var dni = $('#dni').val();       
        if (vacio(dni)) {
            console.log("Campo DNI / CIF Vacio");
        } else {
            formateaDni(dni);
        }   
    });
    $('#alta').click(comprobarAlta);
    $('#baja').click(confirmarBaja);
    $('#modificar').click(confirmarModificacion);
    $('#limpiar').click(limpiar);       
    $('#salir').click(salir);
    $('#buscarNombre').click(buscarNombre);
    $('#dni').focus();
});

function formateaDni(dni){
    
    var expresion_regular_letras = /^[a-zA-Z]+$/;
    var primera = dni.substring(0,1);
    var ultima = dni.substring(dni.length - 1, dni.length);
    var digitos = dni.length;    
    
    console.log("Formatear dni "+dni+" primera "+primera+" ultima "+ultima);
    if (primera=='X'){
        console.log("DNI Extranjero");
    }
    // comprobacion si CIF
    if (digitos>9){
        alert ("DNI con mas de 9 digitos");
        limpiar();
    }else{
        console.log(digitos);   
            if (expresion_regular_letras.test(ultima)) {
                console.log("tiene letra al final . Añadir 0 si es necesario y comprobarla");
                dniFin = pad(dni,9);
                console.log("DNI Completo "+dniFin);
                dniSinLetra = dniFin.substring(0, dniFin.length - 1);
                console.log("DNI sin Letra " + dniSinLetra);
                console.log("comparativa " + ultima + " - " + dniLetra(dniSinLetra));
                if (ultima==dniLetra(dniSinLetra)){
                    console.log("Letra coincide");
                    rellenar(dniFin);
                    $.getJSON('consultaDni.htm', {dni: dniFin}, procesaRespuesta); //HAcer una funcion                     
                }else{
                    alert("Letra erronea");
                    limpiar();
                }
            }else{
                console.log("dni sin letra");
                //Calcula letra
                dniL = dni + dniLetra(dni);
                console.log("Letra calculada "+dniL);
                //Rellena con 0
                dniFin = pad(dniL,9);
                console.log("Dni definitivo "+dniFin);
                rellenar(dniFin);
                $.getJSON('consultaDni.htm', {dni: dniFin}, procesaRespuesta);       
            }
    }
    
}
function dniLetra(dni) {
    cadena = "TRWAGMYFPDXBNJZSQVHLCKET";
    posicion = dni % 23;
    letra = cadena.substring(posicion, posicion + 1);
    return letra;

}
function rellenar(dni){
    $('#dni').val(dni);
    
}


function limpiar() {
    $('#formularioEntidad')[0].reset();
    $('#baja').attr('disabled', false);
    $('#modificar').attr('disabled', false);
    $('#dni').focus();
}

function rellenaForm(entidad) {
    $('#idEntidad').val(entidad.idEntidad);
    $('#dni').val(entidad.dni);
    $('#nombre').val(entidad.nombre);
    $('#direccion').val(entidad.direccion);
    $('#cpostal').val(entidad.cpostal);
    $('#poblacion').val(entidad.poblacion);
    $('#movil').val(entidad.movil);
    $('#telefono').val(entidad.telefono);
    $('#email').val(entidad.email);

}
function comprobarAlta(){
    
    if (validacion()){
        alta();
    }else{
        alert ("ERROR DE VALIDACION");
    }
}
function alta(){
        
    idEntidad = $('#idEntidad').val();
    dni = $('#dni').val();
    nombre = $('#nombre').val();
    direccion = $('#direccion').val();
    cpostal = $('#cpostal').val();
    poblacion = $('#poblacion').val();
    movil = $('#movil').val();
    telefono = $('#telefono').val();
    email = $('#email').val();
    
    console.log("Alta de "+nombre);
    
    $.ajax({
        url: 'altaEntidad.htm',
        data: {idEntidad: idEntidad, dni: dni, nombre: nombre, direccion: direccion,
            cpostal: cpostal, poblacion: poblacion, movil: movil, telefono: telefono,
            email: email},
        type: 'POST',
        success: limpiar
    });
}
function baja(){
    
    alert ("DAR DE BAJA");
    
}
function buscarNombre(){
    console.log("Buscar por nombre "+$("#nombre").val());
    nombre = $("#nombre").val();
    
    $.ajax({
        url: 'consultaPorNombre.htm',
        data: {nombre: nombre},
        type: 'POST',
        success: limpiar
    });
}
function modificar() {
    idEntidad = $('#idEntidad').val();
    dni = $('#dni').val();
    nombre = $('#nombre').val();
    direccion = $('#direccion').val();
    cpostal = $('#cpostal').val();
    poblacion = $('#poblacion').val();
    movil = $('#movil').val();
    telefono = $('#telefono').val();
    email = $('#email').val();

    $.ajax({
        url: 'modificaEntidad.htm',
        data: {idEntidad: idEntidad, dni: dni, nombre: nombre, direccion: direccion,
            cpostal: cpostal, poblacion: poblacion, movil: movil, telefono: telefono,
            email: email},
        type: 'POST',
        success: limpiar
    });

}


function salir() {
     window.history.back();
}

function validacion() {
    if (vacio($('#dni').val())) {
        alert("Campo dni VACIO");
        $('#dni').focus();
        return false;
    }
    if (vacio($('#nombre').val())) {
        alert("Campo nombre VACIO");
        $('#nombre').focus();
        return false;
    }
    if (vacio($('#direccion').val())) {
        alert("Campo direccion VACIO");
        $('#direccion').focus();
        return false;
    }
    if (vacio($('#cpostal').val())) {
        alert("Campo Código Postal VACIO");
        $('#cpostal').focus();
        return false;
    }
   
    if (vacio($('#poblacion').val())) {
        alert("Campo poblacion VACIO");
        $('#poblacion').focus();
        return false;
    }
    else {
        return true;
    }
}