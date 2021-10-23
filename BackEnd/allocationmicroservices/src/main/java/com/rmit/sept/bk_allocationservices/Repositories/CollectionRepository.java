package com.rmit.sept.bk_allocationservices.Repositories;

import com.rmit.sept.bk_allocationservices.model.Collection;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CollectionRepository extends MongoRepository<Collection, ObjectId> {
    List<Collection> getAllByOwnerUsername(String ownerUsername);
}
