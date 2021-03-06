package com.pacoillan.pojo;
// Generated 28-mar-2015 0:33:52 by Hibernate Tools 3.2.1.GA

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 * Motor generated by hbm2java
 */
@Entity
@Table(name = "motor", catalog = "pacoillan2")
public class Motor implements java.io.Serializable, Comparable {

    private Integer idMotor;
    private String codigoMotor;
    private String descripcionMotor;
    private String combustibleMotor;
    private String cilindradaMotor;
    private Float kwMotor;
    private Fabricante fabricante;
    private String infoMotor;

    public Motor() {
    }

    public Motor(String codigoMotor) {
        this.codigoMotor = codigoMotor;
    }

    public Motor(String codigoMotor, String descripcionMotor) {  // Constructor necesario para line en blanco listados
        this.codigoMotor = codigoMotor;
        this.descripcionMotor = descripcionMotor;
    }

    public Motor(String codigoMotor, String descripcionMotor, String combustibleMotor, String cilindradaMotor, Float kwMotor, Fabricante fabricante, String infoMotor) {
        this.codigoMotor = codigoMotor;
        this.descripcionMotor = descripcionMotor;
        this.combustibleMotor = combustibleMotor;
        this.cilindradaMotor = cilindradaMotor;
        this.kwMotor = kwMotor;
        this.fabricante = fabricante;
        this.infoMotor = infoMotor;
    }

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "idMotor", unique = true, nullable = false)
    public Integer getIdMotor() {
        return this.idMotor;
    }

    public void setIdMotor(Integer idMotor) {
        this.idMotor = idMotor;
    }

    @Column(name = "codigoMotor", nullable = false, length = 10)
    public String getCodigoMotor() {
        return this.codigoMotor;
    }

    public void setCodigoMotor(String codigoMotor) {
        this.codigoMotor = codigoMotor;
    }

    @Column(name = "descripcionMotor", nullable = false, length = 40)
    public String getDescripcionMotor() {
        return this.descripcionMotor;
    }

    public void setDescripcionMotor(String descripcionMotor) {
        this.descripcionMotor = descripcionMotor;
    }

    @Column(name = "combustibleMotor", nullable = false, length = 2)
    public String getCombustibleMotor() {
        return this.combustibleMotor;
    }

    public void setCombustibleMotor(String combustibleMotor) {
        this.combustibleMotor = combustibleMotor;
    }

    @Column(name = "cilindradaMotor", length = 5)
    public String getCilindradaMotor() {
        return this.cilindradaMotor;
    }

    public void setCilindradaMotor(String cilindradaMotor) {
        this.cilindradaMotor = cilindradaMotor;
    }

    @Column(name = "kwMotor", precision = 12, scale = 0)
    public Float getKwMotor() {
        return this.kwMotor;
    }

    public void setKwMotor(Float kwMotor) {
        this.kwMotor = kwMotor;
    }

    @OneToOne
    @JoinColumn(name = "idMarca", nullable = false)
    public Fabricante getFabricante() {
        return this.fabricante;
    }

    public void setFabricante(Fabricante fabricante) {
        this.fabricante = fabricante;
    }

    @Column(name = "infoMotor", length = 2000)
    public String getInfoMotor() {
        return infoMotor;
    }

    public void setInfoMotor(String infoMotor) {
        this.infoMotor = infoMotor;
    }

    @Override
    public int compareTo(Object t) {
        Motor otroMotor = (Motor) t;
        return codigoMotor.compareTo(otroMotor.getCodigoMotor());
    }
}
