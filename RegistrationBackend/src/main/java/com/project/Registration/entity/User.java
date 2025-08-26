package com.project.Registration.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  
    private Integer userid;

    @Column(nullable = false, length = 50)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String phonenumber;

    @Column(nullable = false)
    private String city;

    // Constructors
    public User() {}

    public User(Integer userid, String username, String email, String password, String phonenumber, String city) {
        this.userid = userid;
        this.username = username;
        this.email = email;
        this.password = password;
        this.phonenumber = phonenumber;
        this.city = city;
    }

    // Getters & Setters
    public Integer getUserid() {
        return userid;
    }
    public void setUserid(Integer userid) {
        this.userid = userid;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getPhonenumber() {
        return phonenumber;
    }
    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }
    public String getCity() {
        return city;
    }
    public void setCity(String city) {
        this.city = city;
    }

    @Override
    public String toString() {
        return "User [userid=" + userid + ", username=" + username + ", email=" + email +
                ", password=" + password + ", phonenumber=" + phonenumber + ", city=" + city + "]";
    }
}
