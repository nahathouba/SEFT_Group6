package com.rmit.sept.bk_bookServices.services;

import com.rmit.sept.bk_bookServices.Repositories.BookRepository;
import com.rmit.sept.bk_bookServices.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    public Book saveBook(Book newBook){
        return bookRepository.save(newBook);
    }

    public List<Book> requestBooks(String key, String value){
        List<Book> books = new ArrayList<Book>();

        if(key.equals("author")) {
            books = bookRepository.findAllByAuthor(value);
        }else if(key.equals("title")) {
            books = bookRepository.findByTitle(value);
        }else if(key.equals("category")) {
            books = bookRepository.findAllByCategory(value);
        }else {
            books = bookRepository.findByTitle(value);
        }
        return books;
    }

    public Book requestBook(long isbn){ return bookRepository.findByisbn(isbn); }

    public String deleteBookByShopID(String ownerEmail){
        String status = "SUCCESS";
        List<Book> books = new ArrayList<Book>();
        books = bookRepository.findAllByShopId(ownerEmail);
        if(books.size() == 0) status = "FAILED";
        return status;
    }
}
