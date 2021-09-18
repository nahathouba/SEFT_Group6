package com.rmit.sept.bk_loginservices;

import static org.junit.Assert.assertTrue;

import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.web.UserController;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;




@SpringBootTest
class msloginTests {

    // @Test
    // void contextLoads() {
    // }

    User user;
    UserController uc;

    @BeforeAll
    void setUp(){
        user = new User();
        uc = new UserController();
    }

    @Test
    void testDeleteUser(){
        assertTrue(uc.deleteUser("xxx") != null);
    }

    @Test
    void testGetUserInfo(){
        assertTrue(uc.getUserInfo("xxx") != null);
    }

}
