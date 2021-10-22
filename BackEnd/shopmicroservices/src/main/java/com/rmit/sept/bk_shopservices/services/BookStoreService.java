package com.rmit.sept.bk_shopservices.services;

import com.rmit.sept.bk_shopservices.Repositories.BookStoreRepository;
import com.rmit.sept.bk_shopservices.model.BookStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.print.Book;
import java.util.List;

@Service
public class BookStoreService {
    @Autowired
    private BookStoreRepository bookStoreRepository;

    public List<BookStore> getBooksStoredByShopID(String shopId){
        return bookStoreRepository.findAllByShopId(shopId);
    }

    public BookStore addBookIntoShop(BookStore bookStore){
        return bookStoreRepository.save(bookStore);
    }

    public boolean removeBookFromShop(BookStore bookStore){
        boolean success = false;
        if(bookStoreRepository.findBookStoreByBookIsbnAndShopId(bookStore.getBookIsbn(), bookStore.getShopId()) != null){
            success = true;
            bookStoreRepository.delete(bookStore);
        }
        return success;
    }
}
