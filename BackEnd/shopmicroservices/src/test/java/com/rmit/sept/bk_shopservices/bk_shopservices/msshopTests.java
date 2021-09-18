package com.rmit.sept.bk_shopservices.bk_shopservices;

import com.rmit.sept.bk_shopservices.bk_shopservices.model.Shop;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.validation.BindingResult;

@SpringBootTest
class msshopTests {

    // @Test
    // void contextLoads() {
    // }

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BindingResult bindingResult;

    private Shop shop;

    @BeforeAll
    void setup() throws Exception{
        shop = new Shop();
    }

    @Test
    public void testCreateNewShop() throws Exception{
        Mockito.when(bindingResult.hasErrors()).thenReturn(true);
        mockMvc.perform(MockMvcRequestBuilders.post("/create").contentType(MediaType.APPLICATION_JSON)).andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

}
