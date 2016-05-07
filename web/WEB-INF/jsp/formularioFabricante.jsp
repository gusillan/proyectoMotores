<%@page import="com.pacoillan.pojo.Motor"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Formulario Fabricante</title>

        <link rel="stylesheet" href="css/estilos.css" type="text/css" />

        
        <script type="text/javascript" src="js/jquery.js"></script>
        

        <script>
            function verificarCodigo(codigo){
                if (codigo.value!=''){
                   comprobarCodigoFabricante(codigo);
                }                
            }
            function comprobarCodigoFabricante(codigo){
                document.getElementById("formFabricante").action = "consultaFabricante.htm";
                document.getElementById("formFabricante").submit();
            }
            function formularioBajaModifica(){
                document.getElementById("botonAlta").disabled = true;
                document.getElementById("botonBaja").disabled = false;
                document.getElementById("botonModificar").disabled = false;
                document.getElementById("codigo").focus();
            }
            function formularioAlta(){
                document.getElementById("botonAlta").disabled = false;
                document.getElementById("botonBaja").disabled = true;
                document.getElementById("botonModificar").disabled = true;
                document.getElementById("codigo").focus();
            }
            function comprobarEntrada(){
                if ("${fab.nombre}"!=''){   
                    alert ("modificacion o baja");
                    formularioBajaModifica();
                }else{
                    alert ("hay que dar de alta"); 
                    formularioAlta();       
                }
            }
            
            window.onload = function(){
                comprobarEntrada();
            }
           
        </script>    
        

    </head>
    <body>
        <h1>Formulario de Fabricante</h1>
        
        
        
        <br>
        
        
        <form name="formFabricante" id="formFabricante" action="" method="POST" >
            <fieldset><legend>Datos de Fabricante</legend>
                
                <p><label>ID Fabricante : </label><input name="id_fabricante" 
                                                         id="id_fabricante" 
                                                         size="4"
                                                         value="${fab.idFabricante}"/>
                <p><label>Codigo Fabricante : </label><input name="codigo"  
                                                             id="codigo" 
                                                             size="5" 
                                                             onBlur="verificarCodigo(this);" 
                                                             onkeyup="this.value = this.value.toUpperCase();" 
                                                             class="mayuscula"
                                                             value ="${fab.codigo}"/></p>
                <p><label>Nombre Fabricante : </label><input name="nombre"  
                                                             id="nombre" 
                                                             size="15" 
                                                             onkeyup="this.value = this.value.toUpperCase();" 
                                                             class="mayuscula"
                                                             value ="${fab.nombre}"/></p>
                <p><label>Logotipo : </label><input name="logotipo" 
                                                    id="logo" 
                                                    size="30"
                                                    onblur="cambiarLogo(this);"
                                                    onkeyup="this.value = this.value.toUpperCase();" 
                                                    class="mayuscula"
                                                    value="${fab.logo}"/> <img id="imagenLogo" src="img/${fab.logo}"/></p>
               

            </fieldset>

            <fieldset style color="black"><legend>Menú de opciones</legend>
                <div id="menu">
                    <input type="button" 
                           value="Alta" 
                           id="botonAlta"                          
                           onclick="formMarcaAlta();"/>
                    <input type="button" 
                           value="Baja" 
                           id="botonBaja"                          
                           onclick="formMarcaBaja();" />
                    <input type="submit" 
                           value="Modificar" 
                           id="botonModificar" 
                           onclick="formMarcaModificar();"/>
                    <input type="reset" 
                           value="Cancelar" 
                           id="borrarFormulario" 
                           onclick="formMarcaInicio();"/>                    
                    <input type="button" 
                           value="Listado" 
                           onclick="window.location.href = 'listaMarca.htm';"/> 
                    <br><br>
                    <input type="button" 
                           value="Volver" 
                           id="volver" 
                           onclick="vuelta();"/>
                    <input type="button" 
                           value="Inicio" 
                           id="inicio" 
                           onclick="window.location.href='index.htm';"/>
                </div>
            </fieldset>
            <br>           
        </form>

    </body>
</html>
