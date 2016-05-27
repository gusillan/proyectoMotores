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
        mv.setViewName("formularioFabricantes");
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
        Gson json = new Gson();

        List<Fabricante> lista = fabricanteDao.listadoPorCampoExacto("codigo", codigoFabricante);
        if (lista.size() == 0) {
            System.out.println("No existe codigo");
            Fabricante f = new Fabricante();
            lista.add(f);
            String listaFabricantes = json.toJson(lista);
            System.out.println("LIsta fabricantes " + listaFabricantes);
            out.println(listaFabricantes);
        } else if (lista.size() == 1) {
            System.out.println("El fabricante es " + lista.get(0).getNombre());
            String listaFabricantes = json.toJson(lista);
            System.out.println("LIsta fabricantes " + listaFabricantes);
            out.println(listaFabricantes);
        } else if (lista.size() > 1) {
            System.out.println("Hay mas de uno");

        }



    }
}
