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
    private String codigo;
    private String categoria;
    private String tipo;

    public Categoria() {
    }

    public Categoria(String codigo, String categoria, String tipo) {
        this.codigo = codigo;
        this.categoria = categoria;
        this.tipo = tipo;
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

    @Column(name = "codigo", nullable = false, length = 5)
    public String getCodigo() {
        return this.codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    @Column(name = "categoria", nullable = false, length = 30)
    public String getCategoria() {
        return this.categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }
    
    @Column(name = "tipo", nullable = false, length = 5)
    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
    
    
}
