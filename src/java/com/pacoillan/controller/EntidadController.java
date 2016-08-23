/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pacoillan.controller;

import com.google.gson.Gson;
import com.pacoillan.DAO.EntidadDAO;
import com.pacoillan.pojo.Entidad;
import com.pacoillan.pojo.Fabricante;
import com.pacoillan.pojo.Modelo;
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

    @RequestMapping("altaEntidad.htm")
    public void altaEntidad( Modelo modelo, HttpServletRequest request, HttpServletResponse response) {
                
        List fabricantes = fabricanteDao.listadoPorCampoExacto("codigo", request.getParameter("marca"));
        Fabricante fabricante = (Fabricante) fabricantes.get(0);
        System.out.println(fabricante.getNombre());
        modelo.setFabricante(fabricante);
        String imagenMinuscula = modelo.getImagen().toLowerCase();
        modelo.setImagen(imagenMinuscula);
        modeloDao.create(modelo);
        
    }

    @RequestMapping("bajaEntidad.htm")
    public void bajaEntidad(Modelo modelo,HttpServletRequest request, HttpServletResponse response) {
                
        List fabricantes = fabricanteDao.listadoPorCampoExacto("codigo", request.getParameter("marca"));
        Fabricante fabricante = (Fabricante) fabricantes.get(0);
        modelo.setFabricante(fabricante);
        modeloDao.delete(modelo);
    }

    @RequestMapping("modificaEntidad.htm")
    public void modificaEntidad(Modelo modelo, HttpServletRequest request, HttpServletResponse response) {
              
        List fabricantes = fabricanteDao.listadoPorCampoExacto("codigo", request.getParameter("marca"));
        Fabricante fabricante = (Fabricante) fabricantes.get(0);
        modelo.setFabricante(fabricante);
        modeloDao.update(modelo);
        
    }    
}
