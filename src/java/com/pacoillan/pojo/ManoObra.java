/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pacoillan.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 *
 * @author Gustavo
 */
@Entity
@Table(name = "manoObra", catalog = "pacoillan2")
public class ManoObra implements java.io.Serializable, Comparable {

    private Integer idManoObra;
    private Categoria categoria;
    private String codigoManoObra;
    private String descripcionManoObra;
    private Float tiempoManoObra;
    private String infoManoObra;

    public ManoObra() {
    }

    public ManoObra(Categoria categoria, String codigoManoObra, String descripcionManoObra, Float tiempoManoObra, String infoManoObra) {
        this.categoria = categoria;
        this.codigoManoObra = codigoManoObra;
        this.descripcionManoObra = descripcionManoObra;
        this.tiempoManoObra = tiempoManoObra;
        this.infoManoObra = infoManoObra;
    }

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "idManoObra", unique = true, nullable = false)
    public Integer getIdManoObra() {
        return idManoObra;
    }

    public void setIdManoObra(Integer idManoObra) {
        this.idManoObra = idManoObra;
    }

    @OneToOne
    @JoinColumn(name = "idCategoria", nullable = false)
    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    @Column(name = "codigoManoObra", nullable = false, length = 20)
    public String getCodigoManoObra() {
        return codigoManoObra;
    }

    public void setCodigoManoObra(String codigoManoObra) {
        this.codigoManoObra = codigoManoObra;
    }

    @Column(name = "descripcionManoObra", nullable = false, length = 45)
    public String getDescripcionManoObra() {
        return descripcionManoObra;
    }

    public void setDescripcionManoObra(String descripcionManoObra) {
        this.descripcionManoObra = descripcionManoObra;
    }

    @Column(name = "tiempoManoObra", precision = 12, scale = 0)
    public Float getTiempoManoObra() {
        return tiempoManoObra;
    }

    public void setTiempoManoObra(Float tiempoManoObra) {
        this.tiempoManoObra = tiempoManoObra;
    }

    @Column(name = "infoManoObra", length = 2000)
    public String getInfoManoObra() {
        return infoManoObra;
    }

    public void setInfoManoObra(String infoManoObra) {
        this.infoManoObra = infoManoObra;
    }

    @Override
    public int compareTo(Object t) {
        ManoObra otraMO = (ManoObra) t;
        return codigoManoObra.compareTo(otraMO.getCodigoManoObra());
    }
}
