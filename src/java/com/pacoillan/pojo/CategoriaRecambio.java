package com.pacoillan.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "categoriaRecambio", catalog = "pacoillan2")
public class CategoriaRecambio implements java.io.Serializable {

    private Integer idCategoria;
    private String codigo;
    private String categoria;

    public CategoriaRecambio() {
    }

    public CategoriaRecambio(String codigo, String categoria) {
        this.codigo = codigo;
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
}
