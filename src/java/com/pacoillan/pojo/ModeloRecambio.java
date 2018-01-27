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
@Table(name = "modeloRecambio", catalog = "pacoillan2")
public class ModeloRecambio implements java.io.Serializable {

    private Integer idModeloRecambio;
    private Modelo modelo;
    private Motor motor;
    private Recambio recambio;

    public ModeloRecambio() {
    }

    public ModeloRecambio(Modelo modelo, Motor motor, Recambio recambio) {
        this.modelo = modelo;
        this.motor = motor;
        this.recambio = recambio;
    }

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "idModeloRecambio", unique = true, nullable = false)
    public Integer getIdModeloRecambio() {
        return idModeloRecambio;
    }

    public void setIdModeloRecambio(Integer idModeloRecambio) {
        this.idModeloRecambio = idModeloRecambio;
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

    @OneToOne
    @JoinColumn(name = "idRecambio", nullable = false)
    public Recambio getRecambio() {
        return recambio;
    }

    public void setRecambio(Recambio recambio) {
        this.recambio = recambio;
    }
    
}
