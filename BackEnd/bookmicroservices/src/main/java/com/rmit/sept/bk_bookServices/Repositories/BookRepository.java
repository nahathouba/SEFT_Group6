package com.rmit.sept.bk_bookservices.Repositories;

import com.rmit.sept.bk_bookservices.model.Book;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface BookRepository extends MongoRepository<Book, String> {
    Book getBookByIsbn(String isbn);
    List<Book> getAllByAuthor(String author);
    List<Book> getAllByCategory(String category);
    List<Book> getAllByTitle(String title);
}
