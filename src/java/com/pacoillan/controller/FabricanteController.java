/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pacoillan.controller;

import com.google.gson.Gson;
import com.pacoillan.DAO.FabricanteDAO;
import com.pacoillan.pojo.Fabricante;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Enumeration;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author Gustabo
 */
@Controller
public class FabricanteController {

    ModelAndView mv = new ModelAndView();
    @Autowired
    FabricanteDAO fabricanteDao;

    @RequestMapping("formularioFabricante.htm")
    public ModelAndView formularioFabricante(HttpServletRequest request, HttpServletResponse response) throws MalformedURLException, IOException {
        System.out.println("tipo de cierre " + request.getParameter("cierre"));
        String cierre = request.getParameter("cierre");
        System.out.println("atributo de peticion " + request.getHeader("referer"));
        String peticion = request.getHeader("referer");
        URL url = new URL(peticion);
        String archivo = url.getFile();
        System.out.println("Archivo : " + archivo);

        request.setAttribute("peticion", archivo);
        request.setAttribute("cierre", cierre);

        mv.setViewName("formularioFabricante");
        return mv;
    }

    @RequestMapping("altaFabricante.htm")
    public void altaFabricante(Fabricante fabricante, HttpServletResponse response) throws IOException {
        fabricanteDao.create(fabricante);
        response.sendRedirect("formularioFabricante.htm");
    }

    @RequestMapping("consultaFabricante.htm")
    public void consultaFabricante(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String codigoFabricante = request.getParameter("codigoFabricante");
        System.out.println("Codigo fabricante " + codigoFabricante);
        List<Fabricante> listaFabricantes = fabricanteDao.listadoPorCampoExacto("codigo", codigoFabricante);
        if (listaFabricantes.isEmpty()) {
            out.println();
        } else {
            Gson gson = new Gson();
            String lista = gson.toJson(listaFabricantes);
            out.println(lista);
        }
    }
}
