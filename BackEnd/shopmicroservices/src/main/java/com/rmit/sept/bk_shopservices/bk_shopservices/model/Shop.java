package com.rmit.sept.bk_shopservices.bk_shopservices.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

//@Table(name="SHOP")
@Document("shops")
@Entity
public class Shop {
//    @Id
//    @Column(name="SHOP_ID")
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private long id;

    @NotBlank(message = "name is required")
    @Column(name="NAME", unique = true)
    private String name;

    @Id
    private String ownerUserName;

//    @OneToMany(targetEntity = Book.class)
//    private ArrayList<Book> books;

    public Shop() {
    }

//    public Shop(Long id, @NotBlank(message = "name is required") String name) {
//        this.id = id;
//        this.name = name;
//    }

//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOwnerUserName() {
        return ownerUserName;
    }

    public void setOwnerUserName(String ownerUserName) {
        this.ownerUserName = ownerUserName;
    }

//    public ArrayList<Book> getBooks() {
//        return books;
//    }

//    public void addBook(Book book) {
//        books.add(book);
//    }
//
//    public void removeBook(Book book){
//        books.remove(book);
//    }

}
