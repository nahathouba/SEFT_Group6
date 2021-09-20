package com.rmit.sept.bk_shopservices.bk_shopservices.Repositories;

import org.springframework.stereotype.Repository;
import com.rmit.sept.bk_shopservices.bk_shopservices.model.Shop;
import org.springframework.data.repository.CrudRepository;

@Repository
public interface ShopRepository extends CrudRepository<Shop, Long>{
    Shop findByName(String shopName);
    Shop getById(long id);
}
