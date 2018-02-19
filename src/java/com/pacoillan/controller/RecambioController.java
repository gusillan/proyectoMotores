/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pacoillan.controller;

import com.google.gson.Gson;
import com.pacoillan.DAO.CategoriaRecambioDAO;
import com.pacoillan.DAO.FabricanteDAO;
import com.pacoillan.DAO.RecambioDAO;
import com.pacoillan.DAO.SustitucionDAO;
import com.pacoillan.pojo.CategoriaRecambio;
import com.pacoillan.pojo.Fabricante;
import com.pacoillan.pojo.Recambio;
import com.pacoillan.pojo.Sustitucion;
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
        CategoriaRecambio categoria = (CategoriaRecambio) categorias.get(0);
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
        CategoriaRecambio categoria = (CategoriaRecambio) categorias.get(0);
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

        Recambio recambioFinal;

        List<Recambio> listaRecambios = recambioDao.listadoPorCampoExacto("referencia", referencia);
        if (listaRecambios.isEmpty()) {
            out.println();
        } else {

            recambioFinal = listaRecambios.get(0);
            List<Sustitucion> listaSustitucion;
            do{ 
                //Retorna una lista de sustituciones no de recambios
                listaSustitucion = getSustitucion(recambioFinal);
                if(! listaSustitucion.isEmpty()){
                    Sustitucion sustitucion = listaSustitucion.get(0);
                    recambioFinal = sustitucion.getRecambioA();
                }
            }while(! listaSustitucion.isEmpty());
            
            System.out.println("Recambio final "+recambioFinal.getReferencia() );


                /*
                 for (Recambio recambio : listaRecambios){
                 System.out.println("Recambio "+recambio.getDescripcion());
                 String equivalencia1 = "FROM Sustitucion WHERE idRecambioA='"+recambio.getIdRecambio()+"' AND tipoSustitucion='2'";
                 List<Sustitucion> equivalencias1 = sustitucionDao.listadoConfigurable(equivalencia1);
                 for (Sustitucion sustitucion : equivalencias1){
                 System.out.println("Equivalencia "+sustitucion.getRecambioB().getReferencia());
                 };
                 String equivalencia2 = "FROM Sustitucion WHERE idRecambioB='"+recambio.getIdRecambio()+"' AND tipoSustitucion='2'";
                 List<Sustitucion> equivalencias2 = sustitucionDao.listadoConfigurable(equivalencia2);
                 for (Sustitucion sustitucion : equivalencias2){
                 System.out.println("Equivalencia "+sustitucion.getRecambioA().getReferencia());
                 };
                
                 String sust = "FROM Sustitucion WHERE idRecambioB='"+recambio.getIdRecambio()+"' AND tipoSustitucion='1'";
                 List<Sustitucion> sustituciones = sustitucionDao.listadoConfigurable(sust);
                 for (Sustitucion sustitucion : sustituciones){
                 System.out.println("Sustituciones "+sustitucion.getRecambioA().getReferencia());
                 }
                 }
             */
                 Collections.sort(listaRecambios);
            }
            Gson gson = new Gson();
            String lista = gson.toJson(listaRecambios);
            System.out.println("Lista Respuesta " + lista);
            out.println(lista);
        } 
        private List getSustitucion (Recambio recambio){
            String sust = "FROM Sustitucion WHERE idRecambioB='" + recambio.getIdRecambio()+ "' AND tipoSustitucion='1'";
            List<Sustitucion> sustituciones = sustitucionDao.listadoConfigurable(sust);
            return sustituciones;
        }
        
    }
    
}
