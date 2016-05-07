<%@page import="com.pacoillan.pojo.Motor"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Formulario Marcas</title>

        <link rel="stylesheet" href="css/estilos.css" type="text/css" />

        <script type="text/javascript" src="js/funcionesMarca.js"></script>
        <script type="text/javascript" src="js/funcionesComunes.js"></script>
        <script type="text/javascript" src="js/jquery.js"></script>
        <script type="text/javascript" src="js/Jqueryvalidation.js"></script>

            
        <script>
            var objetoXML = new XMLHttpRequest;  
            
            function verificarEntrada(entrada){
                if (entrada.value!=''){
                   formMarcaComprobarMarca(entrada);
                }
            } 
            
            function vuelta(){               
                var idmarca = document.getElementById("idMarca").value;
                opener.document.formMotor.marcaMotor.value = idmarca;
                window.close();
            }
        </script>

    </head>
    <body onload="formMarcaInicio();">
        <h1>Formulario de Marcas</h1>
        
        
        ${Motor.descripcionMotor}
        <br>
        <div id="ventanaEmergente">
            <h2 class="titulo">Selección de Marcas</h2>
            <select id="ventanaEmergenteOpciones" size="8"></select>
            <br>
            <br>
            <input type="button" name="seleccionar" value="Seleccionar" onclick="seleccionOpcion();">
            <input type="button" name="alta" value="Dar de Alta" onclick="formMarcaEntrada();">
            <input type="button" name="cancelar" value="Cancelar" onclick="formMarcaInicio();">
        </div>
        
        <form name="formMarca" id="formMarca" action="" method="POST">
            <fieldset><legend>Datos de Marcas</legend>
                <p><label>ID Marca : </label><input name="idMarca" id="idMarca" size="4"/>
                <p><label>Marca : </label><input name="nombre" onBlur="verificarEntrada(this)" id="nombre" 
                                                 size="10" onkeyup="this.value = this.value.toUpperCase();" class="mayuscula"/></p>
                <p><label>Logotipo : </label><input name="logotipo" id="logotipo" size="30" onkeyup="this.value = this.value.toUpperCase();" class="mayuscula"/></p>                                                                                            

            </fieldset>

            <fieldset style color="black"><legend>Menú de opciones</legend>
                <div id="menu">
                    <input type="button" value="Alta" id="botonAlta" disabled ="false" onclick="formMarcaAlta();"/>
                    <input type="button" value="Baja" id="botonBaja" disabled ="false" onclick="formMarcaBaja();" />
                    <input type="submit" value="Modificar" id="botonModificar" disabled ="false" onclick="formMarcaModificar();"/>
                    <input type="reset" value="Cancelar" id="borrarFormulario" onclick="formMarcaInicio();"/>                    
                    <input type="button" value="Listado" onclick="window.location.href = 'listaMarca.htm';"/> 
                    <br><br>
                    <input type="button" value="Volver" id="volver" onclick="vuelta();"/>
                    <input type="button" value="Inicio" id="inicio" onclick="window.location.href='index.htm';"/>
                </div>
            </fieldset>
            <br>           
        </form>

    </body>
</html>
