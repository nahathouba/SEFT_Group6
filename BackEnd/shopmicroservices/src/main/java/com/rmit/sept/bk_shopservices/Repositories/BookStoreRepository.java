package com.rmit.sept.bk_shopservices.Repositories;

import com.rmit.sept.bk_shopservices.model.BookStore;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BookStoreRepository extends MongoRepository<BookStore, ObjectId> {
    List<BookStore> findAllByShopId(String shopId);
    BookStore findBookStoreByBookIsbnAndShopId(String bookIsbn, String shopId);
}
