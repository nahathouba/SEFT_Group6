package com.rmit.sept.bookmicroservices;

import static org.junit.Assert.assertTrue;

import javax.security.auth.message.callback.PrivateKeyCallback.Request;
import javax.validation.Valid;

import com.rmit.sept.bk_bookServices.model.Book;
import com.rmit.sept.bk_bookServices.web.BookController;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.validation.BindingResult;

@SpringBootTest
class BookmicroservicesApplicationTests {

    // @Test
    // void contextLoads() {
    // }
    
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BindingResult bindingResult;

    private Book book;

    @BeforeAll
    void setup() throws Exception{
        book = new Book();
    }

    @Test
    public void testCreateNewBook() throws Exception{
        Mockito.when(bindingResult.hasErrors()).thenReturn(true);
        mockMvc.perform(MockMvcRequestBuilders.post("api/books").contentType(MediaType.APPLICATION_JSON)).andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

}
