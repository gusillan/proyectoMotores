/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pacoillan.controller;

import com.google.gson.Gson;
import com.pacoillan.DAO.CategoriaDAO;
import com.pacoillan.pojo.Categoria;
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
public class CategoriaController {

    @Autowired
    CategoriaDAO categoriaDao;

    @RequestMapping("guardaCategoria.htm")
    public void guardaCategoria(Categoria categoria, HttpServletRequest request, HttpServletResponse response) {

        categoriaDao.update(categoria);
    }

    @RequestMapping("consultaCategoria.htm")
    public void consultaCategoria(HttpServletRequest request, HttpServletResponse response) throws IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        String codigo = request.getParameter("parametro");
        List<Categoria> listaCategorias = categoriaDao.listadoPorCampoExacto("codigoCategoria", codigo);
        System.out.println(listaCategorias);

        Gson gson = new Gson();
        String lista = gson.toJson(listaCategorias);
        System.out.println(lista);
        out.println(lista);
    }

    @RequestMapping("bajaCategoria.htm")
    public void bajaCategoria(Categoria categoria, HttpServletRequest request, HttpServletResponse response) {
        try {
            categoriaDao.delete(categoria);
        } catch (Exception ex) {
            System.out.println("Excepcion al dar de baja el registro" + ex);
        }

    }

    @RequestMapping("listadoCategoriaRecambio.htm")
    public void listadoCategoriaRecambio(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        List<Categoria> listaCategorias = categoriaDao.listAll();

        Gson gson = new Gson();
        String lista = gson.toJson(listaCategorias);
        System.out.println(lista);
        out.println(lista);
    }
}
