package com.rmit.sept.bk_bookservices.web;

import com.rmit.sept.bk_bookservices.model.Book;
import com.rmit.sept.bk_bookservices.model.BookRequest;
import com.rmit.sept.bk_bookservices.model.Response;
import com.rmit.sept.bk_bookservices.services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {
    @Autowired
    private BookService bookService;

    @CrossOrigin
    @PostMapping("/add")
    public ResponseEntity<Book> saveBook(@RequestBody Book book){
        return new ResponseEntity<Book>(bookService.addBook(book), HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @PostMapping("/request")
    public ResponseEntity<List<Book>> requestBooks(@RequestBody BookRequest bookRequest){
        List<Book> books = new ArrayList<Book>();
        if(bookRequest.getSort().equals("isbn")){
            books = bookService.getBookByIsbn(bookRequest.getValue());
        }else if(bookRequest.getSort().equals("title")){
            books = bookService.getBooksByTitle(bookRequest.getValue());
        }else if(bookRequest.getSort().equals("category")){
            books = bookService.getBooksByCategory(bookRequest.getValue());
        }else if(bookRequest.getSort().equals("author")){
            books = bookService.getBooksByAuthor(bookRequest.getValue());
        }

        return new ResponseEntity<List<Book>>(books, HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @PostMapping("/update")
    public ResponseEntity<Book> updateBook(@RequestBody Book book){
        return new ResponseEntity<Book>(bookService.updateBookInfo(book), HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @DeleteMapping("")
    public ResponseEntity<Response> deleteBook(@RequestBody Book book){
        Response res = new Response();
        if(bookService.getBookByIsbn(book.getIsbn()) != null){
            res.setStatus("SUCCESS");
            bookService.deleteBook(book.getId());
        }else{
            res.setStatus("FAILED");
        }

        return new ResponseEntity<Response>(res, HttpStatus.ACCEPTED);
    }
}
