package com.rmit.sept.bk_allocationservices.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("BookAllocations")
public class BookAllocations {
    @Id
    private ObjectId id;

    private String ownerUsername;
    private String bookIsbn;
    private String type;

    public BookAllocations() {}

    public BookAllocations(String ownerUsername, String bookIsbn, String type) {
        this.ownerUsername = ownerUsername;
        this.bookIsbn = bookIsbn;
        this.type = type;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getOwnerUsername() {
        return ownerUsername;
    }

    public void setOwnerUsername(String ownerUsername) {
        this.ownerUsername = ownerUsername;
    }

    public String getBookIsbn() {
        return bookIsbn;
    }

    public void setBookIsbn(String bookIsbn) {
        this.bookIsbn = bookIsbn;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "BookAllocations{" +
                "ownerUsername='" + ownerUsername + '\'' +
                ", bookIsbn='" + bookIsbn + '\'' +
                ", type='" + type + '\'' +
                '}';
    }
}
