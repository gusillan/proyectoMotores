package com.pacoillan.controller;

import com.google.gson.Gson;
import com.pacoillan.DAO.FabricanteDAO;
import com.pacoillan.DAO.ModeloDAO;
import com.pacoillan.pojo.Fabricante;
import com.pacoillan.pojo.Modelo;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.Collections;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.servlet.ModelAndView;


@Controller
@MultipartConfig

public class ModeloController {

    ModelAndView mv = new ModelAndView();
    
    @Autowired
    FabricanteDAO fabricanteDao;
    @Autowired
    ModeloDAO modeloDao;
            
    @RequestMapping("consultaModelo.htm")
    public void consultaModelo(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        System.out.println("Codigo " + request.getParameter("codigo"));
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String codigoModelo = (request.getParameter("codigo").toUpperCase());
        System.out.println("Codigo -> " + codigoModelo);
        List<Modelo> listaModelos = modeloDao.listadoPorCampoExacto("codigo", codigoModelo);
        System.out.println("Listado" + listaModelos);
        if (listaModelos.isEmpty()) {
            out.println();
        } else {
            Collections.sort(listaModelos);
        }
        Gson gson = new Gson();
        String lista = gson.toJson(listaModelos);
        System.out.println("Lista Respuesta " + lista);
        out.println(lista);
    }

    @RequestMapping("guardaModelo.htm")
    public void guardaModelo(Modelo modelo,HttpServletRequest request, HttpServletResponse response) throws IOException, IllegalStateException, ServletException {


        System.out.println("Codigo " + request.getParameter("codigo"));
        System.out.println("Fecha i " + request.getParameter("fechaInicio"));
        System.out.println("Fecha f " + request.getParameter("fechaFin"));
        System.out.println("Codigo Fab " + request.getParameter("codigoFabricante"));



        List fabricantes = fabricanteDao.listadoPorCampoExacto("codigo", request.getParameter("codigoFabricante"));
        Fabricante fabricante = (Fabricante) fabricantes.get(0);
        System.out.println(fabricante.getNombre());
        modelo.setFabricante(fabricante);
        String imagenMinuscula = modelo.getImagen().toLowerCase();
        modelo.setImagen(imagenMinuscula);
        modeloDao.create(modelo);

    }

    @RequestMapping("bajaModelo.htm")
    public void bajaModelo(Modelo modelo, HttpServletRequest request, HttpServletResponse response) {

        List fabricantes = fabricanteDao.listadoPorCampoExacto("codigo", request.getParameter("codigoFabricante"));
        Fabricante fabricante = (Fabricante) fabricantes.get(0);
        modelo.setFabricante(fabricante);
        modeloDao.delete(modelo);
    }

    @RequestMapping("modificaModelo.htm")
    public void modificaModelo(Modelo modelo, HttpServletRequest request, HttpServletResponse response) {

        List fabricantes = fabricanteDao.listadoPorCampoExacto("codigo", request.getParameter("marca"));
        Fabricante fabricante = (Fabricante) fabricantes.get(0);
        modelo.setFabricante(fabricante);
        modeloDao.update(modelo);

    }

    @RequestMapping("guardaImagen.htm")
    public void guardaImagen(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        
       try{
           Part filePart = request.getPart("file");
           System.out.println("Hello "+filePart);
           InputStream inputStream = null;
           if (filePart !=null){
               long fileSize = filePart.getSize();
               String fileContent = filePart.getContentType();
               inputStream = filePart.getInputStream();
           }
           
       }catch (Exception exe){
           exe.printStackTrace();
       }
       
        //DiskFileItemFactory factory = new DiskFileItemFactory();
        //ServletFileUpload upload = new ServletFileUpload(factory);
        //List fileItems = upload.parseRequest(request);

        //System.out.println("El numero de ficheros subidos es " + fileItems.size());
        System.out.println("hola");
        System.out.println("Descripcion "+request.getParameter("descripcion"));
        System.out.println("Archivo " + request.getParameter("img"));
        System.out.println("Atributo " + request.getAttribute("img"));
        System.out.println("Prueba " + request.getParameter("prueba"));

        //Part fotoPart = request.getPart("archivo");
        //System.out.println("Arhivos "+fotoPart.getSize());


    }
}
