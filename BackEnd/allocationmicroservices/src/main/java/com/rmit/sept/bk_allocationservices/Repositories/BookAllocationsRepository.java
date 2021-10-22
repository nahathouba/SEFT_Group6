package com.rmit.sept.bk_allocationservices.Repositories;

import com.rmit.sept.bk_allocationservices.model.BookAllocations;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BookAllocationsRepository extends MongoRepository<BookAllocations, ObjectId> {
    List<BookAllocations> findAllByOwnerUsername(String ownerUsername);
}
