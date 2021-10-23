package com.rmit.sept.bk_shopservices.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Bookstore")
public class BookStore {
    @Id
    private ObjectId id;

    private String bookIsbn;
    private String shopId;
    private String status;
    private int price;

    public BookStore() {}

    public BookStore(String bookIsbn, String shopId, String status, int price) {
        this.bookIsbn = bookIsbn;
        this.shopId = shopId;
        this.status = status;
        this.price = price;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getBookIsbn() {
        return bookIsbn;
    }

    public void setBookIsbn(String bookIsbn) {
        this.bookIsbn = bookIsbn;
    }

    public String getShopId() {
        return shopId;
    }

    public void setShopId(String shopId) {
        this.shopId = shopId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "BookStore{" +
                "bookIsbn='" + bookIsbn + '\'' +
                ", shopId='" + shopId + '\'' +
                ", status='" + status + '\'' +
                ", price="   + price + '\'' +
                '}';
    }


}
