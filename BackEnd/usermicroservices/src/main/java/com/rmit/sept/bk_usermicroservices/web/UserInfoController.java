package com.rmit.sept.bk_usermicroservices.web;


import com.rmit.sept.bk_usermicroservices.model.Response;
import com.rmit.sept.bk_usermicroservices.model.UserInfo;
import com.rmit.sept.bk_usermicroservices.services.MapValidationErrorService;
import com.rmit.sept.bk_usermicroservices.services.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/users")
public class UserInfoController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private UserInfoService userService;

    @CrossOrigin
    @PostMapping("/profile/create")
    public ResponseEntity<?> register(@RequestBody UserInfo user, BindingResult result){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;
        return new ResponseEntity<UserInfo>(userService.register(user), HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @PostMapping("/profile/update")
    public ResponseEntity<?> updateUserProfile(@RequestBody UserInfo user, BindingResult result){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;
        user = userService.updateUserProfile(user);
        return new ResponseEntity<UserInfo>(user, HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping ("/get/{username}")
    public ResponseEntity<?> getUserInfo(@PathVariable("username") String username){
        return new ResponseEntity<UserInfo>(userService.getUserInfo(username), HttpStatus.ACCEPTED);
    }

    // @CrossOrigin
    // @DeleteMapping ("/{username}")
    // public ResponseEntity<Response> deleteUser(@PathVariable("username") String username){
    //     userService.deleteUser(username);
    //     Response response = new Response();
    //     response.setStatus("SUCCESS");
    //     return new ResponseEntity<Response>(response, HttpStatus.ACCEPTED);
    // }

    @CrossOrigin
    @GetMapping("/block/{username}")
    public ResponseEntity<Response> blockUser(@PathVariable("username") String username){
        userService.blockUser(username);
        Response response = new Response();
        response.setStatus("SUCCESS");
        return new ResponseEntity<Response>(response, HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping("/unblock/{username}")
    public ResponseEntity<Response> unblockUser(@PathVariable("username") String username){
        userService.unblockUser(username);
        Response response = new Response();
        response.setStatus("SUCCESS");
        return new ResponseEntity<Response>(response, HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @DeleteMapping("/{username}")
    public ResponseEntity<Response> deleteUser(@PathVariable("username") String username){
        return new ResponseEntity<Response>(userService.deleteUserInfo(username), HttpStatus.ACCEPTED);
    }

}
