package com.rmit.sept.bk_shopservices.bk_shopservices.web;

import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rmit.sept.bk_shopservices.bk_shopservices.model.Shop;
import com.rmit.sept.bk_shopservices.bk_shopservices.services.ShopService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/shops")
public class ShopController {
    @Autowired
    private ShopService shopService;

    @PostMapping("/create")
    public ResponseEntity<?> createNewShop(@Valid @RequestBody Shop shop, BindingResult result){
        if(result.hasErrors()){
            return new ResponseEntity<String>("Invalid shop object", HttpStatus.BAD_REQUEST);
        }
        Shop objShop = shopService.saveShop(shop);
        return new ResponseEntity<Shop>(objShop, HttpStatus.CREATED);
    }
}
