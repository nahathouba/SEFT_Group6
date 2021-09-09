package com.rmit.sept.bk_loginservices.exceptions;

public class BookNotExistException extends RuntimeException{
    public BookNotExistException(String msg){
        super(msg);
    }
}