package com.pacoillan.DAOHibernate;

import com.pacoillan.DAO.GenericDAO;
import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.List;
import javax.persistence.PersistenceException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.transaction.annotation.Transactional;

//http://sobrejava.com/articulos/ejemplo-de-dao-generico-con-jpa
public abstract class GenericDAOHibernate<T, Id extends Serializable>
        implements GenericDAO<T, Id> {

    protected SessionFactory sessionFactory;
    private Session session;
    private Transaction tx;
    protected Class<T> domainClass = getDomainClass();

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    protected Class getDomainClass() {
        if (domainClass == null) {
            ParameterizedType thisType = (ParameterizedType) getClass().getGenericSuperclass();
            domainClass = (Class) thisType.getActualTypeArguments()[0];
        }
        return domainClass;
    }

    @Override
    public T create(T objeto) {
        session = sessionFactory.openSession();
        tx = session.beginTransaction();
        session.saveOrUpdate(objeto);
        tx.commit();
        session.close();
        return objeto;
    }

    @Override
    public T read(Id id) {
        session = sessionFactory.openSession();
        T objeto = (T) session.get(domainClass, id);
        session.close();
        return objeto;
    }

    @Override
    public T update(T objeto) {
        session = sessionFactory.openSession();
        tx = session.beginTransaction();
        session.saveOrUpdate(objeto);
        tx.commit();
        session.close();
        return objeto;
    }

    @Override
    public void delete(T objeto) {
        session = sessionFactory.openSession();
        try {
            tx = session.beginTransaction();
            session.delete(objeto);
            tx.commit();
        } catch (PersistenceException e) {
            tx.rollback();
            throw e;
        } finally {
            session.close();
        }
    }

    @Override
    public void deleteId(Id id) {
        session = sessionFactory.openSession();
        T objeto = (T) session.get(domainClass, id);
        try {
            tx = session.beginTransaction();
            session.delete(objeto);
            tx.commit();
        } catch (PersistenceException e) {
            tx.rollback();
            throw e;
        } finally {
            session.close();
        }
    }

    @Override
    public List<T> listAll() {
        String pojo = domainClass.getSimpleName();
        List lista;
        session = sessionFactory.openSession();
        String query = "FROM " + pojo;
        lista = session.createQuery(query).list();
        session.close();
        return lista;
    }

    @Override
    public List<T> listadoPorCampo(String campo, String dato) {
        String pojo = domainClass.getSimpleName();
        List lista;
        session = sessionFactory.openSession();
        String query = "FROM " + pojo + " as e WHERE e." + campo + " LIKE '%" + dato + "%'";
        lista = session.createQuery(query).list();
        session.close();
        return lista;
    }

    @Override
    @Transactional
    public List<T> listadoPorCampoExacto(String campo, String dato) {
        String pojo = domainClass.getSimpleName();
        List lista;
        session = sessionFactory.openSession();
        String query = "FROM " + pojo + " as e WHERE e." + campo + " LIKE '" + dato + "'";
        lista = session.createQuery(query).list();
        //session.close(); Daba error ( no sé por qué)??
        return lista;
    }

    @Override
    @Transactional
    public List<T> listadoConfigurable(String query) {
        List lista;
        session = sessionFactory.openSession();
        lista = session.createQuery(query).list();
        //session.close(); Daba error ( no sé por qué)??
        return lista;


    }
}
