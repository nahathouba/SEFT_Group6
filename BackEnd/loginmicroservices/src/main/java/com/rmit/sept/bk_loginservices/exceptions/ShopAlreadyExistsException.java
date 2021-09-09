package com.rmit.sept.bk_loginservices.exceptions;

public class ShopAlreadyExistsException extends RuntimeException{
    public ShopAlreadyExistsException(String msg){
        super(msg);
    }
}
