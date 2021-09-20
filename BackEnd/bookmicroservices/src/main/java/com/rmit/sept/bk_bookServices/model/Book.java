package com.rmit.sept.bk_bookServices.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

//@Table(name="BOOK")
@Entity
public class Book {
    @Id
    @NotNull(message = "ISBN is required")
    @Column(name="ISBN")
    private long isbn;

//    private Long isbn;

    @NotBlank(message = "title is required")
    @Column(name="TITLE")
    private String title;

    @NotBlank(message = "author is required")
    @Column(name="AUTHOR")
    private String author;

    @NotBlank(message = "category is required")
    @Column(name="CATEGORY")
    private String category;

    @Column(name="STATUS")
    private String status;

    @Column(name="PARENT_SHOP_ID")
    private String parentShopID;

    public Book(){
    }

    public long getIsbn() {
        return isbn;
    }

    public void setIsbn(long isbn) {
        this.isbn = isbn;
    }

    public Book(@NotBlank(message = "ISBN is required") long isbn,
                @NotBlank(message = "title is required") String title,
                @NotBlank(message = "author is required") String author,
                @NotBlank(message = "category is required") String category) {
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.category = category;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getParentShopID() {
        return parentShopID;
    }

    public void setParentShopID(String parentShopID) {
        this.parentShopID = parentShopID;
    }
}
