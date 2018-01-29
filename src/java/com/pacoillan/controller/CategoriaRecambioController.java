/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pacoillan.controller;

import com.google.gson.Gson;
import com.pacoillan.DAO.CategoriaRecambioDAO;
import com.pacoillan.pojo.CategoriaRecambio;
import java.io.IOException;
import java.io.PrintWriter;
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
public class CategoriaRecambioController {

    @Autowired
    CategoriaRecambioDAO categoriaRecambioDao;

    @RequestMapping("guardaCategoriaRecambio.htm")
    public void guardaCategoriaRecambio(CategoriaRecambio categoria, HttpServletRequest request, HttpServletResponse response) {

        categoriaRecambioDao.update(categoria);
    }

    @RequestMapping("consultaCategoriaRecambio.htm")
    public void consultaCategoriaRecambio(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String codigo = request.getParameter("codigo");
        List<CategoriaRecambio> listaCategorias = categoriaRecambioDao.listadoPorCampoExacto("codigo", codigo);
        System.out.println(listaCategorias);

        Gson gson = new Gson();
        String lista = gson.toJson(listaCategorias);
        System.out.println(lista);
        out.println(lista);       
    }

    @RequestMapping("bajaCategoriaRecambio.htm")
    public void bajaCategoriaRecambio( CategoriaRecambio categoria, HttpServletRequest request, HttpServletResponse response) {
        try {
            categoriaRecambioDao.delete(categoria);
        } catch (Exception ex) {
            System.out.println("Excepcion al dar de baja el registro" + ex);            
        }

    }
}
