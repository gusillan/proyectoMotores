package com.pacoillan.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "categoria", catalog = "pacoillan2")
public class Categoria implements java.io.Serializable {

    private Integer idCategoria;
    private String codigoCategoria;
    private String categoria;
   
    public Categoria() {
    }

    public Categoria(String codigoCategoria, String categoria) {
        this.codigoCategoria = codigoCategoria;
        this.categoria = categoria;
        
    }

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "idCategoria", unique = true, nullable = false)
    public Integer getIdCategoria() {
        return this.idCategoria;
    }

    public void setIdCategoria(Integer idCategoria) {
        this.idCategoria = idCategoria;
    }

    @Column(name = "codigoCategoria", nullable = false, length = 5)
    public String getCodigoCategoria() {
        return this.codigoCategoria;
    }

    public void setCodigoCategoria(String codigoCategoria) {
        this.codigoCategoria = codigoCategoria;
    }

    @Column(name = "categoria", nullable = false, length = 30)
    public String getCategoria() {
        return this.categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }
      
    
}
