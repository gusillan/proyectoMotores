
package com.pacoillan.controller;


import com.google.gson.Gson;
import com.pacoillan.DAO.CategoriaDAO;
import com.pacoillan.DAO.FabricanteDAO;
import com.pacoillan.pojo.Categoria;
import com.pacoillan.pojo.Fabricante;
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
    
    @RequestMapping("guardaManoObra.htm")
    public void guardaManoObra(HttpServletRequest request, HttpServletResponse response) throws IOException {
        System.out.println("ESTAMOS EN GUARDAR MANO DE OBRA !!!!");
        String codigoMO;
        String tipoMO = request.getParameter("tipoMO");
        if (tipoMO.equals("1")){
            codigoMO = request.getParameter("codigoMO1");
        }else{
            codigoMO = request.getParameter("codigoMO2");
        }
        System.out.println("Codigo MO pricipal "+codigoMO);
        
        
        
        String categoriaMO = request.getParameter("categoriaMO");
        List<Categoria> listaCat = categoriaDao.listadoPorCampoExacto("codigo", categoriaMO);
        Categoria cat = listaCat.get(0);
        System.out.println("Categoria "+cat.getIdCategoria()+" "+cat.getCodigo()+" "+cat.getCategoria());
    }

    /*@RequestMapping("consultaFabricante.htm")
    public void consultaFabricante(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String codigoFabricante = request.getParameter("codigo");
        List<Fabricante> listaFabricantes = fabricanteDao.listadoPorCampoExacto("codigo", codigoFabricante);
        System.out.println(listaFabricantes);
        //if (listaFabricantes.isEmpty()) {
        //    out.println();
        //} else {
            Gson gson = new Gson();
            String lista = gson.toJson(listaFabricantes);
            System.out.println(lista);
            out.println(lista);
        //}
    }

    @RequestMapping("bajaFabricante.htm")
    public void bajaFabricante(Fabricante fabricante, HttpServletRequest request, HttpServletResponse response) {        
        try{
         fabricanteDao.delete(fabricante);
        }catch (Exception ex){            
            System.out.println("Excepcion al dar de baja el registro" +ex);
        }       
       
    }    */
}
