package com.rmit.sept.bk_shopservices.bk_shopservices.services;

import com.rmit.sept.bk_shopservices.bk_shopservices.Repositories.ShopRepository;
import com.rmit.sept.bk_shopservices.bk_shopservices.exceptions.ShopNameAlreadyExistsException;
import com.rmit.sept.bk_shopservices.bk_shopservices.model.Shop;
//import com.rmit.sept.bk_loginservices.Repositories.BookRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShopService {

    @Autowired
    private ShopRepository shopRepository;

//    @Autowired
//    private final BookRepository bookRepository;
//
//    public ShopService(ShopRepository shopRepository, BookRepository bookRepository) {
//        this.shopRepository = shopRepository;
//        this.bookRepository = bookRepository;
//    }

//    public Book addBook(Shop shop, Book book){
//        Book objBook = bookRepository.findByisbn(book.getIsbn());
//        Shop objShop = shopRepository.getById(shop.getId());
//        objShop.addBook(objBook);
//        return objBook;
//    }

    public Shop saveShop(Shop newShop){
         try{
             newShop.setName(newShop.getName());
             return shopRepository.save(newShop);
         }catch (Exception e){
             throw new ShopNameAlreadyExistsException("The shop " + newShop.getName() + " has already existed.");
         }
    }
}
