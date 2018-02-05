/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pacoillan.controller;

import com.pacoillan.DAO.RecambioDAO;
import com.pacoillan.DAO.SustitucionDAO;
import com.pacoillan.pojo.Recambio;
import com.pacoillan.pojo.Sustitucion;
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
public class SustitucionController {
    
    @Autowired
    RecambioDAO recambioDao;
    @Autowired
    SustitucionDAO sustitucionDao;
    
    @RequestMapping("guardaSustitucion.htm")
    public void guardaSustitucion(Sustitucion sustitucion,HttpServletRequest request, HttpServletResponse response)  {
     

        System.out.println("Referencia A " + request.getParameter("referenciaA") + " ID ReferenciaA " + request.getParameter("idRecambioA"));
        System.out.println("Referencia B " + request.getParameter("referenciaB") + " ID ReferenciaB " + request.getParameter("idRecambioB"));
        System.out.println("Codigo Sustitucion " + request.getParameter("sustitucion"));

        Integer idRecambioA = Integer.parseInt(request.getParameter("idRecambioA"));
        Recambio recambioA = recambioDao.read(idRecambioA);
        System.out.println("Recambio A " + recambioA.getDescripcion());

        Integer idRecambioB = Integer.parseInt(request.getParameter("idRecambioB"));
        Recambio recambioB = recambioDao.read(idRecambioB);
        System.out.println("Recambio B " + recambioB.getDescripcion());

        Integer tipoSustitucion = Integer.parseInt(request.getParameter("sustitucion"));
        System.out.println("Sustitucion " + sustitucion);

        sustitucion.setRecambioA(recambioA);
        sustitucion.setRecambioB(recambioB);
        sustitucion.setSustitucion(tipoSustitucion);
        
        sustitucionDao.create(sustitucion);
        
        
    }
}
