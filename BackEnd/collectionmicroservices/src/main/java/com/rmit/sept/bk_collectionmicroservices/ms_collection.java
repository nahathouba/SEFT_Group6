package com.rmit.sept.bk_collectionmicroservices;

import com.rmit.sept.bk_collectionmicroservices.model.Item;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.sql.Timestamp;
import java.util.Date;

@SpringBootApplication
public class ms_collection {
    // ms_collections class starter
    public static void main(String[] args) { SpringApplication.run(ms_collection.class, args); }
//    public static void main(String[] args) {
//        Item i = new Item();
//        Date d = new Date();
//        i.setAddingDate(new Timestamp(d.getTime()));
//        System.out.print(i.getAddingDate().toString());
//    }
}
