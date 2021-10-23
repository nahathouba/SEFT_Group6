package com.rmit.sept.bk_allocationservices.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Cart")
public class Cart {
    @Id
    private ObjectId id;

    private ObjectId bookId;
    private String ownerUsername;
    private String addingDate;

    public Cart() {}

    public Cart(ObjectId bookId, String ownerUsername, String addingDate) {
        this.bookId = bookId;
        this.ownerUsername = ownerUsername;
        this.addingDate = addingDate;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public ObjectId getBookId() {
        return bookId;
    }

    public void setBookId(ObjectId bookId) {
        this.bookId = bookId;
    }

    public String getOwnerUsername() {
        return ownerUsername;
    }

    public void setOwnerUsername(String ownerUsername) {
        this.ownerUsername = ownerUsername;
    }

    public String getAddingDate() {
        return addingDate;
    }

    public void setAddingDate(String addingDate) {
        this.addingDate = addingDate;
    }

    @Override
    public String toString() {
        return "Cart{" +
                "id=" + id +
                ", bookId=" + bookId +
                ", ownerUsername='" + ownerUsername + '\'' +
                ", addingDate='" + addingDate + '\'' +
                '}';
    }
}
