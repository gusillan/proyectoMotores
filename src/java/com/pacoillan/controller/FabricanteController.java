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
import java.util.List;
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
    public ModelAndView formularioFabricante(HttpServletRequest request, HttpServletResponse response) {
        mv.setViewName("formularioFabricante");
        return mv;
    }

    @RequestMapping("altaFabricante.htm")
    public void altaFabricante(Fabricante fabricante, HttpServletRequest request, HttpServletResponse response) throws IOException {
        String logoMinuscula = fabricante.getLogo().toLowerCase();
        fabricante.setLogo(logoMinuscula);
        fabricanteDao.create(fabricante);
    }

    @RequestMapping("consultaFabricante.htm")
    public void consultaFabricante(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String codigoFabricante = request.getParameter("codigo");
        System.out.println("Vamos a consultar el codigo "+codigoFabricante);
        List<Fabricante> listaFabricantes = fabricanteDao.listadoPorCampoExacto("codigo", codigoFabricante);
        if (listaFabricantes.isEmpty()) {
            out.println();
        } else {
            Gson gson = new Gson();
            String lista = gson.toJson(listaFabricantes);
            out.println(lista);
        }
    }

    @RequestMapping("bajaFabricante.htm")
    public void bajaFabricante(Fabricante fabricante, HttpServletRequest request, HttpServletResponse response) throws IOException {        
        fabricanteDao.delete(fabricante);
    }

    @RequestMapping("modificaFabricante.htm")
    public void modificaFabricante(Fabricante fabricante, HttpServletRequest request, HttpServletResponse response) throws IOException {
        fabricanteDao.update(fabricante);
    }
}
