
package com.pacoillan.controller;


import com.google.gson.Gson;
import com.pacoillan.DAO.CategoriaDAO;
import com.pacoillan.DAO.ManoObraDAO;
import com.pacoillan.pojo.Categoria;
import com.pacoillan.pojo.ManoObra;
import java.io.IOException;
import java.io.PrintWriter;
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
    
    @RequestMapping("consultaManoObra.htm")
    public void consultaManoObra(HttpServletRequest request, HttpServletResponse response)throws IOException{
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        
        String codigo = request.getParameter("parametro");
        System.out.println("Vamos a consultar la MO "+ codigo);
        List<ManoObra> listaManoObra = manoObraDao.listadoPorCampoExacto("codigo", codigo);
        if (listaManoObra.isEmpty()) {
            System.out.println("No hay coincidencia");
            out.println();
        } else {     
        ManoObra mo = listaManoObra.get(0);
        System.out.println("Mano de obra "+mo.getCodigo()+" "+mo.getDescripcion());
        Gson gson = new Gson();
        String lista = gson.toJson(listaManoObra);
        System.out.println("Lista Respuesta " + lista);
        out.println(lista);
        }
        
    }
    
    @RequestMapping("guardaManoObra.htm")
    public void guardaManoObra(ManoObra manoObra,HttpServletRequest request, HttpServletResponse response) throws IOException {
        System.out.println("ESTAMOS EN GUARDAR MANO DE OBRA !!!!");
        System.out.println("Codigo "+manoObra.getCodigo());
                
        String codigoRecambio = request.getParameter("codigoCategoria");
        System.out.println("Codigo Recambio "+codigoRecambio);
        List<Categoria> listaCat = categoriaDao.listadoPorCampoExacto("idCategoria", codigoRecambio);
        Categoria cat = listaCat.get(0);       
        System.out.println("Categoria de Recambio "+cat.getIdCategoria()+" "+cat.getCodigo()+" "+cat.getCategoria());
        manoObra.setCategoria(cat);      
        manoObraDao.update(manoObra);
    }

/*
    @RequestMapping("bajaFabricante.htm")
    public void bajaFabricante(Fabricante fabricante, HttpServletRequest request, HttpServletResponse response) {        
        try{
         fabricanteDao.delete(fabricante);
        }catch (Exception ex){            
            System.out.println("Excepcion al dar de baja el registro" +ex);
        }       
       
    }    */
}
