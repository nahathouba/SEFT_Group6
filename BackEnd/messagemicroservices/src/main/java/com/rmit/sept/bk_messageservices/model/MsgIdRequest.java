package com.rmit.sept.bk_messageservices.model;

import org.bson.types.ObjectId;

public class MsgIdRequest {

    private ObjectId Id;

    public ObjectId getId() {
        return Id;
    }

    public void setId(ObjectId id) {
        Id = id;
    }
    
}
