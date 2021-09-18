package com.rmit.sept.bk_loginservices.web;


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

    @PostMapping("/update/profile")
    public ResponseEntity<?> updateUserProfile(@Valid @RequestBody User user, BindingResult result){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;
        user = userService.updateUserProfile(user);
        return new ResponseEntity<User>(user, HttpStatus.ACCEPTED);
    }

    @PostMapping("/update/password")
    public ResponseEntity<?> updateUserPassword(@Valid @RequestBody User user, BindingResult result){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;
        user = userService.updateUserPassword(user);
        return new ResponseEntity<User>(user, HttpStatus.ACCEPTED);
    }

    @GetMapping ("/get/{username}")
    public ResponseEntity<?> getUserInfo(@PathVariable("username") String username){
        return new ResponseEntity<User>(userService.getUserInfo(username, ""), HttpStatus.ACCEPTED);
    }

    @PostMapping("/delete")
    public ResponseEntity<User> deleteUser(String username){
        return new ResponseEntity<User>(userService.deleteUser(username), HttpStatus.ACCEPTED);
    }
}
