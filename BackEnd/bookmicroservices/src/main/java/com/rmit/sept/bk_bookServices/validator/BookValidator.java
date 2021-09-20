package com.rmit.sept.bk_bookServices.validator;

import com.rmit.sept.bk_bookServices.model.Book;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class BookValidator implements Validator {

    @Override
    public boolean supports(Class<?> aClass){ return Book.class.equals(aClass); }

    @Override
    public void validate(Object obj, Errors errors){
        Book book = (Book) obj;
        long isbnMin = 1000000000000l;

        if(book.getIsbn() < isbnMin){
            errors.rejectValue("isbn","Length", "ISBN must be at least 13 characters");
        }
    }
}
