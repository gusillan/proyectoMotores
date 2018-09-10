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
    private String codigo;
    private String descripcion;
    private Modelo modelo;
    private Motor motor;
    private Float tiempo;
    private String infoDescripcion;

    public ManoObra() {
    }

    public ManoObra(Categoria categoria, String codigo, String descripcion, Modelo modelo, Motor motor, Float tiempo, String infoDescripcion) {
        this.categoria = categoria;
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.modelo = modelo;
        this.motor = motor;
        this.tiempo = tiempo;
        this.infoDescripcion = infoDescripcion;
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

    @Column(name = "codigo", nullable = false, length = 20)
    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    @Column(name = "descripcion", nullable = false, length = 45)
    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    @OneToOne
    @JoinColumn(name = "idModelo", nullable = false)
    public Modelo getModelo() {
        return modelo;
    }

    public void setModelo(Modelo modelo) {
        this.modelo = modelo;
    }

    @OneToOne
    @JoinColumn(name = "idMotor", nullable = false)
    public Motor getMotor() {
        return motor;
    }

    public void setMotor(Motor motor) {
        this.motor = motor;
    }

    @Column(name = "tiempo", precision = 12, scale = 0)
    public Float getTiempo() {
        return tiempo;
    }

    public void setTiempo(Float tiempo) {
        this.tiempo = tiempo;
    }

    @Column(name = "infoDescripcion", length = 2000)
    public String getInfoDescripcion() {
        return infoDescripcion;
    }

    public void setInfoDescripcion(String infoDescripcion) {
        this.infoDescripcion = infoDescripcion;
    }

    @Override
    public int compareTo(Object t) {
        ManoObra otraMO = (ManoObra) t;
        return codigo.compareTo(otraMO.getCodigo());
    }
}
