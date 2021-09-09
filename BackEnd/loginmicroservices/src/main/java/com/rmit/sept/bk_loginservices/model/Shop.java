package com.rmit.sept.bk_loginservices.model;

import java.util.ArrayList;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name="SHOP")
public class Shop {
    @Id
    @Column(name="SHOP_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank(message = "name is required")
    @Column(name="NAME")
    private String name;

    private ArrayList<Book> books;

    public Shop() {
    }

    public Shop(Long id, @NotBlank(message = "name is required") String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ArrayList<Book> getBooks() {
        return books;
    }

    public void addBook(Book book) {
        books.add(book);
    }

    public void removeBook(Book book){
        books.remove(book);
    }

}
