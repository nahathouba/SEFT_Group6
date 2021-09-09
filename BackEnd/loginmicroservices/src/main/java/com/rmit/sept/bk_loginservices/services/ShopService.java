package com.rmit.sept.bk_loginservices.services;

import com.rmit.sept.bk_loginservices.Repositories.ShopRepository;
// import com.rmit.sept.bk_loginservices.exceptions.BookNotExistException;
// import com.rmit.sept.bk_loginservices.exceptions.ShopAlreadyExistsException;
import com.rmit.sept.bk_loginservices.model.Book;
import com.rmit.sept.bk_loginservices.model.Shop;
import com.rmit.sept.bk_loginservices.Repositories.BookRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShopService {

    @Autowired
    private final ShopRepository shopRepository;

    @Autowired
    private final BookRepository bookRepository;

    public ShopService(ShopRepository shopRepository, BookRepository bookRepository) {
        this.shopRepository = shopRepository;
        this.bookRepository = bookRepository;
    }

    public Book addBook(Shop shop, Book book){
        // try{
            Book objBook = bookRepository.findByisbn(book.getIsbn());
            Shop objShop = shopRepository.getById(shop.getId());
            objShop.addBook(objBook);
            return objBook;
        // } catch(Exception e){
        //     throw new BookNotExistException("The book you adding to your shop does not exist in the database.");
        // }
    }

    public Shop saveShop(Shop newShop){
        // try{
            return shopRepository.save(newShop);
        // }catch (Exception e){
        //     throw new ShopAlreadyExistsException("The shop " + newShop.getName() + " has already existed.");
        // }
    }
}
