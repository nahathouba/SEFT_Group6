package com.rmit.sept.bk_shopservices.bk_shopservices;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ms_shop {

    public static void main(String[] args) {
        SpringApplication.run(ms_shop.class, args);
    }

    @Bean
    public TomcatServletWebServerFactory servletContainer(){
        TomcatServletWebServerFactory tc = new TomcatServletWebServerFactory();
        tc.setPort(8802);
        return tc;
    }

}
