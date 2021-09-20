package com.rmit.sept.bk_loginservices.services;

import com.rmit.sept.bk_loginservices.Repositories.RequestRepository;
import com.rmit.sept.bk_loginservices.model.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RequestService {
    @Autowired
    private RequestRepository requestRepository;

    public Request saveRequest(Request newRequest){
        Request replacedRequest = new Request();
        if(newRequest.getRequesterUsername() != null && newRequest.getRecipientUsername() != null){
            return requestRepository.save(newRequest);
        }else{
            return replacedRequest;
        }
    }

    public List<Request> getRequests(String recipientUsername){
        List<Request> requests = requestRepository.findAllByRecipientUsername(recipientUsername);
        return requests;
    }
}
