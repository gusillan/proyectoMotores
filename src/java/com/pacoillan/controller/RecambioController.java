/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pacoillan.controller;

import com.google.gson.Gson;
import com.pacoillan.DAO.CategoriaRecambioDAO;
import com.pacoillan.DAO.FabricanteDAO;
import com.pacoillan.DAO.RecambioDAO;
import com.pacoillan.pojo.CategoriaRecambio;
import com.pacoillan.pojo.Fabricante;
import com.pacoillan.pojo.Recambio;
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
public class RecambioController {

    
    @Autowired
    RecambioDAO recambioDao;
    @Autowired
    FabricanteDAO fabricanteDao;
    @Autowired
    CategoriaRecambioDAO categoriaDao;

    
    @RequestMapping("guardaRecambio.htm")
    public void guardaRecambio(Recambio recambio,HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Referencia "+request.getParameter("referencia"));
        System.out.println("Codigo Marca "+request.getParameter("codigoMarca"));
        System.out.println("Categoria "+request.getParameter("codigoCategoria"));
        System.out.println("Precio "+request.getParameter("pvp")+" descuento "+request.getParameter("descuento"));
        List fabricantes = fabricanteDao.listadoPorCampoExacto("codigo", request.getParameter("codigoMarca"));
        Fabricante fabricante = (Fabricante) fabricantes.get(0);
        List categorias = categoriaDao.listadoPorCampoExacto("codigo", request.getParameter("codigoCategoria"));
        CategoriaRecambio categoria = (CategoriaRecambio) categorias.get(0);
        recambio.setFabricante(fabricante);
        recambio.setCategoria(categoria);
        recambioDao.create(recambio);

    }
    /*
    @RequestMapping("bajaMotor.htm")
    public void bajaMotor(Motor motor, HttpServletRequest request, HttpServletResponse response) {

        List fabricantes = fabricanteDao.listadoPorCampoExacto("codigo", request.getParameter("codigoMarca"));
        Fabricante fabricante = (Fabricante) fabricantes.get(0);
        motor.setFabricante(fabricante);
        motorDao.delete(motor);
    }
*/
   
    @RequestMapping("consultaReferencia.htm")
    public void consultaReferencia(HttpServletRequest request, HttpServletResponse response) throws IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String referencia = (request.getParameter("referencia").toUpperCase());
        System.out.println("Referencia -> " + referencia);
        List<Recambio> listaRecambios = recambioDao.listadoPorCampoExacto("referencia", referencia);
        if (listaRecambios.isEmpty()) {            
            out.println();
        } else {
            Collections.sort(listaRecambios);
        }
        Gson gson = new Gson();
        String lista = gson.toJson(listaRecambios);
        System.out.println("Lista Respuesta " + lista);
        out.println(lista);
    }

    /*
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
    */
    /*
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
    * */
}
