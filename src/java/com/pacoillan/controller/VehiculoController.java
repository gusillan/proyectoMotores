/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pacoillan.controller;

import com.google.gson.Gson;
import com.pacoillan.DAO.VehiculoDAO;
import com.pacoillan.pojo.Vehiculo;
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
public class VehiculoController {
    
    @Autowired
    VehiculoDAO vehiculoDao;
    
    @RequestMapping("consultaMatricula.htm")
    public void consultaMatricula(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String matricula = request.getParameter("matricula");
        System.out.println("Comprobamos la matricula "+matricula);
        List<Vehiculo> listaVehiculos = vehiculoDao.listadoPorCampo("matricula", matricula);
        System.out.println("Lista Vehiculos ("+listaVehiculos.size()+") "+listaVehiculos);
        //if (listaFabricantes.isEmpty()) {
        //    out.println();
        //} else {
            Gson gson = new Gson();
            String lista = gson.toJson(listaVehiculos);
            System.out.println(lista);
            out.println(lista);
        //}
    }
    
}
