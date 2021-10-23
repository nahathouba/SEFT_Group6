package com.rmit.sept.bk_bookservices.services;

import com.rmit.sept.bk_bookservices.Repositories.BookRepository;
import com.rmit.sept.bk_bookservices.model.Book;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    public Book addBook(Book book){
        return bookRepository.save(book);
    }

    public List<Book> getBookByIsbn(String isbn){
        return bookRepository.getBookByIsbn(isbn);
    }

    public List<Book> getBooksByTitle(String title){
        return bookRepository.getAllByTitle(title);
    }

    public List<Book> getBooksByAuthor(String author){
        return bookRepository.getAllByAuthor(author);
    }

    public List<Book> getBooksByCategory(String category){
        return bookRepository.getAllByCategory(category);
    }

    public Book updateBookInfo(Book book){
        Book objBook = bookRepository.getById(book.getId());
        if(objBook != null){
            objBook.setAuthor(book.getAuthor());
            objBook.setCategory(book.getCategory());
            objBook.setTitle(book.getTitle());
            objBook.setDescription(book.getDescription());
            objBook.setPrice(book.getPrice());
            objBook.setImageUrl(book.getImageUrl());
            return bookRepository.save(objBook);
        }else{
            return new Book();
        }

    }

    public boolean deleteBook(ObjectId id){
        boolean success = false;
        Book book = bookRepository.getById(id);
        if(book != null){
            success = true;
            bookRepository.delete(book);
        }
        return success;
    }
}
