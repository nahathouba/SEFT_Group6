package com.rmit.sept.bk_shopservices.bk_shopservices.web;

import com.rmit.sept.bk_shopservices.bk_shopservices.model.Response;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.rmit.sept.bk_shopservices.bk_shopservices.model.Shop;
import com.rmit.sept.bk_shopservices.bk_shopservices.services.ShopService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/shops")
public class ShopController {
    @Autowired
    private ShopService shopService;

    @CrossOrigin
    @PostMapping("/create")
    public ResponseEntity<?> createNewShop(@Valid @RequestBody Shop shop, BindingResult result){
        if(result.hasErrors()){
            return new ResponseEntity<String>("Invalid shop object", HttpStatus.BAD_REQUEST);
        }
        Shop objShop = shopService.saveShop(shop);
        return new ResponseEntity<Shop>(objShop, HttpStatus.CREATED);
    }

    //TO_DONE search books in this specific bookstore, routine: /api/shops/request_books/{username}, pathParam: ownerEmail, method: get
    @CrossOrigin
    @GetMapping("/request_books/{username}")
    public ResponseEntity<?> searchAllBooks(@PathVariable("username") String ownerEmail){
        List<Shop> obj = new ArrayList<Shop>();
        return new ResponseEntity<List<Shop>>(obj, HttpStatus.ACCEPTED);
    }
    //TO_DONE delete shop, routine: /api/shops/{username}, where username is the userEmail, also is the shop ID, method: delete
    @CrossOrigin
    @DeleteMapping("/{username}")
    public ResponseEntity<?> deleteBookFromStore(@PathVariable("username") String ownerEmail){
        Response res = new Response();
        res.setStatus("SUCCESS");
        return new ResponseEntity<Response>(res, HttpStatus.ACCEPTED);
    }
}
