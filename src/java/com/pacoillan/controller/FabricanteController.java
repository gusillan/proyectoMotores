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
    
    @RequestMapping("guardaFabricante.htm")
    public void guardaFabricante(Fabricante fabricante, HttpServletRequest request, HttpServletResponse response) throws IOException {
        String logoMinuscula = fabricante.getLogo().toLowerCase();
        fabricante.setLogo(logoMinuscula);
        fabricanteDao.update(fabricante);
    }

    @RequestMapping("consultaFabricante.htm")
    public void consultaFabricante(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String codigoFabricante = request.getParameter("codigo");
        List<Fabricante> listaFabricantes = fabricanteDao.listadoPorCampoExacto("codigo", codigoFabricante);
        System.out.println(listaFabricantes);
        //if (listaFabricantes.isEmpty()) {
        //    out.println();
        //} else {
            Gson gson = new Gson();
            String lista = gson.toJson(listaFabricantes);
            System.out.println(lista);
            out.println(lista);
        //}
    }

    @RequestMapping("bajaFabricante.htm")
    public void bajaFabricante(Fabricante fabricante, HttpServletRequest request, HttpServletResponse response) {        
        try{
         fabricanteDao.delete(fabricante);
        }catch (Exception ex){            
            System.out.println("Excepcion al dar de baja el registro" +ex);
        }       
       
    }    
}
