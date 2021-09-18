package com.rmit.sept.bk_bookServices.validator;

import com.rmit.sept.bk_bookServices.exceptions.ISBNFormatIncorrectException;
import com.rmit.sept.bk_bookServices.model.Book;
import com.rmit.sept.bk_bookServices.model.BookRequest;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class BookRequestValidator implements Validator {
    @Override
    public boolean supports(Class<?> aClass){ return Book.class.equals(aClass); }

    @Override
    public void validate(Object obj, Errors errors){
        BookRequest bookRequest = (BookRequest) obj;

        if (!bookRequest.getSort().equals("author") && !bookRequest.equals("title") &&
            !bookRequest.getSort().equals("isbn") && !bookRequest.equals("category")){
            errors.rejectValue("sort", "type", "Sorting attribute must be valid");
        }

        long isbnMin = 1000000000000l;
        if(bookRequest.getSort().equals("isbn")){
            try{
                if(Integer.parseInt(bookRequest.getValue()) < isbnMin){
                    errors.rejectValue("isbn", "Length", "ISBN must be at least 13 characters");
                }
            }catch (Exception e){
                throw new ISBNFormatIncorrectException("ISBN must be numeric");
            }
        }
    }
}
