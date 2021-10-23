package com.rmit.sept.bk_allocationservices.services;

import com.rmit.sept.bk_allocationservices.Repositories.CartRepository;
import com.rmit.sept.bk_allocationservices.Repositories.CollectionRepository;
import com.rmit.sept.bk_allocationservices.model.Cart;
import com.rmit.sept.bk_allocationservices.model.Collection;
import com.rmit.sept.bk_allocationservices.model.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookAllocationsService {
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CollectionRepository collectionRepository;

    public Collection addBookToCollection(Collection collection){
        return collectionRepository.save(collection);
    }

    public Response removeBookFromCollection(Collection colls){
        Response res = new Response();
        collectionRepository.delete(colls);
        res.setStatus("SUCCESS");
        return res;
    }

    public Cart addBookToCart(Cart cart){
        return cartRepository.save(cart);
    }

    public Response removeBookFromCart(Cart cart){
        Response res = new Response();
        cartRepository.delete(cart);
        res.setStatus("SUCCESS");
        return res;
    }

    public List<Collection> getCollectionsByUsername(String username){
        return collectionRepository.getAllByOwnerUsername(username);
    }

    public List<Cart> getCartByUsername(String username){
        return cartRepository.findAllByOwnerUsername(username);
    }
}
