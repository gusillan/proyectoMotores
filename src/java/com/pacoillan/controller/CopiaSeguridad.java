/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pacoillan.controller;

import com.google.gson.Gson;
import com.pacoillan.pojo.Recambio;
import com.pacoillan.pojo.Sustitucion;
import java.io.PrintWriter;
import java.util.Collections;
import java.util.List;

/**
 *
 * @author Gustavo
 */
public class CopiaSeguridad {
    
}
response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String referencia = (request.getParameter("referencia").toUpperCase());
        System.out.println("Referencia -> " + referencia);



        List<Recambio> listaRecambios = recambioDao.listadoPorCampoExacto("referencia", referencia);
        if (listaRecambios.isEmpty()) {
            out.println();
        } else {

            Recambio r =comprobarSustitucion(listaRecambios.get(0));
            System.out.println("El recambio final es " + r.getReferencia());
            /* Integer recambio;
            
             String sust = "FROM Sustitucion WHERE idRecambioB='" + recambio.getIdRecambio() + "' AND tipoSustitucion='1'";
             List<Sustitucion> sustituciones = sustitucionDao.listadoConfigurable(sust);
             for (Sustitucion sustitucion : sustituciones) {
             System.out.println("Sustituciones " + sustitucion.getRecambioA().getReferencia());


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

    /*public Recambio comprobarSustitucion(Recambio recambioInicial) {
        Recambio recambioFinal = null;
        Boolean haymas = true;
        for (;haymas = true;) {
            System.out.println("Vamos a comprobar el Recambio " + recambioInicial.getReferencia());
            String sust = "FROM Sustitucion WHERE idRecambioB='" + recambioInicial.getIdRecambio() + "' AND tipoSustitucion='1'";
            List<Sustitucion> sustituciones = sustitucionDao.listadoConfigurable(sust);
            if (sustituciones.isEmpty()) {
                recambioFinal = recambioInicial;
                haymas = false;
            } else {
                recambioInicial = sustituciones.get(0).getRecambioA();
                haymas = true;
            }
        }
        return recambioFinal;


    }*/

    
    private Recambio comprobarSustitucion (Recambio recambioInicial){
        
        return consultaRef(recambioInicial);
        
        
    }
    private Recambio consultaRef (Recambio recambio){
        
        Recambio recambioSustituto= new Recambio();
        String consulta = "FROM Sustitucion WHERE idRecambioB='" + recambio.getIdRecambio() + "' AND tipoSustitucion='1'";
        List<Sustitucion> sustituciones = sustitucionDao.listadoConfigurable(consulta);
        if (!sustituciones.isEmpty()){
            recambioSustituto = sustituciones.get(0).getRecambioA();
            return recambioSustituto;
        }   
        return recambioSustituto;
    }