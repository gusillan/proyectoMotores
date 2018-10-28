
package com.pacoillan.controller;


import com.google.gson.Gson;
import com.pacoillan.DAO.CategoriaDAO;
import com.pacoillan.DAO.ManoObraDAO;
import com.pacoillan.pojo.Categoria;
import com.pacoillan.pojo.ManoObra;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collections;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class ManoObraController {

   
    @Autowired
    CategoriaDAO categoriaDao;
    @Autowired
    ManoObraDAO  manoObraDao;
    
    @RequestMapping("guardaManoObra.htm")
    public void guardaManoObra(ManoObra manoObra,HttpServletRequest request, HttpServletResponse response) throws IOException {
        System.out.println("ESTAMOS EN GUARDAR MANO DE OBRA !!!!");
        System.out.println("Codigo "+manoObra.getCodigoManoObra());
                
        String codigoRecambio = request.getParameter("codigoCategoria");
        System.out.println("Codigo Recambio "+codigoRecambio);
        List<Categoria> listaCat = categoriaDao.listadoPorCampoExacto("idCategoria", codigoRecambio);
        Categoria cat = listaCat.get(0);       
        System.out.println("Categoria de Recambio "+cat.getIdCategoria()+" "+cat.getCodigoCategoria()+" "+cat.getCategoria());
        manoObra.setCategoria(cat);      
        manoObraDao.update(manoObra);
    }    
    
    @RequestMapping("bajaManoObra.htm")
    public void bajaManoObra (ManoObra manoObra, HttpServletRequest request, HttpServletResponse response) {

        List<Categoria> listaCat = categoriaDao.listadoPorCampoExacto("idCategoria", request.getParameter("codigoCategoria"));
        Categoria cat = listaCat.get(0);
        manoObra.setCategoria(cat);
        manoObraDao.delete(manoObra);
    }
    
    @RequestMapping("consultaManoObra.htm")
    public void consultaManoObra(HttpServletRequest request, HttpServletResponse response)throws IOException{
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        
        String codigoManoObra = (request.getParameter("parametro").toUpperCase());
        System.out.println("Vamos a consultar la MO "+ codigoManoObra); //Borrar
        List<ManoObra> listaManoObra = manoObraDao.listadoPorCampoExacto("codigoManoObra", codigoManoObra);
        if (listaManoObra.isEmpty()) {
            System.out.println("No hay coincidencia"); // Borrar
            out.println();
        } else { 
            Collections.sort(listaManoObra);
        }
        Gson gson = new Gson();
        String lista = gson.toJson(listaManoObra);
        System.out.println("Lista Respuesta " + lista);  // Borrar
        out.println(lista);       
    }
}
