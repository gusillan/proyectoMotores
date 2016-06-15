<%-- 
    Document   : formularioMotoresBootstrap
    Created on : 25-ene-2016, 23:11:16
    Author     : Gustavo
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Formulario Fabricantes</title>

        <!-- CSS de Bootstrap -->
        <link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
        <link href="css/estilos2.css" rel="stylesheet">

        <!-- librerías opcionales que activan el soporte de HTML5 para IE8 -->
        <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
          <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->
    </head>
    <body>

        <div class="formulario container">
            <h1>Formulario de Fabricantes</h1>
            <br>
            <form id="formularioFabricantes"  method="post">
                <div class="row"> 
                    <div class="col-md-6" id="pantallaI">
                        <div class="row">  
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="idFabrciante">ID Fabricante</label>
                                    <input type="text" class="form-control" id="idFabricante" name="idFabricante">
                                </div>          
                            </div> 
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="codigo">Código</label>
                                    <input type="text" class="form-control" id="codigo" name="codigo">
                                </div>          
                            </div>
                            <div class="col-md-8">
                                <div class="form-group">
                                    <label for="descripcion">Nombre</label>
                                    <input type="text" class="form-control" id="nombre" name="nombre">
                                </div>          
                            </div>
                        </div>
                        <div class="row">    
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="logo">Logotipo</label>
                                    <input type="text" class="form-control" id="logo" name="logo">
                                </div>          
                            </div>
                        </div>


                        <br>
                        <div class="row">
                            <div class="btn-group col-md-12">
                                <button type="button" class="btn btn-primary" id="alta">Alta</button>
                                <button type="button" class="btn btn-primary" id="baja">Baja</button>
                                <button type="button" class="btn btn-primary" id="modificar">Modificar</button>
                                <button type="reset" class="btn btn-primary" id="limpiar">Limpiar</button>
                                <button type="button" class="btn btn-primary" id="listado">Listado</button>
                                <button type="button" class="btn btn-primary" id="salir">Salir</button>                            
                            </div>
                        </div>
                        </form>
                    </div>

                    <div class="col-md-6" id="pantallaD">
                        <div class="col-md-6">
                            <div class="form-group">
                                <div class="centrado">
                                    <img id="imgLogo" src="img/marcas/logo.png" height="100" />
                                </div>
                            </div>          
                        </div>
                    </div>
                </div>


                <% String str = (String) request.getAttribute("peticion");%>
                <% String cierre = (String) request.getAttribute("cierre");%>
               
                <script>
                    function salir() {       
                        
                      

                        if ('<%=cierre%>'==="close") {
                            window.close();
                        } else {
                            location.href = '<%=str%>';
                        }


                    }
                </script>

                <!-- Librería jQuery requerida por los plugins de JavaScript -->
                <script src="js/jquery.js"></script>


                <!-- Todos los plugins JavaScript de Bootstrap (también puedes
                     incluir archivos JavaScript individuales de los únicos
                     plugins que utilices) -->
                <script src="js/bootstrap.min.js"></script>
                <script src="js/funcionesComunes.js"></script>
                <script src="js/funcionesFormularioFabricante.js"></script>
                </body>
                </html>