/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pacoillan.servicios;

import com.google.gson.Gson;
import java.util.List;

/**
 *
 * @author Gustabo
 */
public class Servicio {
    
    public String getJson(List lista){
        Gson gson = new Gson();        
        String listaJson = gson.toJson(lista);        
        return listaJson;
    }
    
}
