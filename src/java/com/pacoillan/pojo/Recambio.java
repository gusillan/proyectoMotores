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
    private String referenciaRecambio;
    private Fabricante fabricante;
    private String descripcionRecambio;
    private Float pvpRecambio;
    private Float dtoRecambio;
    private Float stockRecambio;
    private String ubicacionRecambio;
    private Categoria categoria;
    private String infoRecambio;
    private Integer sustitucion;
    private Integer equivalencia;
    
    
    
    public Recambio() {
    }
    
    public Recambio(String referenciaRecambio, Fabricante fabricante, String descripcionRecambio, Float pvpRecambio,
            Float dtoRecambio, Float stockRecambio, String ubicacionRecambio, Categoria categoria, String infoRecambio,
            Integer sustitucion,Integer equivalencia) {
        this.referenciaRecambio = referenciaRecambio;
        this.fabricante = fabricante;
        this.descripcionRecambio = descripcionRecambio;
        this.pvpRecambio = pvpRecambio;
        this.dtoRecambio = dtoRecambio;
        this.stockRecambio = stockRecambio;
        this.ubicacionRecambio= ubicacionRecambio;
        this.categoria = categoria;
        this.infoRecambio = infoRecambio;
        this.sustitucion = sustitucion;
        this.equivalencia = equivalencia;
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

    @Column(name = "referenciaRecambio", nullable = false, length = 25)
    public String getReferenciaRecambio() {
        return this.referenciaRecambio;
    }

    public void setReferenciaRecambio(String referenciaRecambio) {
        this.referenciaRecambio = referenciaRecambio;
    }

    @OneToOne
    @JoinColumn(name = "id_fabricante", nullable = false)
    public Fabricante getFabricante() {
        return this.fabricante;
    }

    public void setFabricante(Fabricante fabricante) {
        this.fabricante = fabricante;
    }

    @Column(name = "descripcionRecambio", nullable = false, length = 35)
    public String getDescripcionRecambio() {
        return this.descripcionRecambio;
    }

    public void setDescripcionRecambio(String descripcionRecambio) {
        this.descripcionRecambio = descripcionRecambio;
    }
   
    @Column(name = "pvpRecambio", precision = 12, scale = 0)
    public Float getPvpRecambio() {
        return this.pvpRecambio;
    }

    public void setPvpRecambio(Float pvpRecambio) {
        this.pvpRecambio = pvpRecambio;
    }
    
    @Column(name = "dtoRecambio", precision = 12, scale = 0)
    public Float getDtoRecambio() {
        return this.dtoRecambio;
    }

    public void setDtoRecambio(Float dtoRecambio) {
        this.dtoRecambio = dtoRecambio;
    }
    
    @Column(name = "stockRecambio", precision = 12, scale = 0)
    public Float getStockRecambio() {
        return this.stockRecambio;
    }

    public void setStockRecambio(Float stockRecambio) {
        this.stockRecambio = stockRecambio;
    }
    @Column(name = "ubicacionRecambio", nullable = false, length = 15)
    public String getUbicacionRecambio() {
        return this.ubicacionRecambio;
    }

    public void setUbicacionRecambio(String ubicacionRecambio) {
        this.ubicacionRecambio = ubicacionRecambio;
    }
    
    @OneToOne
    @JoinColumn(name = "idCategoria", nullable = false)
    public Categoria getCategoria() {
        return this.categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

     @Column(name = "infoRecambio", length = 2000)
    public String getInfoRecambio() {
        return infoRecambio;
    }

    public void setInfoRecambio(String infoRecambio) {
        this.infoRecambio = infoRecambio;
    }
    
    @Column(name = "sustitucion")
    public Integer getSustitucion() {
        return this.sustitucion;
    }

    public void setSustitucion(Integer sustitucion) {
        this.sustitucion = sustitucion;
    }
    
    @Column(name = "equivalencia")
    public Integer getEquivalencia() {
        return this.equivalencia;
    }

    public void setEquivalencia(Integer equivalencia) {
        this.equivalencia = equivalencia;
    }
        
    @Override
    public int compareTo(Object t) {
        Recambio otroRecambio = (Recambio) t;
        return referenciaRecambio.compareTo(otroRecambio.getReferenciaRecambio());
    }
    
    
}
