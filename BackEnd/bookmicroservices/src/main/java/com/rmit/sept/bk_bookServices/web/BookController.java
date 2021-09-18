package com.rmit.sept.bk_bookServices.web;

import com.rmit.sept.bk_bookServices.model.BookRequest;
import com.rmit.sept.bk_bookServices.services.MapValidationErrorService;
import com.rmit.sept.bk_bookServices.validator.BookRequestValidator;
import com.rmit.sept.bk_bookServices.validator.BookValidator;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rmit.sept.bk_bookServices.services.BookService;
import com.rmit.sept.bk_bookServices.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;

@RestController
@RequestMapping("api/books")
public class BookController {
    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private BookService bookService;

    @Autowired
    private BookValidator bookValidator;

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

    @PostMapping("/request")
    public ResponseEntity<?> getBook(@Valid @RequestBody BookRequest bookRequest, BindingResult result){
        bookRequestValidator.validate(bookRequest, result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        Book book = new Book();
        if(bookRequest.getSort().equals("isbn")){
            book = bookService.requestBook(Integer.parseInt(bookRequest.getValue()));
        }else {
            book = bookService.requestBook(bookRequest.getSort(), bookRequest.getValue());
        }

        return new ResponseEntity<Book>(book, HttpStatus.ACCEPTED);
    }
}
