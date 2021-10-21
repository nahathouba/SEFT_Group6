package com.rmit.sept.bk_bookServices.web;

import com.rmit.sept.bk_bookServices.model.BookRequest;
import com.rmit.sept.bk_bookServices.model.Response;
import com.rmit.sept.bk_bookServices.services.MapValidationErrorService;
import com.rmit.sept.bk_bookServices.validator.BookRequestValidator;
import com.rmit.sept.bk_bookServices.validator.BookValidator;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.rmit.sept.bk_bookServices.services.BookService;
import com.rmit.sept.bk_bookServices.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/books")
public class BookController {
    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private BookService bookService;

    @Autowired
    private BookValidator bookValidator;

    @CrossOrigin
    @PostMapping("/upload")
    public ResponseEntity<?> createNewBook(@Valid @RequestBody Book book, BindingResult result){
        bookValidator.validate(book, result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        Book objBook = bookService.saveBook(book);
        return new ResponseEntity<Book>(objBook, HttpStatus.CREATED);
    }

    @Autowired
    private BookRequestValidator bookRequestValidator;

    @CrossOrigin
    @PostMapping ("/request") // diff and details between post & get ???
    public ResponseEntity<?> getBooks(@Valid @RequestBody BookRequest bookRequest, BindingResult result){
        bookRequestValidator.validate(bookRequest, result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        List<Book> books = new ArrayList<Book>();
        if(bookRequest.getSort().equals("ISBN")){
            books.add(bookService.requestBook(Integer.parseInt(bookRequest.getValue())));
        }else {
            books = bookService.requestBooks(bookRequest.getSort(), bookRequest.getValue());
        }

        return new ResponseEntity<List<Book>>(books, HttpStatus.ACCEPTED);
    }

    //TO_DONE delete books in such shop, routine: /api/books/{username}, method: delete
    @CrossOrigin
    @DeleteMapping("{username}")
    public ResponseEntity<?> deleteBook(@PathVariable("username") String ownerEmail){
        Response res = new Response();
        res.setStatus(bookService.deleteBookByShopID(ownerEmail));
        return new ResponseEntity<Response>(res, HttpStatus.ACCEPTED);
    }
}
