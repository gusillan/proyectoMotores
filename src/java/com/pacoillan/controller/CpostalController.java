/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pacoillan.controller;

import com.google.gson.Gson;
import com.pacoillan.DAO.CpostalDAO;
import com.pacoillan.pojo.Cpostal;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class CpostalController {
    
    @Autowired
    CpostalDAO CpostalDao;

    @RequestMapping("guardaCpostal.htm")
    public void altaCpostal(Cpostal cpostal, HttpServletRequest request, HttpServletResponse response) throws IOException {
      
        CpostalDao.update(cpostal);
    }

    @RequestMapping("bajaCpostal.htm")
    public void bajaMotor(Cpostal cpostal, HttpServletRequest request, HttpServletResponse response) {
        
        CpostalDao.delete(cpostal);
    }

    @RequestMapping("consultaCpostal.htm")
    public void consultaCpostal(HttpServletRequest request, HttpServletResponse response) throws IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        
        String codigo = request.getParameter("parametro");
        System.out.println("el codigo solicitado es "+codigo);
        List<Cpostal> listaCpostal = CpostalDao.listadoPorCampoExacto("codigo", codigo);
        if (listaCpostal.isEmpty()){
            System.out.println("VACIO");
            out.println();
        }else{
            
        }
        System.out.println("REspuesta");
        Gson gson = new Gson();
        String lista = gson.toJson(listaCpostal);
        System.out.println("Lista "+lista);
        out.println(lista);

    }
}
