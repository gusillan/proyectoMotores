package com.pacoillan.controller;

import com.google.gson.Gson;
import com.pacoillan.DAO.FabricanteDAO;
import com.pacoillan.DAO.MotorDAO;
import com.pacoillan.pojo.Fabricante;
import com.pacoillan.pojo.Motor;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collections;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MotorController {

    
    @Autowired
    MotorDAO motorDao;
    @Autowired
    FabricanteDAO fabricanteDao;

    
    @RequestMapping("guardaMotor.htm")
    public void guardaMotor(Motor motor,HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Codigo Marca "+request.getParameter("codigoMarca"));
        System.out.println("Motor "+motor.getDescripcion());
        //System.out.println("motor "+motor.getDescripcion()+" marca "+motor.getFabricante().getCodigo());
        List fabricantes = fabricanteDao.listadoPorCampoExacto("codigo", request.getParameter("codigoMarca"));
        Fabricante fabricante = (Fabricante) fabricantes.get(0);
        motor.setFabricante(fabricante);
        motorDao.create(motor);

    }

    @RequestMapping("bajaMotor.htm")
    public void bajaMotor(Motor motor, HttpServletRequest request, HttpServletResponse response) {

        List fabricantes = fabricanteDao.listadoPorCampoExacto("codigo", request.getParameter("codigoMarca"));
        Fabricante fabricante = (Fabricante) fabricantes.get(0);
        motor.setFabricante(fabricante);
        motorDao.delete(motor);
    }

   
    @RequestMapping("consultaCodigoMotor.htm")
    public void consultaCodigoMotor(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String codigoMotor = (request.getParameter("codigo").toUpperCase());
        System.out.println("Codigo -> " + codigoMotor);
        List<Motor> listaMotores = motorDao.listadoPorCampoExacto("codigo", codigoMotor);
        if (listaMotores.isEmpty()) {
            //Motor m = new Motor(codigoMotor);
            //Fabricante f = new Fabricante();
            //m.setFabricante(f);
            //listaMotores.add(m);
            out.println();
        } else {
            Collections.sort(listaMotores);
        }
        Gson gson = new Gson();
        String lista = gson.toJson(listaMotores);
        System.out.println("Lista Respuesta " + lista);
        out.println(lista);
    }

    @RequestMapping("listaMotores.htm")
    public void listaMotores(HttpServletRequest request, HttpServletResponse response, @ModelAttribute Motor motor, @RequestBody String jsonEntrada)
            throws IOException {
        Gson gson = new Gson();
        Motor m = gson.fromJson(jsonEntrada, Motor.class);
        System.out.println("Objeto recibido " + jsonEntrada);
        System.out.println("Objeto JAVA " + m.getCodigo() + " " + m.getDescripcion());
        List<Motor> listaMotores;
        listaMotores = motorDao.listadoPorCampo("codigo", m.getCodigo());
        //listaMotores = motorDao.listAll();       
        Collections.sort(listaMotores);

        String lista = gson.toJson(listaMotores);
        System.out.println("Motores JSON " + lista);
        response.setContentType("text/xml;charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.println(lista);
    }
    
    @RequestMapping("consultaPorDescripcionMotor.htm")
    public void consultaPorDescripcionMotor(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        System.out.println("Descripcion " + request.getParameter("descripcion"));
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String descripcionMotor = (request.getParameter("descripcion").toUpperCase());        
        List<Motor> listaMotores = motorDao.listadoPorCampo("descripcion", descripcionMotor);
        System.out.println("Listado" + listaMotores);
        if (listaMotores.isEmpty()) {
            out.println();
        } else {
            Collections.sort(listaMotores);
        }
        Gson gson = new Gson();
        String lista = gson.toJson(listaMotores);
        System.out.println("Lista Respuesta " + lista);
        out.println(lista);
    }
}
