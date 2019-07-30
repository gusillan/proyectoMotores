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
    CategoriaDAO categoriaDao;
    @Autowired
    SustitucionDAO sustitucionDao;

    @RequestMapping("guardaRecambio.htm")
    public void guardaRecambio(Recambio recambio, HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Referencia " + request.getParameter("referenciaRecambio"));
        System.out.println("Codigo Marca " + request.getParameter("codigoFabricante"));
        System.out.println("Categoria " + request.getParameter("codigoCategoria"));
        System.out.println("Precio " + request.getParameter("pvpRecambio") + " descuento " + request.getParameter("dtoRecambio"));
        List fabricantes = fabricanteDao.listadoPorCampoExacto("codigoFabricante", request.getParameter("codigoFabricante"));
        Fabricante fabricante = (Fabricante) fabricantes.get(0);
        List categorias = categoriaDao.listadoPorCampoExacto("codigoCategoria", request.getParameter("codigoCategoria"));
        Categoria categoria = (Categoria) categorias.get(0);
        recambio.setFabricante(fabricante);
        recambio.setCategoria(categoria);
        recambioDao.create(recambio);

    }

    @RequestMapping("bajaRecambio.htm")
    public void bajaRecambio(Recambio recambio, HttpServletRequest request, HttpServletResponse response) {

        System.out.println("Recambio " + recambio.getDescripcionRecambio());
        List fabricantes = fabricanteDao.listadoPorCampoExacto("codigoFabricante", request.getParameter("codigoFabricante"));
        Fabricante fabricante = (Fabricante) fabricantes.get(0);
        recambio.setFabricante(fabricante);
        List categorias = categoriaDao.listadoPorCampoExacto("codigoCategoria", request.getParameter("codigoCategoria"));
        Categoria categoria = (Categoria) categorias.get(0);
        recambio.setCategoria(categoria);
        recambioDao.delete(recambio);
    }

    @RequestMapping("consultaReferencia.htm")
    public void consultaReferencia(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        String referencia = (request.getParameter("parametro").toUpperCase());
        System.out.println("Referencia -> " + referencia); // Borrar

        List<Recambio> listaRecambios = recambioDao.listadoPorCampoExacto("referenciaRecambio", referencia);
        if (listaRecambios.isEmpty()) {
            System.out.println("Lista recambios vacia " + listaRecambios);
            out.println();
        } else {
            Recambio recambioConsultado = listaRecambios.get(0);
            System.out.println("Sustituido por " + recambioConsultado.getSustitucion());

            while (recambioConsultado.getSustitucion() != null) {
                Integer idSustituto = recambioConsultado.getSustitucion();
                recambioConsultado = recambioDao.read(idSustituto);
                listaRecambios.clear();
                listaRecambios.add(recambioConsultado);
            }
            Collections.sort(listaRecambios);
        }
        Gson gson = new Gson();
        String lista = gson.toJson(listaRecambios);
        out.println(lista);
    }

    private Integer getSustituto(Recambio recambio) {
        return recambio.getSustitucion();
    }

    @RequestMapping("consultaReferenciaSinSustitucion.htm")
    public void consultaReferenciaSinSustitucion(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        String referencia = (request.getParameter("parametro").toUpperCase());
        System.out.println("Referencia -> " + referencia); // Borrar
        List<Recambio> listaRecambios = recambioDao.listadoPorCampoExacto("referenciaRecambio", referencia);
        if (listaRecambios.isEmpty()) {
            System.out.println("Lista recambios vacia " + listaRecambios);
            out.println();
        } else {
            Collections.sort(listaRecambios);
        }
        Gson gson = new Gson();
        String lista = gson.toJson(listaRecambios);
        out.println(lista);
    }

    @RequestMapping("consultaReferenciaFabricante.htm")
    public void consultaReferenciaFabricante(Recambio recambio, HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        String referenciaRecambio = recambio.getReferenciaRecambio();
        System.out.println("Ref Recambio " + referenciaRecambio);
        String idFabricante = (request.getParameter("idFabricante"));
        System.out.println("Codigo Fabricante " + idFabricante);

        //List fabricantes = fabricanteDao.listadoPorCampoExacto("codigoFabricante", codigoFabricante);
        //Fabricante fabricante = (Fabricante) fabricantes.get(0);


        System.out.println("Codigo Fabricante " + idFabricante);
        System.out.println("Referencia -> " + referenciaRecambio); // Borrar

        String query = "FROM Recambio WHERE referenciaRecambio='" + referenciaRecambio + "' AND fabricante.idFabricante='" + idFabricante + "'";

        List<Recambio> listaRecambios = recambioDao.listadoConfigurable(query);


        if (listaRecambios.isEmpty()) {
            System.out.println("Lista recambios vacia " + listaRecambios);
            out.println();
        } else {
            Collections.sort(listaRecambios);
        }
        Gson gson = new Gson();
        String lista = gson.toJson(listaRecambios);
        out.println(lista);
    }

    @RequestMapping("consultaPorDescripcionRecambio.htm")
    public void consultaPorDescripcionRecambio(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        System.out.println("Descripcion " + request.getParameter("parametro"));
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String descripcionRecambio = (request.getParameter("parametro").toUpperCase());
        List<Recambio> listaRecambios = recambioDao.listadoPorCampo("descripcionRecambio", descripcionRecambio);
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

    @RequestMapping("consultaRecambioId.htm")
    public void consultaRecambioId(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        System.out.println("Consultar recambio Id " + request.getParameter("parametro")); // borrar
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        Integer idRecambio = Integer.parseInt(request.getParameter("parametro"));
        Recambio recambio = recambioDao.read(idRecambio);

        Gson gson = new Gson();
        String lista = gson.toJson(recambio);
        System.out.println("Lista Respuesta " + lista);
        out.println(lista);
    }

    @RequestMapping("buscaSustituciones.htm")
    public void buscaSustituciones(HttpServletRequest request, HttpServletResponse response) throws IOException {

        String sustitucion = request.getParameter("parametro");
        System.out.println("Sustituciones del id Recambio " + request.getParameter("parametro"));
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        List<Recambio> listaRecambios = recambioDao.listadoPorCampoExacto("sustitucion", sustitucion);
        Recambio recambio = listaRecambios.get(0);
        System.out.println("Recambio "+recambio.getReferenciaRecambio());


        PrintWriter out = response.getWriter();
    }

    @RequestMapping("buscaEquivalencias.htm")
    public void buscaEquivalencias(HttpServletRequest request, HttpServletResponse response) throws IOException {

        System.out.println("Equivalencias del id Recambio " + request.getParameter("parametro"));

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        Integer idRecambio = Integer.parseInt(request.getParameter("parametro"));
        Recambio recambio = recambioDao.read(idRecambio);
        System.out.println("Equivalencia recambio -* " + recambio.getEquivalencia());
        Integer equivalenciaRecambio = recambio.getEquivalencia();
        if (equivalenciaRecambio != null) {
            String eRecambio = Integer.toString(equivalenciaRecambio);
            System.out.println("consultamos los equivalencias a " + equivalenciaRecambio);

            List<Recambio> listaRecambios = recambioDao.listadoPorCampoExacto("equivalencia", eRecambio);
            if (listaRecambios.isEmpty()) {
                System.out.println("Lista recambios vacia " + listaRecambios);
                out.println();
            } else {
                Collections.sort(listaRecambios);
            }
            Gson gson = new Gson();
            String lista = gson.toJson(listaRecambios);
            out.println(lista);
        } else {
            out.println();
        }

    }
}
