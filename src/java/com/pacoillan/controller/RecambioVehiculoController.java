/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pacoillan.controller;

import com.pacoillan.DAO.RecambioDAO;
import com.pacoillan.pojo.Recambio;
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
public class RecambioVehiculoController {

    
    @Autowired
    RecambioDAO recambioDao;
   
    
    @RequestMapping("agregarRecambio.htm")
    public void agregarRecambio(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Referencia "+request.getParameter("referencia"));
        System.out.println("Codigo Modelo "+request.getParameter("codigoModelo"));
        System.out.println("Codigo Motor "+request.getParameter("codigoMotor")+" ID Motor "+request.getParameter("idMotor"));
        System.out.println("Precio "+request.getParameter("pvp")+" descuento "+request.getParameter("descuento"));
        List recambios = recambioDao.listadoPorCampoExacto("referencia", request.getParameter("referencia"));
        Recambio recambio = (Recambio) recambios.get(0); /// OJO solo obtiene el primero si hay varias referencias iguales!!!!!!
        //List categorias = categoriaDao.listadoPorCampoExacto("codigo", request.getParameter("codigoCategoria"));
        //CategoriaRecambio categoria = (CategoriaRecambio) categorias.get(0);
        //recambio.setFabricante(fabricante);
        //recambio.setCategoria(categoria);
        //recambioDao.create(recambio);
        System.out.println("Recambio "+recambio.getIdRecambio());

    }
}
    