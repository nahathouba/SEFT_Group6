package com.rmit.sept.bk_collectionmicroservices.services;

import com.rmit.sept.bk_collectionmicroservices.model.Cart;
import com.rmit.sept.bk_collectionmicroservices.model.Item;
import com.rmit.sept.bk_collectionmicroservices.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    public Cart addBook(Item item, String username){
        Cart objCart = cartRepository.findByUsername(username);
        return cartRepository.save(objCart);
    }
}
