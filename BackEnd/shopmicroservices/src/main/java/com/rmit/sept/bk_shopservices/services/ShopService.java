package com.rmit.sept.bk_shopservices.services;

import com.rmit.sept.bk_shopservices.Repositories.ShopRepository;
import com.rmit.sept.bk_shopservices.model.Shop;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShopService {
    @Autowired
    private ShopRepository shopRepository;

    public Shop createShop(Shop shop){
        return shopRepository.save(shop);
    }

    public Shop getShopByShopId(String username){
        return shopRepository.findShopByShopId(username);
    }

    public Shop updateShopInfo(Shop shop){
        Shop objShop = shopRepository.findShopByShopId(shop.getShopId());
        objShop.setName(shop.getName());
        objShop.setImageUrl(shop.getImageUrl());
        return shopRepository.save(objShop);
    }

    public boolean deleteShop(String username){
        boolean success = false;
        Shop objShop = shopRepository.findShopByShopId(username);
        if(objShop != null){
            success = true;
            shopRepository.delete(objShop);
        }
        return success;
    }
}
