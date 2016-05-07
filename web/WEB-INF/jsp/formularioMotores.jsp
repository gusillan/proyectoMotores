

<%@page import="com.google.gson.Gson"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@page import="com.pacoillan.pojo.Motor"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Formulario Motores</title>

        <link rel="stylesheet" href="css/estilos.css" type="text/css" />

        <script type="text/javascript" src="js/funcionesMotor.js"></script>
        <script type="text/javascript" src="js/jquery.js"></script>
        <script type="text/javascript" src="js/Jqueryvalidation.js"></script>


        <script type="text/javascript">

            var objetoAJAX = new XMLHttpRequest;
            var resp;

            function verificarEntrada(entrada) {
                if (entrada.value !== '') {
                    formMotorComprobarCodigo(entrada);
                }
            }
            function formMotorComprobarCodigo(codigo) {
                var codigoMotor = codigo.value.toUpperCase();
                if (codigoMotor !== "") {
                    objetoAJAX.open("POST", "consultaCodigoMotor.htm", true);
                    objetoAJAX.onreadystatechange = funcionRespuesta;
                    objetoAJAX.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    objetoAJAX.send("codigoMotor=" + codigoMotor);
                } else {
                    alert("Tiene que introducir algún caracter");
                    document.getElementById("codigoMotor").focus();
                }
            }
            function funcionRespuesta() {
                if (objetoAJAX.readyState === 4) {
                    var respuestaJson = objetoAJAX.responseText;
                    resp = JSON.parse(respuestaJson);
                    if (resp.length === 0) {
                        var c = confirm("No hay coincidencias. Desea dar de alta");
                        if (c == true) {
                            formMotorEntrada();
                        } else {
                            formMotorInicio();
                        }
                    } else if (resp.length === 1) {
                        rellenaFormulario(0);
                    } else {
                        formMotorMenuEmergente(resp);
                    }

                }

            }
            function rellenaFormulario(n) {
                document.getElementById("idMotor").value = resp[n].idMotor;
                document.getElementById("codigoMotor").value = resp[n].codigo;
                document.getElementById("descripcionMotor").value = resp[n].descripcion;
                document.getElementById("combustibleMotor").value = resp[n].combustible;
                document.getElementById("cilindradaMotor").value = resp[n].cilindrada;
                document.getElementById("kwMotor").value = resp[n].kw;
                document.getElementById("cv").value = ((resp[n].kw) * 1.36).toFixed(1);
                document.getElementById("marcaMotor").value = resp[n].marca.idMarca;

                document.getElementById("botonAlta").disabled = true;
                document.getElementById("botonBaja").disabled = false;
                document.getElementById("botonModificar").disabled = false;
                document.getElementById("botonCancelar").disabled = false;
            }
            function formMotorMenuEmergente(respuesta) {
                var s = document.getElementById("ventanaEmergenteOpciones");
                for (p = 0; p < respuesta.length; p++) {
                    var opt = document.createElement("option");
                    opt.value = p;
                    opt.text = respuesta[p].codigo + " - " + respuesta[p].descripcion;
                    s.add(opt, p);
                }
                s.options[0].selected = "selected";
                //document.getElementById("botonBaja").disabled = false;
                //document.getElementById("botonModificar").disabled = false;
                document.getElementById("ventanaEmergente").style.display = 'block';
                document.getElementById("ventanaEmergenteOpciones").focus();
            }
            function irMarcas() {
                document.getElementById("formMotor").action = "formularioMarcas.htm";
                document.getElementById("formMotor").submit();
            }
            function formMotorInicio() {
                //document.getElementById("codigoMotor").value = "";               
                document.getElementById("formMotor").reset();
                document.getElementById("formMotor").action = "";
                document.getElementById("botonAlta").disabled = true;
                document.getElementById("botonBaja").disabled = true;
                document.getElementById("botonModificar").disabled = true;
                document.getElementById("botonCancelar").disabled = true;
                document.getElementById("ventanaEmergenteOpciones").options.length = 0;
                document.getElementById("ventanaEmergente").style.display = 'none';
                document.getElementById("codigoMotor").focus();

            }
            function formMotorMenuEmergenteEleccion() {
                var eleccion = document.getElementById("ventanaEmergenteOpciones").selectedIndex;
                rellenaFormulario(eleccion);
                document.getElementById("ventanaEmergente").style.display = 'none';
            }
            function calculoCV(kw) {
                document.getElementById("cv").value = ((kw.value) * 1.36).toFixed(1);
            }
            
            function popup(){
                
                var popup = window.open("formularioMarcas.htm", "_blank", "toolbar=yes, scrollbars=yes, resizable=no, top=100, left=30, width=800, height=500");
                popup.window.document.getElementById("volver").style.display='none';
            }

           window.onload = formMotorInicio;

        </script>

    </head
    <body>
        <h1>Formulario de Motores</h1>
        <br>
        <div id="ventanaEmergente">
            <h2 class="titulo">Selección de Motores</h2>
            <select id="ventanaEmergenteOpciones" size="8"></select>
            <br>
            <br>
            <input type="button" name="seleccionar" value="Seleccionar" onclick="formMotorMenuEmergenteEleccion();">
            <input type="button" name="alta" value="Dar de Alta" onclick="formMotorEntrada();">
            <input type="button" name="cancelar" value="Cancelar" onclick="formMotorInicio();">
        </div>

        <form:form name="formMotor" id="formMotor" method="POST" modelAttribute="mot">
            <fieldset>
                <legend>Datos del motor</legend>
                <p><label>Nº Motor :    </label> 
                    <form:input id="idMotor" size="4" onkeydown="return false;" path="idMotor"/>
                <p><label>Código :      </label>
                    <form:input id="codigoMotor" size="10" onBlur="verificarEntrada(this)" onkeyup="this.value = this.value.toUpperCase();" class="mayuscula"
                                path="codigo" />                   
                <p><label>Descripción : </label>
                    <form:input id="descripcionMotor" size="40" onkeyup="this.value = this.value.toUpperCase();" class = "mayuscula"
                                path="descripcion"/></p>
                <p><label>Combustible : </label>
                    <form:select id="combustibleMotor" path="combustible">
                    <option value=""></option>
                    <option value="D" ${'D' == mot.combustible ? 'selected' : ''}>DIESEL</option>
                    <option value="G" ${'G' == mot.combustible ? 'selected' : ''}>GASOLINA</option>
                    <option value="H" ${'H' == mot.combustible ? 'selected' : ''}>HIBRIDO</option>
                    <option value="E" ${'E' == mot.combustible ? 'selected' : ''}>ELECTRICO</option>
                </form:select>     

                <p><label>Cilindrada : </label>
                    <form:input title="Introduzca c.c." id="cilindradaMotor" size="8" required="true" path="cilindrada"/>
                    <label>Kw : </label>
                    <form:input id="kwMotor" size="4" onBlur="calculoCV(this);" path="kw"/>
                    <label>Cv : </label>
                    <input name="cv" id="cv" disabled="true" size ="4"   /></p>
                <p><label>Fabricante : </label>
                <select id="marcaMotor" name="marcaMotor">
                    <option value=""></option>
                    <c:forEach items="${listaMarcas}" var="marca">
                        <option value="${marca.idMarca}" ${marca == mot.marca ? 'selected' : ''} >${marca.nombre}</option>
                    </c:forEach>
                </select>
                <input type="button" value="+" id="altaMarca" onclick="popup();"/>
                <input type="hidden" name="retorno" value="formularioMarcas.htm"/>
            </p>

        </fieldset>

        <fieldset>
            <legend>Menú de opciones</legend>
            <div id="menu">
                <input type="button" value="Alta" id="botonAlta" disabled ="true" onclick="formMotorAlta();"/>
                <input type="button" value="Baja" id="botonBaja" disabled ="true" onclick="formMotorBaja();" />
                <input type="button" value="Modificar" id="botonModificar" disabled ="true" onclick="formMotorModificar();"/>
                <input type="reset"  value="Cancelar" id="botonCancelar" disabled ="true" onclick="formMotorInicio();"/> 
                <br><br>
                <input type="button" value="Volver" id="volver" onclick="window.history.back();"/>
                <input type="button" value="Inicio" id="inicio" onclick="window.location.href = 'index.htm';"/>
            </div>                
        </fieldset>
        <br>           
    </form:form>

</body>
</html>
