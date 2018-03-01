/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pacoillan.controller;

import com.google.gson.Gson;
import com.pacoillan.DAO.CategoriaDAO;
import com.pacoillan.DAO.FabricanteDAO;
import com.pacoillan.DAO.RecambioDAO;
import com.pacoillan.DAO.SustitucionDAO;
import com.pacoillan.pojo.Categoria;
import com.pacoillan.pojo.Fabricante;
import com.pacoillan.pojo.Recambio;
import com.pacoillan.pojo.Sustitucion;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
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
    CategoriaDAO categoriaDao;
    @Autowired
    SustitucionDAO sustitucionDao;

    @RequestMapping("guardaRecambio.htm")
    public void guardaRecambio(Recambio recambio, HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Referencia " + request.getParameter("referencia"));
        System.out.println("Codigo Marca " + request.getParameter("codigoMarca"));
        System.out.println("Categoria " + request.getParameter("codigoCategoria"));
        System.out.println("Precio " + request.getParameter("pvp") + " descuento " + request.getParameter("descuento"));
        List fabricantes = fabricanteDao.listadoPorCampoExacto("codigo", request.getParameter("codigoMarca"));
        Fabricante fabricante = (Fabricante) fabricantes.get(0);
        List categorias = categoriaDao.listadoPorCampoExacto("codigo", request.getParameter("codigoCategoria"));
        Categoria categoria = (Categoria) categorias.get(0);
        recambio.setFabricante(fabricante);
        recambio.setCategoria(categoria);
        recambioDao.create(recambio);

    }

    @RequestMapping("bajaRecambio.htm")
    public void bajaRecambio(Recambio recambio, HttpServletRequest request, HttpServletResponse response) {

        System.out.println("Recambio " + recambio.getDescripcion());
        List fabricantes = fabricanteDao.listadoPorCampoExacto("codigo", request.getParameter("codigoMarca"));
        Fabricante fabricante = (Fabricante) fabricantes.get(0);
        recambio.setFabricante(fabricante);
        List categorias = categoriaDao.listadoPorCampoExacto("codigo", request.getParameter("codigoCategoria"));
        Categoria categoria = (Categoria) categorias.get(0);
        recambio.setCategoria(categoria);
        recambioDao.delete(recambio);
    }

    @RequestMapping("consultaReferencia.htm")
    public void consultaReferencia(HttpServletRequest request, HttpServletResponse response) throws IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String referencia = (request.getParameter("referencia").toUpperCase());
        System.out.println("Referencia -> " + referencia);

        Gson gson = new Gson();
        String lista = null;

        Recambio recambioFinal;
        List<Recambio> listaFinal = new ArrayList();

        List<Recambio> listaRecambios = recambioDao.listadoPorCampoExacto("referencia", referencia);
        if (listaRecambios.isEmpty()) {
            System.out.println("Lista recambios vacia "+listaRecambios);
            //out.println(lista);
            lista = gson.toJson(listaRecambios);
        } else if (listaRecambios.size() > 1) {
            System.out.println("varios recambios con la misma referencia");
            lista = gson.toJson(listaRecambios); // + ",[{ 'varios' : 'true' }]";              
        } else {
            recambioFinal = listaRecambios.get(0);
            listaFinal.add(recambioFinal);
            List<Sustitucion> listaSustitucion;
            do {
                //Retorna una lista de sustituciones no de recambios
                listaSustitucion = getSustitucion(recambioFinal);
                if (!listaSustitucion.isEmpty()) {
                    Sustitucion sustitucion = listaSustitucion.get(0);
                    recambioFinal = sustitucion.getRecambioA();
                    listaFinal.add(recambioFinal); // Va añadiendo las sustituciones
                }
            } while (!listaSustitucion.isEmpty());
            System.out.println("Recambio final " + recambioFinal.getReferencia());
            lista = gson.toJson(listaFinal);
            //listaFinal.add(recambioFinal);
            //Collections.sort(recambioFinal);
        }

        System.out.println("Lista Respuesta " + lista);
        out.println(lista);
    }

    private List getSustitucion(Recambio recambio) {
        String sust = "FROM Sustitucion WHERE idRecambioB='" + recambio.getIdRecambio() + "' AND tipoSustitucion='1'";
        List<Sustitucion> sustituciones = sustitucionDao.listadoConfigurable(sust);
        return sustituciones;
    }
    
     @RequestMapping("consultaPorDescripcionRecambio.htm")
    public void consultaPorDescripcionRecambio(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        System.out.println("Descripcion " + request.getParameter("descripcion"));
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String descripcionRecambio = (request.getParameter("descripcion").toUpperCase());
        List<Recambio> listaRecambios = recambioDao.listadoPorCampo("descripcion", descripcionRecambio);
        System.out.println("Listado" + listaRecambios);
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
    
}

