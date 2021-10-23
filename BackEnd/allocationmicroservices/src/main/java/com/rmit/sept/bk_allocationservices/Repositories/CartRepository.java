package com.rmit.sept.bk_allocationservices.Repositories;

import com.rmit.sept.bk_allocationservices.model.Cart;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CartRepository extends MongoRepository<Cart, ObjectId> {
    List<Cart> findAllByOwnerUsername(String ownerUsername);
}
