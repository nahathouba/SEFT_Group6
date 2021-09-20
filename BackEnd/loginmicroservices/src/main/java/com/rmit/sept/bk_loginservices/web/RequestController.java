package com.rmit.sept.bk_loginservices.web;

import com.rmit.sept.bk_loginservices.model.Request;
import com.rmit.sept.bk_loginservices.services.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shopOwner_requests")
public class RequestController {
    @Autowired
    private RequestService requestService;

    @CrossOrigin
    @GetMapping("/get/{current_Username}")
    public ResponseEntity<List<Request>> getRequestsByCurrentUser(@PathVariable("current_Username") String recipientUsername){
        return new ResponseEntity<List<Request>>(requestService.getRequests(recipientUsername), HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @PostMapping("/post")
    public ResponseEntity<Request> saveRequest(Request request){
        return new ResponseEntity<Request>(requestService.saveRequest(request), HttpStatus.ACCEPTED);
    }
}
