package com.rmit.sept.bk_loginservices.web;

import org.springframework.web.bind.annotation.RestController;

import com.rmit.sept.bk_loginservices.model.Shop;
import com.rmit.sept.bk_loginservices.services.ShopService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api/shops")
public class ShopController {
    @Autowired
    private ShopService shopService;

    public ResponseEntity<Shop> createNewShop(@RequestBody Shop shop){
        Shop objShop = shopService.saveShop(shop);
        return new ResponseEntity<Shop>(objShop, HttpStatus.CREATED);
    }
}
