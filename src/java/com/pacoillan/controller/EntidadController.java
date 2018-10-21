
package com.pacoillan.controller;

import com.google.gson.Gson;
import com.pacoillan.DAO.EntidadDAO;
import com.pacoillan.pojo.Entidad;
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
public class EntidadController {

    
    @Autowired
    EntidadDAO entidadDao;
    

    @RequestMapping("guardaEntidad.htm")
    public void altaEntidad( Entidad entidad, HttpServletRequest request, HttpServletResponse response) {            
                
        entidadDao.update(entidad);
        
    }

    @RequestMapping("bajaEntidad.htm")
    public void bajaEntidad(Entidad entidad,HttpServletRequest request, HttpServletResponse response) {
                
        entidadDao.delete(entidad);
    }
    
    @RequestMapping("consultaDni.htm")
    public void consultaDni(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
              
        String dniEntidad = (request.getParameter("parametro"));//.toUpperCase());
        List<Entidad> listaEntidades = entidadDao.listadoPorCampoExacto("dniEntidad", dniEntidad);
        if (listaEntidades.isEmpty()) {
            out.println();
        } else {
            Collections.sort(listaEntidades);
        }
        Gson gson = new Gson();
        String lista = gson.toJson(listaEntidades);
        out.println(lista);
    }    
    
    @RequestMapping("consultaEntidadPorNombre.htm")
    public void consultaPorNombre(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        
        String nombreEntidad = (request.getParameter("parametro").toUpperCase());
        List<Entidad> listaEntidades = entidadDao.listadoPorCampo("nombreEntidad", nombreEntidad);
        if (listaEntidades.isEmpty()) {
            out.println();
        } else {
            Collections.sort(listaEntidades);
        }
        Gson gson = new Gson();
        String lista = gson.toJson(listaEntidades);
        out.println(lista);
    }
    
    @RequestMapping("consultaClientePorCodigo.htm")
    public void consultaClientePorCodigo(HttpServletRequest request, HttpServletResponse response) throws IOException{
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        
        String codigo = (request.getParameter("codigo").toUpperCase());
        List<Entidad> listaEntidades = entidadDao.listadoPorCampoExacto("idEntidad", codigo);
        if (listaEntidades.isEmpty()) {
            out.println();
        } else {
            Collections.sort(listaEntidades);
        }
        Gson gson = new Gson();
        String lista = gson.toJson(listaEntidades);
        out.println(lista);            
    }            
}
