package com.rmit.sept.bk_bookServices.services;

import com.rmit.sept.bk_bookServices.Repositories.BookRepository;
import com.rmit.sept.bk_bookServices.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    public Book saveBook(Book newBook){
        return bookRepository.save(newBook);
    }

    public Book requestBook(String key, String value){
        if(key.equals("author")) {
            return bookRepository.findByAuthor(value);
        }else if(key.equals("title")) {
            return bookRepository.findByTitle(value);
        }else if(key.equals("category")) {
            return bookRepository.findByCategory(value);
        }else {
            return bookRepository.findByTitle(value);
        }
    }

    public Book requestBook(long isbn){ return bookRepository.findByisbn(isbn); }
}
