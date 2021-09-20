package com.rmit.sept.bk_userctrlmicroservices.usercontrolmicroservices.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Conversation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String message;
    private String senderUsername;
    private String recipientUsername;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getSenderUsername() {
        return senderUsername;
    }

    public void setSenderUsername(String senderUsername) {
        this.senderUsername = senderUsername;
    }

    public String getRecipientUsername() {
        return recipientUsername;
    }

    public void setRecipientUsername(String recepientUsername) {
        this.recipientUsername = recepientUsername;
    }
}
