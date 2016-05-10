<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Formulario Modelo de Vehículo</title>

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
            <h1>Formulario de Modelo de Vehículo</h1>
            <br>
            <form id="formularioModelo" action="altaModelo.htm" method="post">
                <div class="col-md-6">
                    <div class="row">  
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="idModelo">ID Modelo</label>
                                <input type="text" class="form-control" id="idModelo" name="idModelo">
                            </div>          
                        </div>  
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="marca">Código Marca <a href="javascript:irMarca()">+</a></label>
                                <input type="text" class="form-control" id="marca" name="marca">
                            </div>          
                        </div>
                        <div class="col-md-8">
                            <div class="form-group">
                                <label for="marcaMotor">Marca Modelo</label>
                                <input type="text" class="form-control" id="marcaMotor" disabled>
                            </div>          
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="codigo">Código</label>
                                <input type="text" class="form-control" id="codigo" name="codigo">
                            </div>          
                        </div>
                        <div class="col-md-8">
                            <div class="form-group">
                                <label for="descripcion">Descripción</label>
                                <input type="text" class="form-control" id="descripcion" name="descripcion">
                            </div>          
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="mesInicio">Mes Inicio</label>
                                <input type="text" class="form-control" id="mesInicio" name="mesInicio">                          
                            </div>          
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="yearInicio">Año Inicio</label>
                                <input type="text" class="form-control" id="yearInicio" name="yearInicio">
                            </div>          
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="mesFin">Mes Fin</label>
                                <input type="text" class="form-control" id="mesFin" name="mesFin">                          
                            </div>          
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="yearFin">Año Fin</label>
                                <input type="text" class="form-control" id="yearFin" name="yearFin">
                            </div>          
                        </div>
                        
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="imagen">Imagen</label>
                                <input type="text" class="form-control" id="imagen" name="imagen">
                            </div>          
                        </div>
                        

                        <br>
                        <div class="btn-group col-md-12">
                            <button type="button" class="btn btn-primary" id="alta">Alta</button>
                            <button type="button" class="btn btn-primary" id="baja">Baja</button>
                            <button type="button" class="btn btn-primary" id="modificar">Modificar</button>
                            <button type="button" class="btn btn-primary" id="limpiar">Limpiar</button>
                            <button type="button" class="btn btn-primary" id="listado">Listado</button>
                            <button type="button" class="btn btn-primary" id="salir">Salir</button>
                        </div>
                    </div>

                </div>
            </form>
            <div class="row" id="dialog" title="Listado de Motores" style="display:none;">  
                <div class="col-md-12">
                    <div class="form-group">
                        <select class="form-control" id="listaMotores" size="4">

                        </select>                        
                    </div>          
                </div>
                <!--<div class="col-md-12">
                    <div id="dialog" title="Título de mi dialogo" style="display:none;">
                        <p>Contenido</p>                       
                    </div>          
                </div>-->
                <div class="btn-group col-md-12">                   
                    <button type="button" class="btn btn-primary" id="Dvolver">Volver</button>
                    <button type="button" class="btn btn-primary" id="Dcontinuar">Continuar con el Alta</button>                     
                </div>
            </div>


        </div>

        <!-- Librería jQuery requerida por los plugins de JavaScript -->
        <script src="js/jquery.js"></script>
        <link rel="stylesheet" href="http://code.jquery.com/ui/1.9.1/themes/base/jquery-ui.css" />
        <!--<script src="http://code.jquery.com/jquery-1.8.2.js"></script>  -->     
        <script src="http://code.jquery.com/ui/1.9.1/jquery-ui.js"></script>


        <!-- Todos los plugins JavaScript de Bootstrap (también puedes
             incluir archivos JavaScript individuales de los únicos
             plugins que utilices) -->
        <script src="js/bootstrap.min.js"></script>
        <script src="js/funcionesFormulario.js"></script>
    </body>
</html>