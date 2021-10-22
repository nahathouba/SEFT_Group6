package com.rmit.sept.bk_shopservices.web;

import com.rmit.sept.bk_shopservices.model.Response;
import com.rmit.sept.bk_shopservices.model.BookStore;
import com.rmit.sept.bk_shopservices.services.BookStoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Book;
import java.util.List;

@RestController
@RequestMapping("/api/bookstores")
public class BookStoreController {
    @Autowired
    private BookStoreService bookStoreService;

    @CrossOrigin
    @PostMapping("/add")
    public ResponseEntity<BookStore> addBookIntoStore(@RequestBody BookStore bookStore){
        return new ResponseEntity<BookStore>(bookStoreService.addBookIntoShop(bookStore), HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @PostMapping("/remove")
    public ResponseEntity<Response> removeBookFromStore(@RequestBody BookStore bookStore){
        Response res = new Response("FAILED");
        if(bookStoreService.removeBookFromShop(bookStore)) res.setStatus("SUCCESS");
        return new ResponseEntity<Response>(res, HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping("/request_books/{username}")
    public ResponseEntity<List<BookStore>> getBookStoresByShopId(@PathVariable("username") String username){
        return new ResponseEntity<List<BookStore>>(bookStoreService.getBooksStoredByShopID(username), HttpStatus.ACCEPTED);
    }

}
