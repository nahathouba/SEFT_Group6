package com.rmit.sept.bk_messageservices.Repositories;

import com.rmit.sept.bk_messageservices.model.Message;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface MessageRepository extends MongoRepository<Message, ObjectId> {
    List<Message> findAllByRecipientUsername(String recipientUsername);
    Message findMessageById(ObjectId id);
    Message getById(ObjectId id);
    List<Message> findMessageByRequesterUsernameAndRecipientUsernameAndType(String requesterUsername, String recipientUsername, String type);
    List<Message> findAll();
}
