package com.rmit.sept.bk_messageservices.services;

import com.rmit.sept.bk_messageservices.Repositories.MessageRepository;
import com.rmit.sept.bk_messageservices.model.Message;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {
    @Autowired
    private MessageRepository requestRepository;

    public Message saveNotification(Message newRequest){
        Message replacedRequest = new Message();
        if(newRequest.getRequesterUsername() != null && newRequest.getRecipientUsername() != null){
            return requestRepository.save(newRequest);
        }else{
            return replacedRequest;
        }
    }

    public Message saveRequest(Message newRequest){
        Message replacedRequest = new Message();
        if(newRequest.getRequesterUsername() != null && newRequest.getRecipientUsername() != null){
            newRequest.setType("upgrade_request");
            return requestRepository.save(newRequest);
        }else{
            return replacedRequest;
        }
    }

    public List<Message> getAllRequests(String recipientUsername){
        List<Message> requests = requestRepository.findAllByRecipientUsername(recipientUsername);
        return requests;
    }

    public boolean getUnreadStatus(String recipientUsername){
        boolean unread = false;
        List<Message> res = getAllRequests(recipientUsername);
        for(Message msg: res){
            if(msg.getStatus() == true) unread = true;
        }
        return unread;
    }

    public boolean setMsgRead(ObjectId messageId){
        boolean success = true;
        Message msg = requestRepository.getById(messageId);
        if(msg != null){
            msg.setStatus(false);
            requestRepository.save(msg);
        }else{
            success = false;
        }
        return success;
    }
}
