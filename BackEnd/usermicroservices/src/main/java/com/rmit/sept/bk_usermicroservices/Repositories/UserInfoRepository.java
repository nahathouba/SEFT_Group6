package com.rmit.sept.bk_usermicroservices.Repositories;


import com.rmit.sept.bk_usermicroservices.model.UserInfo;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserInfoRepository extends MongoRepository<UserInfo, ObjectId> {

    public UserInfo findByUsername(String username);
    public List<UserInfo> findByFullname(String full_name);

}
