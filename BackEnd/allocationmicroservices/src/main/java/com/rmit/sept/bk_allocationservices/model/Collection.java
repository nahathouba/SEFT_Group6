package com.rmit.sept.bk_allocationservices.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Collections")
public class Collection {
    @Id
    private ObjectId id;

    private ObjectId objId;
    private String ownerUsername;
    private String type;

    public Collection () {}

    public Collection(ObjectId objId, String ownerUsername, String type) {
        this.objId = objId;
        this.ownerUsername = ownerUsername;
        this.type = type;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public ObjectId getObjId() {
        return objId;
    }

    public void setObjId(ObjectId objId) {
        this.objId = objId;
    }

    public String getOwnerUsername() {
        return ownerUsername;
    }

    public void setOwnerUsername(String ownerUsername) {
        this.ownerUsername = ownerUsername;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "Collection{" +
                "id=" + id +
                ", objId=" + objId +
                ", ownerUsername='" + ownerUsername + '\'' +
                ", type='" + type + '\'' +
                '}';
    }
}
