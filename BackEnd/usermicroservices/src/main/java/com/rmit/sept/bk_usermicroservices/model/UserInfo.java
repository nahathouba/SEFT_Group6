package com.rmit.sept.bk_usermicroservices.model;


import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "UsersInfo")
public class UserInfo {
    @Id
    private ObjectId id;

    private String username;
    private String fullname;
    private String gender;
    private String address;
    private String status;
    private String role;
    private String about;

    public UserInfo() { role = "PublicUser"; status = "NORMAL";}

    public UserInfo(String username, String fullname, String gender, String address, String status,
                    String role, String about) {
        this.username = username;
        this.fullname = fullname;
        this.gender = gender;
        this.address = address;
        this.status = status;
        this.role = role;
        this.about = about;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    @Override
    public String toString() {
        return String.format(
                "User[username=%s, full_name:%s, gender:%s, status:%s, address:%s, role:%s, about:%s",
                username, fullname, gender, status, address, role, about
        );
    }
}