package com.rmit.sept.bk_allocationservices.services;

import com.rmit.sept.bk_allocationservices.model.BookAllocations;
import com.rmit.sept.bk_allocationservices.Repositories.BookAllocationsRepository;
import com.rmit.sept.bk_allocationservices.model.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookAllocationsService {
    @Autowired
    private BookAllocationsRepository bookAllocationsRepository;

    public BookAllocations collectBookTo(BookAllocations bookAllocations){
        return bookAllocationsRepository.save(bookAllocations);
    }

    public Response removeBookFrom(BookAllocations bookAllocations){
        Response res = new Response();
        bookAllocationsRepository.delete(bookAllocations);
        res.setStatus("SUCCESS");
        return res;
    }

    public List<BookAllocations> getCollectionsByUsername(String username){
        List<BookAllocations> bookAllocations = bookAllocationsRepository.findAllByOwnerUsername(username);
        List<BookAllocations> collections = new ArrayList<BookAllocations>();
        for(BookAllocations alloc: bookAllocations){
            if(alloc.getType().equals("Collection")){
                collections.add(alloc);
            }
        }
        return collections;
    }

    public List<BookAllocations> getCartByUsername(String username){
        List<BookAllocations> bookAllocations = bookAllocationsRepository.findAllByOwnerUsername(username);
        List<BookAllocations> cart = new ArrayList<BookAllocations>();
        for(BookAllocations alloc: bookAllocations){
            if(alloc.getType().equals("Cart")){
                cart.add(alloc);
            }
        }
        return cart;
    }
}
