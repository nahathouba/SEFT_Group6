package com.rmit.sept.bk_messageservices.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Message")
public class Message {
    @Id
    private ObjectId id;

    private String requesterUsername;
    private String recipientUsername;
    private String body;
    private String type;
    private boolean unread;

    public Message(){ unread = true; }

    public Message(String requesterUsername, String recipientUsername) {
        this.requesterUsername = requesterUsername;
        this.recipientUsername = recipientUsername;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
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

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Boolean getStatus() {
        return unread;
    }

    public void setStatus(Boolean unread) {
        this.unread = unread;
    }

    @Override
    public String toString() {
        return String.format(
                "requesterUsername:%s, recipientUsername:%s", requesterUsername, recipientUsername
        );
    }
}
