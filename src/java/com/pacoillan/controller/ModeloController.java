package com.pacoillan.controller;

import com.google.gson.Gson;
import com.pacoillan.DAO.FabricanteDAO;
import com.pacoillan.DAO.ModeloDAO;
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
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ModeloController {

    ModelAndView mv = new ModelAndView();
    @Autowired
    ModeloDAO modeloDao;
    @Autowired
    FabricanteDAO fabricanteDao;

    @RequestMapping("formularioModelo.htm")
    public String formularioModelo() {
        return "formularioModelo";
    }

    @RequestMapping("comprobarCodigoModelo.htm")
    public void comprobarCodigoModelo(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String respuesta = "";
        String combustible = request.getParameter("codigo");
        System.out.println("combustible -> " + combustible);
    }

    @RequestMapping("altaModelo.htm")
    public ModelAndView altaModelo(@ModelAttribute Modelo modelo, HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        modelo.setIdModelo(null);
        List fabricantes = fabricanteDao.listadoPorCampoExacto("codigo", request.getParameter("marca"));
        Fabricante fabricante = (Fabricante) fabricantes.get(0);
        modelo.setFabricante(fabricante);
        modeloDao.create(modelo);
        mv.setViewName("formularioModelo");
        return mv;
    }

    @RequestMapping("bajaModelo.htm")
    public ModelAndView bajaModelo(@ModelAttribute Modelo modelo,
            HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        List fabricantes = fabricanteDao.listadoPorCampoExacto("codigo", request.getParameter("marca"));
        Fabricante fabricante = (Fabricante) fabricantes.get(0);
        modelo.setFabricante(fabricante);
        //Fabricante mymarca = fabricanteDao.read(Integer.parseInt(request.getParameter("marcaModelo")));
        //modelo.setFabricante(mymarca);
        modeloDao.delete(modelo);
        mv.setViewName("formularioModelo");
        return mv;
    }

    @RequestMapping("modificarModelo.htm")
    public ModelAndView modificarModelo(@ModelAttribute Modelo modelo,
            HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        List fabricantes = fabricanteDao.listadoPorCampoExacto("codigo", request.getParameter("marca"));
        Fabricante fabricante = (Fabricante) fabricantes.get(0);
        modelo.setFabricante(fabricante);
        modeloDao.update(modelo);
        mv.setViewName("formularioModelo");
        return mv;
    }

    

    @RequestMapping("consultaCodigoModelo.htm")
    public void consultaCodigoModelo(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String codigoModelo = (request.getParameter("codigo").toUpperCase());
        System.out.println("Codigo -> " + codigoModelo);
        List<Modelo> listaModelos = modeloDao.listadoPorCampoExacto("codigo", codigoModelo);
        System.out.println("Listado" + listaModelos);
        if (listaModelos.isEmpty()) {
            //Modelo m = new Modelo(codigoModelo);
            //Fabricante f = new Fabricante();
            //m.setFabricante(f);
            //listaModelos.add(m);
            out.println();
        } else {
            Collections.sort(listaModelos);
        }
        Gson gson = new Gson();
        String lista = gson.toJson(listaModelos);
        System.out.println("Lista Respuesta " + lista);
        out.println(lista);
    }

    @RequestMapping("listaModelos.htm")
    public void listaModelos(HttpServletRequest request, HttpServletResponse response, @ModelAttribute Modelo modelo, @RequestBody String jsonEntrada)
            throws IOException {
        Gson gson = new Gson();
        Modelo m = gson.fromJson(jsonEntrada, Modelo.class);
        System.out.println("Objeto recibido " + jsonEntrada);
        System.out.println("Objeto JAVA " + m.getCodigo() + " " + m.getDescripcion());
        List<Modelo> listaModelos;
        listaModelos = modeloDao.listadoPorCampo("codigo", m.getCodigo());
        //listaModelos = modeloDao.listAll();       
        Collections.sort(listaModelos);

        String lista = gson.toJson(listaModelos);
        System.out.println("Modelos JSON " + lista);
        response.setContentType("text/xml;charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.println(lista);
    }
}
