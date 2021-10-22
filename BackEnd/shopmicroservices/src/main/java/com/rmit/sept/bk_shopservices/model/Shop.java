package com.rmit.sept.bk_shopservices.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Shop")
public class Shop {
    @Id
    private String shopId;

    private String name;
    private String imageUrl;

    public Shop() {}

    public Shop(String shopId, String name, String imageUrl) {
        this.shopId = shopId;
        this.name = name;
        this.imageUrl = imageUrl;
    }

    public String getShopId() {
        return shopId;
    }

    public void setShopId(String shopId) {
        this.shopId = shopId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @Override
    public String toString() {
        return "Shop{" +
                "shopId='" + shopId + '\'' +
                ", name='" + name + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                '}';
    }
}
