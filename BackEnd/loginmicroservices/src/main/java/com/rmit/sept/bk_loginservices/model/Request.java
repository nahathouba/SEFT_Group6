package com.rmit.sept.bk_loginservices.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String requesterUsername;
    private String recipientUsername;

    public Request(){}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getRequesterUsername() {
        return requesterUsername;
    }

    public void setRequesterUsername(String requesterUsername) {
        this.requesterUsername = requesterUsername;
    }

    public String getRecipientUsername() {
        return recipientUsername;
    }

    public void setRecipientUsername(String recipientUsername) {
        this.recipientUsername = recipientUsername;
    }
}
