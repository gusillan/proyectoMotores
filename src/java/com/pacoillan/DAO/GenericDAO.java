package com.pacoillan.DAO;

import java.io.Serializable;
import java.util.List;

public interface GenericDAO<T,Id extends Serializable> {

    public T create (T objeto);    
    public T read (Id id);
    public T update (T objeto);
    public void delete (T objeto);
    public List<T> listAll ();
    public List<T> listadoPorCampo(String campo, String dato);
    public List<T> listadoPorCampoExacto(String campo, String dato);
    public List<T> listadoPorDosCampos (String campo1,Integer valor1,String campo2,Integer valor2);
}