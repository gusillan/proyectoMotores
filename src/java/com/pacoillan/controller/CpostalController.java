/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pacoillan.controller;

import com.google.gson.Gson;
import com.pacoillan.DAO.CpostalDAO;
import com.pacoillan.DAO.FabricanteDAO;
import com.pacoillan.pojo.Cpostal;
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
public class CpostalController {

    ModelAndView mv = new ModelAndView();
    @Autowired
    CpostalDAO CpostalDao;

    
    @RequestMapping("guardarCpostal.htm")
    public void altaCpostal(Cpostal cpostal, HttpServletRequest request, HttpServletResponse response) throws IOException {
        String codigo = request.getParameter("codigo");
        String poblacion = request.getParameter("poblacion");
        System.out.println("Alta de "+codigo+" "+poblacion);
        CpostalDao.update(cpostal);
    }

    @RequestMapping("consultaCpostal.htm")
    public void consultaCpostal(HttpServletRequest request, HttpServletResponse response) throws IOException {
        
        System.out.println("Codigo Postal "+request.getParameter("codigo"));
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String codigo = request.getParameter("codigo");
        List<Cpostal> listaCpostal = CpostalDao.listadoPorCampoExacto("codigo", codigo);
        if (listaCpostal.isEmpty()) {
            out.println();
        } else {
            Gson gson = new Gson();
            String lista = gson.toJson(listaCpostal);
            System.out.println(lista);
            out.println(lista);
        }
    }

    
}
