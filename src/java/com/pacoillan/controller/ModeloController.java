package com.pacoillan.controller;

import com.google.gson.Gson;
import com.pacoillan.DAO.FabricanteDAO;
import com.pacoillan.DAO.ModeloDAO;
import com.pacoillan.pojo.Fabricante;
import com.pacoillan.pojo.Modelo;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collections;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ModeloController {

    ModelAndView mv = new ModelAndView();
    @Autowired
    ModeloDAO modeloDao;
    @Autowired
    FabricanteDAO fabricanteDao;

    

    @RequestMapping("consultaModelo.htm")
    public void consultaModelo(Modelo modelo,HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        System.out.println("Codigo "+request.getParameter("codigo"));
        System.out.println("Fecha i "+request.getParameter("fechaInicio"));
        System.out.println("Fecha f "+request.getParameter("fechaFin"));
        /*response.setContentType("application/json");
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
        out.println(lista);*/
    }

    @RequestMapping("guardaModelo.htm")
    public void guardaModelo( HttpServletRequest request, HttpServletResponse response) {
        
        
        System.out.println("Codigo "+request.getParameter("codigo"));
        System.out.println("Fecha i "+request.getParameter("fechaInicio"));
        System.out.println("Fecha f "+request.getParameter("fechaFin"));
        /*List fabricantes = fabricanteDao.listadoPorCampoExacto("codigo", request.getParameter("marca"));
        Fabricante fabricante = (Fabricante) fabricantes.get(0);
        System.out.println(fabricante.getNombre());
        modelo.setFabricante(fabricante);
        String imagenMinuscula = modelo.getImagen().toLowerCase();
        modelo.setImagen(imagenMinuscula);
        modeloDao.create(modelo);*/
        
    }

    @RequestMapping("bajaModelo.htm")
    public void bajaModelo(Modelo modelo,HttpServletRequest request, HttpServletResponse response) {
                
        List fabricantes = fabricanteDao.listadoPorCampoExacto("codigo", request.getParameter("marca"));
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
}
