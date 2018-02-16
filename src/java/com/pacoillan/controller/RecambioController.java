/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pacoillan.controller;

import com.google.gson.Gson;
import com.pacoillan.DAO.CategoriaRecambioDAO;
import com.pacoillan.DAO.FabricanteDAO;
import com.pacoillan.DAO.RecambioDAO;
import com.pacoillan.DAO.SustitucionDAO;
import com.pacoillan.pojo.CategoriaRecambio;
import com.pacoillan.pojo.Fabricante;
import com.pacoillan.pojo.Recambio;
import com.pacoillan.pojo.Sustitucion;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collections;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author Gustavo
 */
@Controller
public class RecambioController {

    @Autowired
    RecambioDAO recambioDao;
    @Autowired
    FabricanteDAO fabricanteDao;
    @Autowired
    CategoriaRecambioDAO categoriaDao;
    @Autowired
    SustitucionDAO sustitucionDao;
   

    @RequestMapping("guardaRecambio.htm")
    public void guardaRecambio(Recambio recambio, HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Referencia " + request.getParameter("referencia"));
        System.out.println("Codigo Marca " + request.getParameter("codigoMarca"));
        System.out.println("Categoria " + request.getParameter("codigoCategoria"));
        System.out.println("Precio " + request.getParameter("pvp") + " descuento " + request.getParameter("descuento"));
        List fabricantes = fabricanteDao.listadoPorCampoExacto("codigo", request.getParameter("codigoMarca"));
        Fabricante fabricante = (Fabricante) fabricantes.get(0);
        List categorias = categoriaDao.listadoPorCampoExacto("codigo", request.getParameter("codigoCategoria"));
        CategoriaRecambio categoria = (CategoriaRecambio) categorias.get(0);
        recambio.setFabricante(fabricante);
        recambio.setCategoria(categoria);
        recambioDao.create(recambio);

    }

    @RequestMapping("bajaRecambio.htm")
    public void bajaRecambio(Recambio recambio, HttpServletRequest request, HttpServletResponse response) {

        System.out.println("Recambio " + recambio.getDescripcion());
        List fabricantes = fabricanteDao.listadoPorCampoExacto("codigo", request.getParameter("codigoMarca"));
        Fabricante fabricante = (Fabricante) fabricantes.get(0);
        recambio.setFabricante(fabricante);
        List categorias = categoriaDao.listadoPorCampoExacto("codigo", request.getParameter("codigoCategoria"));
        CategoriaRecambio categoria = (CategoriaRecambio) categorias.get(0);
        recambio.setCategoria(categoria);
        recambioDao.delete(recambio);
    }

    @RequestMapping("consultaReferencia.htm")
    public void consultaReferencia(HttpServletRequest request, HttpServletResponse response) throws IOException {

    }
    
}
