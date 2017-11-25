package com.pacoillan.pojo;
// Generated 15-ago-2016 10:55:19 by Hibernate Tools 3.2.1.GA


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Entidad generated by hbm2java
 */
@Entity
@Table(name="entidad"
    ,catalog="pacoillan2"
)
public class Entidad  implements java.io.Serializable {


     private Integer idEntidad;
     private String nombre;
     private String direccion;
     private String cpostal;
     private String poblacion;
     private String dni;
     private String telefono;
     private String movil;
     private String email;
     private String informacion;

    public Entidad() {
    }

    public Entidad(String nombre, String direccion, String cpostal, String poblacion, String dni, String telefono, String movil, String email, String informacion) {
       this.nombre = nombre;
       this.direccion = direccion;
       this.cpostal = cpostal;
       this.poblacion = poblacion;
       this.dni = dni;
       this.telefono = telefono;
       this.movil = movil;
       this.email = email;
       this.informacion = informacion;
    }
   
     @Id @GeneratedValue(strategy=IDENTITY)
    
    @Column(name="idEntidad", unique=true, nullable=false)
    public Integer getIdEntidad() {
        return this.idEntidad;
    }
    
    public void setIdEntidad(Integer idEntidad) {
        this.idEntidad = idEntidad;
    }
    
    @Column(name="nombre", length=35)
    public String getNombre() {
        return this.nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    @Column(name="direccion", length=25)
    public String getDireccion() {
        return this.direccion;
    }
    
    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }
    
    @Column(name="cPostal", length=5)
    public String getCpostal() {
        return this.cpostal;
    }
    
    public void setCpostal(String cpostal) {
        this.cpostal = cpostal;
    }
    
    @Column(name="poblacion", length=25)
    public String getPoblacion() {
        return this.poblacion;
    }
    
    public void setPoblacion(String poblacion) {
        this.poblacion = poblacion;
    }
    
    @Column(name="dni", length=9)
    public String getDni() {
        return this.dni;
    }
    
    public void setDni(String dni) {
        this.dni = dni;
    }
    
    @Column(name="telefono", length=12)
    public String getTelefono() {
        return this.telefono;
    }
    
    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }
    
    @Column(name="movil", length=12)
    public String getMovil() {
        return this.movil;
    }
    
    public void setMovil(String movil) {
        this.movil = movil;
    }
    
    @Column(name="email", length=30)
    public String getEmail() {
        return this.email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    @Column(name="informacion", length=2000)
    public String getInformacion() {
        return this.informacion;
    }
    
    public void setInformacion(String informacion) {
        this.informacion = informacion;
    }




}


