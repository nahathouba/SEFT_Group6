package com.rmit.sept.bk_collectionmicroservices.repository;

import com.rmit.sept.bk_collectionmicroservices.model.Cart;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.ResponseBody;

@Repository
public interface CartRepository extends CrudRepository<Cart, Long> {

    Cart findByUsername(String username);
    Cart getById(Long id);

}
