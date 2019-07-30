/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pacoillan.controller;

import com.pacoillan.DAO.RecambioDAO;
import com.pacoillan.DAO.SustitucionDAO;
import com.pacoillan.pojo.Recambio;
import com.pacoillan.pojo.Sustitucion;
import java.io.IOException;
import java.io.PrintWriter;
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
        System.out.println("Recambio A " + recambioA.getDescripcionRecambio());

        Integer idRecambioB = Integer.parseInt(request.getParameter("idRecambioB"));
        Recambio recambioB = recambioDao.read(idRecambioB);
        System.out.println("Recambio B " + recambioB.getDescripcionRecambio());

        Integer tipoSustitucion = Integer.parseInt(request.getParameter("sustitucion"));
        System.out.println("Sustitucion " + sustitucion);

        sustitucion.setRecambioA(recambioA);
        sustitucion.setRecambioB(recambioB);
        sustitucion.setSustitucion(tipoSustitucion);
        
        sustitucionDao.create(sustitucion);       
        
    }
    
    /*@RequestMapping("buscaSustituciones.htm")
    public void buscaSustituciones(HttpServletRequest request, HttpServletResponse response) throws IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        Integer idRecambio = Integer.parseInt(request.getParameter("idRecambio"));
        System.out.println("IdRecambio -> " + idRecambio);
       
        /*List<Recambio> listaRecambios = recambioDao.listadoPorCampoExacto("referencia", referencia);
        if (listaRecambios.isEmpty()) {            
            out.println();
        } else {
            Collections.sort(listaRecambios);
        }
        Gson gson = new Gson();
        String lista = gson.toJson(listaRecambios);
        System.out.println("Lista Respuesta " + lista);
        out.println(lista);
    }*/
}
