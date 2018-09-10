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
       

    @RequestMapping("consultaFabricante.htm")
    public void consultaFabricante(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String codigoFabricante = request.getParameter("parametro");
        List<Fabricante> listaFabricantes = fabricanteDao.listadoPorCampoExacto("codigo", codigoFabricante);
        System.out.println(listaFabricantes);
        
        Gson gson = new Gson();
        String lista = gson.toJson(listaFabricantes); //Borrar
        System.out.println(lista);
        out.println(lista);       
    }

    @RequestMapping("guardaFabricante.htm")
    public void guardaFabricante(Fabricante fabricante, HttpServletRequest request, HttpServletResponse response) throws IOException {
        System.out.println("Fabricante "+fabricante.getLogo());
        String logoMinuscula = fabricante.getLogo().toLowerCase();
        fabricante.setLogo(logoMinuscula);
        fabricanteDao.update(fabricante);
    }
    
    @RequestMapping("bajaFabricante.htm")
    public void bajaFabricante(Fabricante fabricante, HttpServletRequest request, HttpServletResponse response) {    
        System.out.println("Vamos a dar de baja al fabricante "+fabricante.getNombre());
        try{
         fabricanteDao.delete(fabricante);
        }catch (Exception ex){            
            System.out.println("Excepcion al dar de baja el registro" +ex);
        }       
       
    }    
}
