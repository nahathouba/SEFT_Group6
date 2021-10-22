package com.rmit.sept.bk_shopservices.Repositories;

import com.rmit.sept.bk_shopservices.model.Shop;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ShopRepository extends MongoRepository<Shop, String> {
//    Shop getById(String shopId);
    Shop findShopByShopId(String shopId);
}
