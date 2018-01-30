/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pacoillan.controller;

import com.pacoillan.DAO.ModeloDAO;
import com.pacoillan.DAO.ModeloRecambioDAO;
import com.pacoillan.DAO.MotorDAO;
import com.pacoillan.DAO.RecambioDAO;
import com.pacoillan.pojo.Modelo;
import com.pacoillan.pojo.ModeloRecambio;
import com.pacoillan.pojo.Motor;
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
    @Autowired
    MotorDAO motorDao;
    @Autowired
    ModeloDAO modeloDao;
    @Autowired
    ModeloRecambioDAO modeloRecambioDao;
   
    
    @RequestMapping("agregarRecambio.htm")
    public void agregarRecambio(ModeloRecambio mr,HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Referencia "+request.getParameter("referencia")+" ID Recambio "+request.getParameter("idRecambio"));
        System.out.println("Codigo Modelo "+request.getParameter("codigoModelo")+" ID Modelo "+request.getParameter("idModelo"));
        System.out.println("Codigo Motor "+request.getParameter("codigoMotor")+" ID Motor "+request.getParameter("idMotor"));      
        //List recambios = recambioDao.listadoPorCampoExacto("referencia", request.getParameter("referencia"));
        //Recambio recambio = (Recambio) recambios.get(0); /// OJO solo obtiene el primero si hay varias referencias iguales!!!!!!
        //List categorias = categoriaDao.listadoPorCampoExacto("codigo", request.getParameter("codigoCategoria"));
        //CategoriaRecambio categoria = (CategoriaRecambio) categorias.get(0);
        //recambio.setFabricante(fabricante);
        //recambio.setCategoria(categoria);
        //recambioDao.create(recambio);
        Integer idRecambio = Integer.parseInt( request.getParameter("idRecambio"));
        Recambio recambio = recambioDao.read(idRecambio);
        System.out.println("Recambio "+recambio.getDescripcion());
        
        Integer idModelo = Integer.parseInt( request.getParameter("idModelo"));
        Modelo modelo = modeloDao.read(idModelo);
        System.out.println("Modelo "+modelo.getDescripcion());
        
        
        Integer idMotor = Integer.parseInt( request.getParameter("idMotor"));
        Motor motor = motorDao.read(idMotor);
        System.out.println("Motor "+motor.getDescripcion());
        
        mr.setModelo(modelo);
        mr.setMotor(motor);
        mr.setRecambio(recambio);
        
        modeloRecambioDao.create(mr);

    }
}
    