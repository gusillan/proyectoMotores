
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pacoillan.DAOHibernate;

import com.pacoillan.DAO.ModeloRecambioDAO;
import com.pacoillan.pojo.ModeloRecambio;
import java.util.List;
import org.hibernate.Session;

/**
 *
 * @author Gustabo
 */
public class ModeloRecambioDAOHibernate extends GenericDAOHibernate<ModeloRecambio,Integer> implements ModeloRecambioDAO{
    
    public List<ModeloRecambio> listadoPorModeloMotor(Integer modelo, Integer motor) {
        List lista;
        Session session = sessionFactory.openSession();
        String query = "FROM  modeloRecambio  WHERE (idModelo = '"+modelo+"') AND (idMotor = '"+motor+"')";
        lista = session.createQuery(query).list();
        session.close();
        return lista;
    }
    
}
