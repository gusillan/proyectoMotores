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
            <h1>Formulario de Entidades</h1>
            <br>
            <form id="formularioEntidad">
                <div class="col-md-6">
                    <div class="row">  
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="idModelo">ID Entidad</label>
                                <input type="text" class="form-control" id="idEntidad" name="idEntidad" disabled>
                            </div>                             
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="dni">DNI - CIF</label>
                                <input type="text" class="form-control" id="dni" name="dni" size="15">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="nombre">Nombre</label>
                                <input type="text" class="form-control" id="nombre" name="nombre">
                            </div>          
                        </div>                        
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="direccion">Dirección</label>
                                <input type="text" class="form-control" id="direccion" name="direccion">
                            </div>          
                        </div>                        
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="cPostal">Código Postal</label>
                                <input type="text" class="form-control" id="cPostal" name="cPostal">
                            </div>          
                        </div>
                        <div class="col-md-8">
                            <div class="form-group">
                                <label for="poblacion">Población</label>
                                <input type="text" class="form-control" id="poblacion" name="poblacion">
                            </div>          
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="movil">Móvil</label>
                                <input type="text" class="form-control" id="movil" name="movil">
                            </div>          
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="telefono">Teléfono fijo</label>
                                <input type="text" class="form-control" id="telefono" name="telefono">
                            </div>          
                        </div>


                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="email">e-mail</label>
                                <input type="text" class="form-control" id="email" name="email">
                            </div>          
                        </div>

                    </div>

                    <br>
                    <div class="row">
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
            <div class="row" id="dialog" title="Listado de Modelos" style="display:none;">  
                <div class="col-md-12">
                    <div class="form-group">
                        <select class="form-control" id="listaModelos" size="4">

                        </select>                        
                    </div>          
                </div>

                <div class="btn-group col-md-12">                   
                    <button type="button" class="btn btn-primary" id="Dvolver">Volver</button>
                    <button type="button" class="btn btn-primary" id="Dseleccionar">Seleccionar</button>
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
        <script src="js/funcionesFormularioEntidad.js"></script>
        <script src="js/funcionesComunes.js"></script>
    </body>
</html>