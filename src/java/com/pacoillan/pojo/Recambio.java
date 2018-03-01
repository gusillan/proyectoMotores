/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pacoillan.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

/**
 *
 * @author Gustavo
 */

@Entity
@Table(name = "recambio", catalog = "pacoillan2")
public class Recambio implements java.io.Serializable, Comparable {

    private Integer idRecambio;
    private String referencia;
    private Fabricante fabricante;
    private String descripcion;
    private Float pvp;
    private Float descuento;
    private Float stock;
    private String ubicacion;
    private Categoria categoria;
    private String informacion;
    
    
    public Recambio() {
    }
    
    public Recambio(String referencia, Fabricante fabricante, String descripcion, Float pvp, Float descuento, Float stock, String ubicacion, Categoria categoria, String informacion) {
        this.referencia = referencia;
        this.fabricante = fabricante;
        this.descripcion = descripcion;
        this.pvp = pvp;
        this.descuento = descuento;
        this.stock = stock;
        this.ubicacion = ubicacion;
        this.categoria = categoria;
        this.informacion = informacion;
    }    

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "idRecambio", unique = true, nullable = false)
    public Integer getIdRecambio() {
        return this.idRecambio;
    }

    public void setIdRecambio(Integer idRecambio) {
        this.idRecambio = idRecambio;
    }

    @Column(name = "referencia", nullable = false, length = 25)
    public String getReferencia() {
        return this.referencia;
    }

    public void setReferencia(String referencia) {
        this.referencia = referencia;
    }

    @OneToOne
    @JoinColumn(name = "id_fabricante", nullable = false)
    public Fabricante getFabricante() {
        return this.fabricante;
    }

    public void setFabricante(Fabricante fabricante) {
        this.fabricante = fabricante;
    }

    @Column(name = "descripcion", nullable = false, length = 35)
    public String getDescripcion() {
        return this.descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
   
    @Column(name = "pvp", precision = 12, scale = 0)
    public Float getPvp() {
        return this.pvp;
    }

    public void setPvp(Float pvp) {
        this.pvp = pvp;
    }
    
    @Column(name = "descuento", precision = 12, scale = 0)
    public Float getDescuento() {
        return this.descuento;
    }

    public void setDescuento(Float descuento) {
        this.descuento = descuento;
    }
    
    @Column(name = "stock", precision = 12, scale = 0)
    public Float getStock() {
        return this.stock;
    }

    public void setStock(Float stock) {
        this.stock = stock;
    }
    @Column(name = "ubicacion", nullable = false, length = 15)
    public String getUbicacion() {
        return this.ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }
    
    @OneToOne
    @JoinColumn(name = "idCategoria", nullable = false)
    public Categoria getCategoria() {
        return this.categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

     @Column(name = "informacion", length = 2000)
    public String getInformacion() {
        return informacion;
    }

    public void setInformacion(String informacion) {
        this.informacion = informacion;
    }
    
    @Override
    public int compareTo(Object t) {
        Recambio otroRecambio = (Recambio) t;
        return referencia.compareTo(otroRecambio.getReferencia());
    }
    
    
}
