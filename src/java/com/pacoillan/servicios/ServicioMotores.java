/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pacoillan.servicios;

import com.google.gson.Gson;
import com.pacoillan.pojo.Motor;
import java.io.PrintWriter;
import java.util.List;

/**
 *
 * @author Gustabo
 */
public class ServicioMotores {

    private List<Motor> listaMotores;

    public void setLista(List<Motor> listaMotores) {
        this.listaMotores = listaMotores;
    }

    public StringBuilder getXml() {
        //getJson();
        
        StringBuilder tXML = new StringBuilder("<?xml version='1.0'?>");
        if (listaMotores.isEmpty()) {
            tXML.append("<datos>");
            tXML.append("</datos>");
        }
        if (listaMotores.size() == 1) {
            Motor m = listaMotores.get(0);
            tXML.append("<datos>");
            tXML.append("<idMotor>");
            tXML.append(m.getIdMotor());
            tXML.append("</idMotor>");
            tXML.append("<codigoMotor>");
            tXML.append(m.getCodigo());
            tXML.append("</codigoMotor>");
            tXML.append("<descripcionMotor>");
            tXML.append(m.getDescripcion());
            tXML.append("</descripcionMotor>");
            tXML.append("<combustibleMotor>");
            tXML.append(m.getCombustible());
            tXML.append("</combustibleMotor>");
            tXML.append("<cilindradaMotor>");
            tXML.append(m.getCilindrada());
            tXML.append("</cilindradaMotor>");
            tXML.append("<kwMotor>");
            tXML.append(m.getKw());
            tXML.append("</kwMotor>");
            tXML.append("<marcaMotor>");
            tXML.append(m.getFabricante());
            tXML.append("</marcaMotor>");
            tXML.append("</datos>");
        }
        if (listaMotores.size() > 1) {
            tXML.append("<datos>");
            for (Motor m : listaMotores) {                
                tXML.append("<idMotor>");
                tXML.append(m.getIdMotor());
                tXML.append("</idMotor>");
                tXML.append("<codigoMotor>");
                tXML.append(m.getCodigo());
                tXML.append("</codigoMotor>");
                tXML.append("<descripcionMotor>");
                tXML.append(m.getDescripcion());
                tXML.append("</descripcionMotor>");
                tXML.append("<combustibleMotor>");
                tXML.append(m.getCombustible());
                tXML.append("</combustibleMotor>");
                tXML.append("<cilindradaMotor>");
                tXML.append(m.getCilindrada());
                tXML.append("</cilindradaMotor>");
                tXML.append("<kwMotor>");
                tXML.append(m.getKw());
                tXML.append("</kwMotor>");
                tXML.append("<marcaMotor>");
                tXML.append(m.getFabricante());
                tXML.append("</marcaMotor>");
            }
            tXML.append("</datos>");
        }
        return tXML;
    }
    public void getJson(){
        Gson gson = new Gson();
        System.out.println("Formato JSON : "+gson.toJson(listaMotores));
    }
}
