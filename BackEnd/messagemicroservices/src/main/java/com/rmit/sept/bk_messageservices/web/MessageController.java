package com.rmit.sept.bk_messageservices.web;

import com.rmit.sept.bk_messageservices.model.Message;
// import com.rmit.sept.bk_messageservices.model.MsgIdRequest;
import com.rmit.sept.bk_messageservices.model.Response;
import com.rmit.sept.bk_messageservices.services.MessageService;

// import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class MessageController {
    @Autowired
    private MessageService requestService;

    @CrossOrigin
    @GetMapping("/{current_Username}")
    public ResponseEntity<List<Message>> getRequestsByCurrentUser(@PathVariable("current_Username") String recipientUsername){
        return new ResponseEntity<List<Message>>(requestService.getAllRequests(recipientUsername), HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @PostMapping("/send")
    public ResponseEntity<Message> saveNotification(@RequestBody Message request){
        return new ResponseEntity<Message>(requestService.saveNotification(request), HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping("/unread/{current_Username}")
    public ResponseEntity<Response> getUnreadMsg(@PathVariable("current_Username") String recipientUsername){
        Response res = new Response();
        if(requestService.getUnreadStatus(recipientUsername)){
            res.setStatus("UNREAD");
        }else{
            res.setStatus("ALLREAD");
        }
        return new ResponseEntity<Response>(res, HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @PostMapping("/read")
    public ResponseEntity<Response> setMsgRead(@RequestBody Message msg){
        Response res = new Response();
        if(requestService.setMsgRead(msg)){
            res.setStatus("SUCCESS");
        }else{
            res.setStatus("FAILED");
        }
        return new ResponseEntity<Response>(res, HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping("/all")
    public ResponseEntity<List<Message>> getAll(){
        return new ResponseEntity<List<Message>>(requestService.showAll(), HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @PostMapping("/getmsg")
    public ResponseEntity<Response> getMsg(@RequestBody Message ms){
        Response res = new Response();
        System.out.println("Hi " + ms.getId());
        if(requestService.getMsg(ms.getId())){
            res.setStatus("SUCCESS");
        }else{
            res.setStatus("No");
        }
        return new ResponseEntity<Response>(res, HttpStatus.ACCEPTED);
    }
}
