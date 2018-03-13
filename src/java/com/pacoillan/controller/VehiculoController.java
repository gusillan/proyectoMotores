/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pacoillan.controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.pacoillan.DAO.EntidadDAO;
import com.pacoillan.DAO.ModeloDAO;
import com.pacoillan.DAO.MotorDAO;
import com.pacoillan.DAO.VehiculoDAO;
import com.pacoillan.pojo.Entidad;
import com.pacoillan.pojo.Modelo;
import com.pacoillan.pojo.Motor;
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
    @Autowired
    ModeloDAO modeloDao;
    @Autowired
    MotorDAO motorDao;
    @Autowired
    EntidadDAO entidadDao;

    @RequestMapping("consultaMatricula.htm")
    public void consultaMatricula(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String matricula = request.getParameter("matricula");
        System.out.println("Comprobamos la matricula " + matricula);
        List<Vehiculo> listaVehiculos = vehiculoDao.listadoPorCampo("matricula", matricula);

        final String FORMATO_FECHA = "dd/MM/yyyy";

        System.out.println("Lista Vehiculos (" + listaVehiculos.size() + ") " + listaVehiculos);
        //if (listaFabricantes.isEmpty()) {
        //    out.println();
        //} else {
        Gson gson = new GsonBuilder().setDateFormat(FORMATO_FECHA).create();
        String lista = gson.toJson(listaVehiculos);
        System.out.println(lista);
        out.println(lista);
        //}
    }

    @RequestMapping("guardaVehiculo.htm")
    public void guardaVehiculo(Vehiculo vehiculo, HttpServletRequest request, HttpServletResponse response) throws IOException {

        System.out.println("chasis vehiculo y fecha " + vehiculo.getChasis() + " " + vehiculo.getFechaMatricula());

        System.out.println("Matricula " + request.getParameter("matricula"));
        System.out.println("Chasis " + request.getParameter("chasis"));
        System.out.println("Modelo " + request.getParameter("codigoModelo"));
        System.out.println("Motor " + request.getParameter("codigoMotor"));

        List modelos = modeloDao.listadoPorCampoExacto("codigo", request.getParameter("codigoModelo"));
        List motores = motorDao.listadoPorCampoExacto("codigo", request.getParameter("codigoMotor"));
        List entidades = entidadDao.listadoPorCampoExacto("idEntidad", request.getParameter("codigoCliente"));

        Modelo modelo = (Modelo) modelos.get(0);
        Motor motor = (Motor) motores.get(0);
        Entidad entidad = (Entidad) entidades.get(0);

        vehiculo.setModelo(modelo);
        vehiculo.setMotor(motor);
        vehiculo.setEntidad(entidad);

        vehiculoDao.create(vehiculo);
    }

    @RequestMapping("bajaVehiculo.htm")
    public void bajaModelo(Vehiculo vehiculo, HttpServletRequest request, HttpServletResponse response) {

        System.out.println("Vamos a dar de baja el siguiente vehiculo " + vehiculo.getMatricula());

        List modelos = modeloDao.listadoPorCampoExacto("codigo", request.getParameter("codigoModelo"));
        List motores = motorDao.listadoPorCampoExacto("codigo", request.getParameter("codigoMotor"));
        List entidades = entidadDao.listadoPorCampoExacto("idEntidad", request.getParameter("codigoCliente"));

        Modelo modelo = (Modelo) modelos.get(0);
        Motor motor = (Motor) motores.get(0);
        Entidad entidad = (Entidad) entidades.get(0);

        vehiculo.setModelo(modelo);
        vehiculo.setMotor(motor);
        vehiculo.setEntidad(entidad);        
        
        vehiculoDao.delete(vehiculo);
    }
}
