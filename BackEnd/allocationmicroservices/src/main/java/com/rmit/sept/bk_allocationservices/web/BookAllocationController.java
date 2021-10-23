package com.rmit.sept.bk_allocationservices.web;

import com.rmit.sept.bk_allocationservices.model.Cart;
import com.rmit.sept.bk_allocationservices.model.Collection;
import com.rmit.sept.bk_allocationservices.services.BookAllocationsService;
import com.rmit.sept.bk_allocationservices.model.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/allocations")
public class BookAllocationController {
    @Autowired
    private BookAllocationsService bookAllocationsService;

    @CrossOrigin
    @PostMapping("/carts")
    public ResponseEntity<?> allocateBookToCart(@RequestBody Cart bookAllocations){
        return new ResponseEntity<Cart>(bookAllocationsService.addBookToCart(bookAllocations), HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @PostMapping("/colls")
    public ResponseEntity<?> allocateBookToCollection(@RequestBody Collection bookAllocations){
        return new ResponseEntity<Collection>(bookAllocationsService.addBookToCollection(bookAllocations), HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @DeleteMapping("/carts")
    public ResponseEntity<?> deallocateBookFromCart(@RequestBody Cart bookAllocations){
        return new ResponseEntity<Response>(bookAllocationsService.removeBookFromCart(bookAllocations), HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @DeleteMapping("/colls")
    public ResponseEntity<?> deallocateBookFromCollection(@RequestBody Collection bookAllocations){
        return new ResponseEntity<Response>(bookAllocationsService.removeBookFromCollection(bookAllocations), HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping("/colls/{username}")
    public ResponseEntity<List<Collection>> getCollectionsByUsername(@PathVariable("username") String username){
        return new ResponseEntity<List<Collection>>(bookAllocationsService.getCollectionsByUsername(username), HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping("/carts/{username}")
    public ResponseEntity<List<Cart>> getCartByUsername(@PathVariable("username") String username){
        return new ResponseEntity<List<Cart>>(bookAllocationsService.getCartByUsername(username), HttpStatus.ACCEPTED);
    }
}
