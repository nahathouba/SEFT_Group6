package com.rmit.sept.bk_loginservices.services;




import com.rmit.sept.bk_loginservices.Repositories.UserRepository;
import com.rmit.sept.bk_loginservices.exceptions.UserNotFoundException;
import com.rmit.sept.bk_loginservices.exceptions.UsernameAlreadyExistsException;
import com.rmit.sept.bk_loginservices.model.PasswordChangingRequest;
import com.rmit.sept.bk_loginservices.model.Response;
import com.rmit.sept.bk_loginservices.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import sun.security.util.Password;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

//    private User objUser;

    public User saveUser (User newUser){

      /*  newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
        //Username has to be unique (exception)
        // Make sure that password and confirmPassword match
        // We don't persist or show the confirmPassword
        return userRepository.save(newUser);
       */
        try{
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
            //Username has to be unique (exception)
            newUser.setUsername(newUser.getUsername());
            // Make sure that password and confirmPassword match
            // We don't persist or show the confirmPassword
            newUser.setConfirm_password("");
            newUser.setStatus("NORMAL");
            newUser.setRole("PUBLIC");
            return userRepository.save(newUser);

        }catch (Exception e){
            throw new UsernameAlreadyExistsException("Username '"+newUser.getUsername()+"' already exists");
        }

    }

    public User getUserInfo (String username, String password){
        User objUser = new User();
        try{
            objUser = userRepository.findByUsername(username);
        }catch (Exception e){
            throw new UserNotFoundException("The user requesting is not found in the database.");
        }

        return objUser;
    }

    public User updateUserProfile (User user){
        User objUser = new User();
        try{
            objUser = userRepository.findByUsername(user.getUsername());
            userRepository.delete(objUser);
        }catch (Exception e){
            throw new UserNotFoundException("The user requesting is not found in the database.");
        }
        objUser.setGender(user.getGender());
        objUser.setAddress(user.getAddress());
        objUser.setStatus(user.getStatus());
        //objUser.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));

        return userRepository.save(objUser);
    }

    public Response updateUserPassword(PasswordChangingRequest request){
        Response response = new Response();
        User objUser = new User();
        try{
            objUser = userRepository.findByUsername(request.getUsername());
        }catch (Exception e){
            throw new UserNotFoundException("The user requesting is not found in the database.");
        }
        if(objUser.getPassword().equals(request.getOld_password())){
            userRepository.updateUserPassword(bCryptPasswordEncoder.encode(request.getNew_password()), request.getUsername());
            objUser.setPassword(bCryptPasswordEncoder.encode(request.getNew_password()));
            response.setStatus("PASS");
        }else{
            response.setStatus("FAIL");
        }
        return response;
    }

    public User deleteUser(String username){
        User objUser = new User();
        try{
            objUser = userRepository.findByUsername(username);
            userRepository.delete(objUser);
        }catch (Exception e){
            throw new UserNotFoundException("The user requesting is not found in the database.");
        }
        return objUser;
    }

    public User blockUser(String username){
        User objUser = new User();
        try{
            int updated = userRepository.updateUserStatus(username, "BLOCK");
            objUser = userRepository.findByUsername(username);
        }catch (Exception e){
            throw new UserNotFoundException("The user requesting is not found in the database.");
        }

        return objUser;
    }

    public User unblockUser(String username){
        User objUser = new User();
        try{
            int updated = userRepository.updateUserStatus(username, "NORMAL");
            objUser = userRepository.findByUsername(username);
        }catch (Exception e){
            throw new UserNotFoundException("The user requesting is not found in the database.");
        }
        return objUser;
    }

    public User changeUserRole(String username, String role){
        User objUser = new User();
        try{
            int updated = userRepository.updateUserRole(role, username);
            objUser = userRepository.findByUsername(username);
        }catch (Exception e){
            throw new UserNotFoundException("The user requesting is not found in the database.");
        }
        objUser.setPassword("");
        return objUser;
    }
}
