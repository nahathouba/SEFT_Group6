package com.rmit.sept.bk_loginservices.web;


import com.rmit.sept.bk_loginservices.model.PasswordChangingRequest;
import com.rmit.sept.bk_loginservices.model.Response;
import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.payload.JWTLoginSucessReponse;
import com.rmit.sept.bk_loginservices.payload.LoginRequest;
import com.rmit.sept.bk_loginservices.security.JwtTokenProvider;
import com.rmit.sept.bk_loginservices.services.MapValidationErrorService;
import com.rmit.sept.bk_loginservices.services.UserService;
import com.rmit.sept.bk_loginservices.validator.UserValidator;
import com.sun.xml.internal.ws.api.FeatureListValidatorAnnotation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.rmit.sept.bk_loginservices.security.SecurityConstant.TOKEN_PREFIX;


@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserValidator userValidator;


    @CrossOrigin
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result){
        // Validate passwords match
        userValidator.validate(user,result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null)return errorMap;

        User newUser = userService.saveUser(user);

        return  new ResponseEntity<User>(newUser, HttpStatus.CREATED);
    }


    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;


    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX +  tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JWTLoginSucessReponse(true, jwt));
//        User objUser = userService.getUserInfo(loginRequest.getUsername(), "");
//        return new ResponseEntity<User> (objUser, HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @PostMapping("/profile/update")
    public ResponseEntity<?> updateUserProfile(@Valid @RequestBody User user, BindingResult result){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;
        user = userService.updateUserProfile(user);
        user.setPassword("");
        return new ResponseEntity<User>(user, HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @PostMapping("/update/password")
    public ResponseEntity<?> updateUserPassword(@Valid @RequestBody PasswordChangingRequest request, BindingResult result){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;
        Response response;
        response = userService.updateUserPassword(request);
        return new ResponseEntity<Response>(response, HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping ("/get/{username}")
    public ResponseEntity<?> getUserInfo(@PathVariable("username") String username){
        return new ResponseEntity<User>(userService.getUserInfo(username, ""), HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @DeleteMapping ("/{username}")
    public ResponseEntity<Response> deleteUser(@PathVariable("username") String username){
        userService.deleteUser(username);
        Response response = new Response();
        response.setStatus("SUCCESS");
        return new ResponseEntity<Response>(response, HttpStatus.ACCEPTED);
    }

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
    @GetMapping("/role/change/{username}%{role}")
    public ResponseEntity<User> changeUsrRole(@PathVariable("username") String username, @PathVariable("role") String role) {
        return new ResponseEntity<User>(userService.changeUserRole(role, username), HttpStatus.ACCEPTED);
    }

}
