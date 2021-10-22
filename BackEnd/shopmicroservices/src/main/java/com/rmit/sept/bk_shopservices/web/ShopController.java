package com.rmit.sept.bk_shopservices.web;

import com.rmit.sept.bk_shopservices.model.Response;
import com.rmit.sept.bk_shopservices.model.Shop;
import com.rmit.sept.bk_shopservices.services.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/shops")
public class ShopController {
    @Autowired
    private ShopService shopService;

    @CrossOrigin
    @PostMapping("/create")
    public ResponseEntity<Shop> createShop(@RequestBody Shop shop){
        return new ResponseEntity<Shop>(shopService.createShop(shop), HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping("/{ownerusername}")
    public ResponseEntity<Shop> getShopByOwnerUsername(@PathVariable("ownerusername") String ownerUsername){
        return new ResponseEntity<Shop>(shopService.getShopByShopId(ownerUsername), HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @PostMapping("/update")
    public ResponseEntity<Shop> updateShop(@RequestBody Shop shop){
        return new ResponseEntity<Shop>(shopService.updateShopInfo(shop), HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @DeleteMapping("/{username}")
    public ResponseEntity<Response> deleteShop(@PathVariable("username") String username){
        Response res = new Response();
        if(shopService.deleteShop(username)){
            res.setStatus("SUCCESS");
        }else{
            res.setStatus("FAILED");
        }
        return new ResponseEntity<Response>(res, HttpStatus.ACCEPTED);
    }

}
