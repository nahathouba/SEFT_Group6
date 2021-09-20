package com.rmit.sept.bk_shopservices.bk_shopservices.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ShopNameAlreadyExistsException extends RuntimeException{

    public ShopNameAlreadyExistsException(String msg){ super(msg); }
}
