package com.rmit.sept.bk_loginservices.web;

import org.springframework.web.bind.annotation.RestController;

import com.rmit.sept.bk_loginservices.services.BookService;
import com.rmit.sept.bk_loginservices.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("api/books")
public class BookController {
    @Autowired
    private BookService bookService;

    public ResponseEntity<Book> createNewBook(@RequestBody Book book){
        Book objBook = bookService.saveBook(book);
        return new ResponseEntity<Book>(objBook, HttpStatus.CREATED);
    }
}
