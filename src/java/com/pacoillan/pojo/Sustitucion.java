/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pacoillan.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 *
 * @author Gustavo
 */
@Entity
@Table(name = "sustituciones", catalog = "pacoillan2")
public class Sustitucion implements java.io.Serializable {

    private Integer idSustituciones;
    private Recambio recambioA;
    private Integer sustitucion;
    private Recambio recambioB;

    public Sustitucion() {
    }

    public Sustitucion(Recambio recambioA, Integer sustitucion, Recambio recambioB) {
        this.recambioA = recambioA;
        this.sustitucion = sustitucion;
        this.recambioB = recambioB;
    }

    /**
     *
     * @return
     */
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "idSustituciones", unique = true, nullable = false)
    public Integer getIdSustituciones() {
        return idSustituciones;
    }

    public void setIdSustituciones(Integer idSustituciones) {
        this.idSustituciones = idSustituciones;
    }

    @OneToOne
    @JoinColumn(name = "idRecambioA", nullable = false)
    public Recambio getRecambioA() {
        return recambioA;
    }

    public void setRecambioA(Recambio recambioA) {
        this.recambioA = recambioA;
    }

    @Column(name = "tipoSustitucion", nullable = false, length = 2)
    public Integer getSustitucion() {
        return sustitucion;
    }

    public void setSustitucion(Integer sustitucion) {
        this.sustitucion = sustitucion;
    }

    @OneToOne
    @JoinColumn(name = "idRecambioB", nullable = false)
    public Recambio getRecambioB() {
        return recambioB;
    }

    public void setRecambioB(Recambio recambioB) {
        this.recambioB = recambioB;
    }
}
