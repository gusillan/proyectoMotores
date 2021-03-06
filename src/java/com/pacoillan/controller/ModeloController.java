package com.pacoillan.controller;

import com.google.gson.Gson;
import com.pacoillan.DAO.FabricanteDAO;
import com.pacoillan.DAO.ModeloDAO;
import com.pacoillan.pojo.Fabricante;
import com.pacoillan.pojo.Modelo;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@Controller
public class ModeloController {

    @Autowired
    FabricanteDAO fabricanteDao;
    @Autowired
    ModeloDAO modeloDao;

    @RequestMapping("guardaModelo.htm")
    public void guardaModelo(Modelo modelo, HttpServletRequest request, HttpServletResponse response) throws IOException, IllegalStateException, ServletException {

        List fabricantes = fabricanteDao.listadoPorCampoExacto("codigoFabricante", request.getParameter("codigoFabricante"));
        Fabricante fabricante = (Fabricante) fabricantes.get(0);
        modelo.setFabricante(fabricante);
        String imagenMinuscula = modelo.getImagenModelo().toLowerCase();
        modelo.setImagenModelo(imagenMinuscula);
        modeloDao.update(modelo);
    }

    @RequestMapping("bajaModelo.htm")
    public void bajaModelo(Modelo modelo, HttpServletRequest request, HttpServletResponse response) {

        List fabricantes = fabricanteDao.listadoPorCampoExacto("codigoFabricante", request.getParameter("codigoFabricante"));
        Fabricante fabricante = (Fabricante) fabricantes.get(0);
        modelo.setFabricante(fabricante);
        modeloDao.delete(modelo);
    }

    @RequestMapping("consultaModelo.htm")
    public void consultaModelo(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        
        String codigoModelo = (request.getParameter("parametro").toUpperCase());
        List<Modelo> listaModelos = modeloDao.listadoPorCampoExacto("codigoModelo", codigoModelo);
        if (listaModelos.isEmpty()) {
            out.println();
        } else {
            Collections.sort(listaModelos);
        }
        Gson gson = new Gson();
        String lista = gson.toJson(listaModelos);
        out.println(lista);
    }

    @RequestMapping("guardaImagen.htm")
    public void guardaImagen(MultipartHttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {

        Iterator<String> itr = request.getFileNames();

        MultipartFile mpf = request.getFile(itr.next());
        System.out.println(mpf.getOriginalFilename() + " uploaded!!");
        System.out.println("Bytes " + mpf.getBytes().length);
        System.out.println("Bytes " + mpf.getBytes());
        System.out.println("tipo " + mpf.getContentType());
        ServletContext contexto = request.getServletContext();
        System.out.println("Cont " + contexto.getContextPath());
        String rutaI = contexto.getRealPath("/html");
        System.out.println("Ruta I " + rutaI);
        Integer pos = rutaI.indexOf("build");
        String rutaR = rutaI.substring(0, pos - 1);
        System.out.println("RutaR " + rutaR);

        String ruta = rutaR + ("/web/html/img/imagenesVehiculos");
        System.out.println("Ruta " + ruta);

        File localFile = new File(ruta + "/" + mpf.getOriginalFilename());
        FileOutputStream os = null;

        try {
            os = new FileOutputStream(localFile);
            os.write(mpf.getBytes());
        } finally {
            if (os != null) {
                try {
                    os.close();
                } catch (IOException e) {
                    e.printStackTrace();

                }
            }
        }
    }

    @RequestMapping("consultaModeloPorDescripcion.htm")
    public void consultaModeloPorDescripcion(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        System.out.println("Descripcion " + request.getParameter("parametro"));
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String descripcionModelo = (request.getParameter("parametro").toUpperCase());
        List<Modelo> listaModelos = modeloDao.listadoPorCampo("descripcionModelo", descripcionModelo);
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
}
