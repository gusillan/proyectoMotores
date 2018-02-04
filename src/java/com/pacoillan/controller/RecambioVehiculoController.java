/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pacoillan.controller;

import com.google.gson.Gson;
import com.pacoillan.DAO.ModeloDAO;
import com.pacoillan.DAO.ModeloRecambioDAO;
import com.pacoillan.DAO.MotorDAO;
import com.pacoillan.DAO.RecambioDAO;
import com.pacoillan.pojo.Modelo;
import com.pacoillan.pojo.ModeloRecambio;
import com.pacoillan.pojo.Motor;
import com.pacoillan.pojo.Recambio;
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
    public void agregarRecambio(ModeloRecambio mr, HttpServletRequest request, HttpServletResponse response) throws IOException {


        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        System.out.println("Referencia " + request.getParameter("referencia") + " ID Recambio " + request.getParameter("idRecambio"));
        System.out.println("Codigo Modelo " + request.getParameter("codigoModelo") + " ID Modelo " + request.getParameter("idModelo"));
        System.out.println("Codigo Motor " + request.getParameter("codigoMotor") + " ID Motor " + request.getParameter("idMotor"));

        Integer idRecambio = Integer.parseInt(request.getParameter("idRecambio"));
        Recambio recambio = recambioDao.read(idRecambio);
        System.out.println("Recambio " + recambio.getDescripcion());

        Integer idModelo = Integer.parseInt(request.getParameter("idModelo"));
        Modelo modelo = modeloDao.read(idModelo);
        System.out.println("Modelo " + modelo.getDescripcion());

        Integer idMotor = Integer.parseInt(request.getParameter("idMotor"));
        Motor motor = motorDao.read(idMotor);
        System.out.println("Motor " + motor.getDescripcion());

        mr.setModelo(modelo);
        mr.setMotor(motor);
        mr.setRecambio(recambio);

        modeloRecambioDao.create(mr);

        /*Gson gson = new Gson();
        String recambioAgregado = gson.toJson(recambio);
        System.out.println("Respuesta " + recambioAgregado);
        out.println(recambioAgregado);*/
        String query = "FROM ModeloRecambio WHERE idModelo='"+idModelo+"' AND idMotor='"+idMotor+"'";

        List<ModeloRecambio> listaModeloRecambio = modeloRecambioDao.listadoConfigurable(query);
        if (listaModeloRecambio.isEmpty()) {
            System.out.println("LISTA VACIA");
            out.println();
        } else {
            Gson gson = new Gson();
            String lista = gson.toJson(listaModeloRecambio);
            System.out.println("Lista Respuesta " + lista);
            out.println(lista);
        }
        
    }

    @RequestMapping("listarRecambio.htm")
    public void listarRecambio(HttpServletRequest request, HttpServletResponse response) throws IOException {


        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        System.out.println(" ID Modelo " + request.getParameter("idModelo"));
        System.out.println(" ID Motor " + request.getParameter("idMotor"));


        Integer idModelo = Integer.parseInt(request.getParameter("idModelo"));
        Integer idMotor = Integer.parseInt(request.getParameter("idMotor"));

        String query = "FROM ModeloRecambio WHERE idModelo='"+idModelo+"' AND idMotor='"+idMotor+"'";

        List<ModeloRecambio> listaModeloRecambio = modeloRecambioDao.listadoConfigurable(query);
        if (listaModeloRecambio.isEmpty()) {
            System.out.println("LISTA VACIA");
            out.println();
        } else {
            Gson gson = new Gson();
            String lista = gson.toJson(listaModeloRecambio);
            System.out.println("Lista Respuesta " + lista);
            out.println(lista);
        }
    }
}
