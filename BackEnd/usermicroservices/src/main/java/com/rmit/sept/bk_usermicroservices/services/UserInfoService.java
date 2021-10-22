package com.rmit.sept.bk_usermicroservices.services;

import com.rmit.sept.bk_usermicroservices.Repositories.UserInfoRepository;
import com.rmit.sept.bk_usermicroservices.exceptions.UserNotFoundException;
import com.rmit.sept.bk_usermicroservices.model.Response;
import com.rmit.sept.bk_usermicroservices.model.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserInfoService {
    @Autowired
    private UserInfoRepository userInfoRepository;

    public UserInfo register(UserInfo userInfo){
        return userInfoRepository.save(userInfo);
    }

    public UserInfo getUserInfo (String username){
        UserInfo objUser = new UserInfo();
        try{
            objUser = userInfoRepository.findByUsername(username);
        }catch (Exception e){
            throw new UserNotFoundException("The user requesting is not found in the database.");
        }

        return objUser;
    }

    public UserInfo updateUserProfile (UserInfo user){
        UserInfo objUser = new UserInfo();
        try{
            objUser = userInfoRepository.findByUsername(user.getUsername());
//            userRepository.delete(objUser);
        }catch (Exception e){
            throw new UserNotFoundException("The user requesting is not found in the database.");
        }
        objUser.setGender(user.getGender());
        objUser.setAddress(user.getAddress());
        // objUser.setStatus(user.getStatus());
        objUser.setAbout(user.getAbout());

        return userInfoRepository.save(objUser);
    }

    public UserInfo deleteUser(String username){
        UserInfo objUser = new UserInfo();
        try{
            objUser = userInfoRepository.findByUsername(username);
            userInfoRepository.delete(objUser);
        }catch (Exception e){
            throw new UserNotFoundException("The user requesting is not found in the database.");
        }
        return objUser;
    }

    public UserInfo blockUser(String username){
        UserInfo objUser = new UserInfo();
        try{
            objUser = userInfoRepository.findByUsername(username);
            objUser.setStatus("BLOCK");
        }catch (Exception e){
            throw new UserNotFoundException("The user requesting is not found in the database.");
        }

        return userInfoRepository.save(objUser);
    }

    public UserInfo unblockUser(String username){
        UserInfo objUser = new UserInfo();
        try{
            objUser = userInfoRepository.findByUsername(username);
            objUser.setStatus("NORMAL");
        }catch (Exception e){
            throw new UserNotFoundException("The user requesting is not found in the database.");
        }
        return userInfoRepository.save(objUser);
    }

    public UserInfo changeUserRole(String username, String role){
        UserInfo objUser = new UserInfo();
        try{
            objUser = userInfoRepository.findByUsername(username);
            objUser.setRole(role);
        }catch (Exception e){
            throw new UserNotFoundException("The user requesting is not found in the database.");
        }
        return userInfoRepository.save(objUser);
    }

    public Response deleteUserInfo(String username){
        Response res = new Response();
        userInfoRepository.delete(userInfoRepository.findByUsername(username));
        res.setStatus("SUCCESS");
        return res;
    }
}
