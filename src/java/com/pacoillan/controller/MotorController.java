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

    ModelAndView mv = new ModelAndView();
    @Autowired
    MotorDAO motorDao;
    @Autowired
    FabricanteDAO fabricanteDao;

    @RequestMapping("formularioMotor.htm")
    public String formularioMotor() {
        return "formularioMotor";
    }

    @RequestMapping("comprobarCodigoMotor.htm")
    public void comprobarCodigoMotor(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String respuesta = "";
        String combustible = request.getParameter("codigo");
        System.out.println("combustible -> " + combustible);
    }

    @RequestMapping("altaMotor.htm")
    public ModelAndView altaMotor(@ModelAttribute Motor motor, HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        motor.setIdMotor(null);
        List fabricantes = fabricanteDao.listadoPorCampoExacto("codigo", request.getParameter("marca"));
        Fabricante fabricante = (Fabricante) fabricantes.get(0);
        motor.setFabricante(fabricante);
        motorDao.create(motor);
        mv.setViewName("formularioMotor");
        return mv;
    }

    @RequestMapping("bajaMotor.htm")
    public ModelAndView bajaMotor(@ModelAttribute Motor motor,
            HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        List fabricantes = fabricanteDao.listadoPorCampoExacto("codigo", request.getParameter("marca"));
        Fabricante fabricante = (Fabricante) fabricantes.get(0);
        motor.setFabricante(fabricante);
        //Fabricante mymarca = fabricanteDao.read(Integer.parseInt(request.getParameter("marcaMotor")));
        //motor.setFabricante(mymarca);
        motorDao.delete(motor);
        mv.setViewName("formularioMotor");
        return mv;
    }

    @RequestMapping("modificarMotor.htm")
    public ModelAndView modificarMotor(@ModelAttribute Motor motor,
            HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        List fabricantes = fabricanteDao.listadoPorCampoExacto("codigo", request.getParameter("marca"));
        Fabricante fabricante = (Fabricante) fabricantes.get(0);
        motor.setFabricante(fabricante);        
        motorDao.update(motor);
        mv.setViewName("formularioMotor");
        return mv;        
    }

    @RequestMapping("consultaMotor.htm")
    public ModelAndView consultaMotor(HttpServletRequest request, HttpServletResponse response) {
        String codigoMotor = request.getParameter("codigo").toUpperCase();
        System.out.println("el codigo es " + codigoMotor);
        List<Motor> listaMotores = motorDao.listadoPorCampoExacto("codigo", codigoMotor);
        if (listaMotores.size() == 1) {
            mv.setViewName("formularioMotores_7");
            mv.addObject("mot", listaMotores.get(0));
            System.out.println("MOtor " + listaMotores.get(0).getDescripcion());
        } else {
            mv.setViewName("formularioMotores_7");
            mv.addObject("mot", new Motor(codigoMotor));
            System.out.println("ERRORRRRRRR");
        }

        return mv;

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

    @RequestMapping("consultaCombustible.htm")
    public void consultaCombustible(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String respuesta = "";
        String combustible = request.getParameter("combustible");
        System.out.println("combustible -> " + combustible);

        if (combustible.equals("D")) {
            respuesta = "DIESEL";
        } else if (combustible.equals("G")) {
            respuesta = "GASOLINA";
        } else if (combustible.equals("H")) {
            respuesta = "HIBRIDO";
        } else if (combustible.equals("E")) {
            respuesta = "ELECTRICO";
        } else if (combustible.isEmpty()) {
            System.out.println("ITS NULL");
            respuesta = "";
        }
        System.out.println("respuesta " + respuesta);
        out.println(respuesta);
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

    @RequestMapping("listaFabricantes.htm")
    public void listaFabricantes(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String codigo = request.getParameter("cFabricante").toUpperCase();
        System.out.println("Datos " + codigo);
        response.setContentType("text/plain;charset=UTF-8");
        PrintWriter out = response.getWriter();

        List<Fabricante> lista = fabricanteDao.listadoPorCampoExacto("codigo", codigo);
        Fabricante f = lista.get(0);
        Gson gson = new Gson();
        String fabr = gson.toJson(f);
        System.out.println("Json -> " + fabr);
        out.println(fabr);
        /*if (lista.isEmpty()){
         System.out.println("No existe codigo");
         Gson gson = new Gson();
         String ff = gson.toJson(new Fabricante());
         System.out.println("Json -> "+ff);
         out.println(ff);
         }else if (lista.size()==1){
         System.out.println("El fabricante es "+lista.get(0).getNombre()+" "+lista.get(0).getLogo());
         Fabricante f = lista.get(0);
         Gson gson = new Gson();
         String fabr = gson.toJson(f);
         System.out.println("Json -> "+fabr);
         out.println(fabr);                                 
         }else if (lista.size()>1){
         System.out.println("Hay mas de uno");
            
         }  */
    }
}
