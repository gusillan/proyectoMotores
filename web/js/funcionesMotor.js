
// Funciones ---Motor---




function formMotorEntrada() {
    document.getElementById("botonAlta").disabled = false;
    document.getElementById("botonCancelar").disabled = false;
    document.getElementById("ventanaEmergenteOpciones").options.length = 0;
    document.getElementById("botonBaja").disabled = true;
    document.getElementById("botonModificar").disabled = true;
    document.getElementById("ventanaEmergente").style.display = 'none';
    document.getElementById("descripcionMotor").focus();
}

function formMotorAlta() {
    descripcion = document.getElementById("descripcionMotor").value;    
    combustible = document.getElementById("combustibleMotor").value;
    cilindrada = document.getElementById("cilindradaMotor").value;
    kw = document.getElementById("kwMotor").value;
    marca = document.getElementById("marcaMotor").value;
    if( descripcion=="" || combustible=="" || cilindrada==""
        || kw=="" ||  marca==""){
        alert("Tiene que rellenar campos");
        document.getElementById("descripcionMotor").focus();
    }else{
        document.getElementById("formMotor").action = "altaMotor.htm";
        document.getElementById("formMotor").submit();
        formMotorInicio();
    }        
}

function formMotorBaja() {
    respuesta = confirm("Seguro que desea dar de baja este motor?");
    if (respuesta === true) {
        document.getElementById("formMotor").action = "bajaMotor.htm";
        document.getElementById("formMotor").submit();
    } else {
        formMotorInicio();
    }
}

function formMotorModificar() {
    descripcion = document.getElementById("descripcionMotor").value;    
    combustible = document.getElementById("combustibleMotor").value;
    cilindrada = document.getElementById("cilindradaMotor").value;
    kw = document.getElementById("kwMotor").value;
    marca = document.getElementById("marcaMotor").value;
    if( descripcion=="" || combustible=="" || cilindrada=="" 
       || kw=="" ||  marca==""){
        alert("Tiene que rellenar campos");
        document.getElementById("descripcionMotor").focus();
    }else{
        document.getElementById("formMotor").action = "modificarMotor.htm";
        document.getElementById("formMotor").submit();
    }          
}

/*function irMarcas(){
    window.location="formularioMarcas.htm";
}*/
