/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pacoillan.controller;

import com.google.gson.Gson;
import com.pacoillan.DAO.EntidadDAO;
import com.pacoillan.pojo.Entidad;
import java.io.IOException;
import java.io.PrintWriter;
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
    

    @RequestMapping("formularioEntidad.htm")
    public String formularioEntidad() {
        return "formularioEntidad";
    }

    @RequestMapping("consultaDni.htm")
    public void consultaDni(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String dni = (request.getParameter("dni"));//.toUpperCase());
        System.out.println("DNI  -> " + dni);
        List<Entidad> listaEntidades = entidadDao.listadoPorCampoExacto("dni", dni);
        System.out.println("Listado" + listaEntidades);
        if (listaEntidades.isEmpty()) {
            out.println();
        } else {
            //Collections.sort(listaEntidades);
        }
        Gson gson = new Gson();
        String lista = gson.toJson(listaEntidades);
        System.out.println("Lista Respuesta " + lista);
        out.println(lista);
    }
    
    
    @RequestMapping("consultaPorNombre.htm")
    public void consultaPorNombre(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String nombre = (request.getParameter("nombre").toUpperCase());
        System.out.println("Nombre a consultar  -> " + nombre);
        List<Entidad> listaEntidades = entidadDao.listadoPorCampo("nombre", nombre);
        System.out.println("Entidades listadas "+listaEntidades.size());
        System.out.println("Listado" + listaEntidades);
        if (listaEntidades.isEmpty()) {
            out.println();
        } else {
            //Collections.sort(listaEntidades);
        }
        Gson gson = new Gson();
        String lista = gson.toJson(listaEntidades);
        System.out.println("Lista Respuesta " + lista);
        out.println(lista);
    }
    
    @RequestMapping("consultaClientePorCodigo.htm")
    public void consultaClientePorCodigo(HttpServletRequest request, HttpServletResponse response) throws IOException{
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String codigo = (request.getParameter("codigo").toUpperCase());
        System.out.println("Codigo a consultar  -> " + codigo);
        List<Entidad> listaEntidades = entidadDao.listadoPorCampoExacto("idEntidad", codigo);
        System.out.println("Entidades listadas "+listaEntidades.size());
        System.out.println("Listado" + listaEntidades);
        if (listaEntidades.isEmpty()) {
            out.println();
        } else {
            //Collections.sort(listaEntidades);
        }
        Gson gson = new Gson();
        String lista = gson.toJson(listaEntidades);
        System.out.println("Lista Respuesta " + lista);
        out.println(lista);
       
        
        
    }
            

    @RequestMapping("altaEntidad.htm")
    public void altaEntidad( Entidad entidad, HttpServletRequest request, HttpServletResponse response) {
                
        
        System.out.println("Dar de alta a : "+entidad.getNombre());
        entidadDao.create(entidad);
        
    }

    @RequestMapping("bajaEntidad.htm")
    public void bajaEntidad(Entidad entidad,HttpServletRequest request, HttpServletResponse response) {
        
        System.out.println("Dar de baja la entidad n "+entidad.getIdEntidad()+" nombre "+entidad.getNombre());
        entidadDao.delete(entidad);
    }

    @RequestMapping("modificaEntidad.htm")
    public void modificaEntidad(Entidad entidad, HttpServletRequest request, HttpServletResponse response) {
         
        System.out.println("Id "+entidad.getIdEntidad());
        System.out.println("Entidad "+entidad.getNombre());
        System.out.println("Direccion "+entidad.getDireccion()+" poblacion "+entidad.getPoblacion());
        entidadDao.update(entidad);
        
    }    
}
