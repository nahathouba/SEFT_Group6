package com.rmit.sept.bk_allocationservices.web;

import com.rmit.sept.bk_allocationservices.model.BookAllocations;
import com.rmit.sept.bk_allocationservices.services.BookAllocationsService;
import com.rmit.sept.bk_allocationservices.model.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/allocations")
public class BookAllocationController {
    @Autowired
    private BookAllocationsService bookAllocationsService;

    @CrossOrigin
    @PostMapping("/allocate")
    public ResponseEntity<?> allocateBookTo(@RequestBody BookAllocations bookAllocations){
        return new ResponseEntity<BookAllocations>(bookAllocationsService.collectBookTo(bookAllocations), HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @PostMapping("/deallocate")
    public ResponseEntity<?> deallocateBookFrom(@RequestBody BookAllocations bookAllocations){
        return new ResponseEntity<Response>(bookAllocationsService.removeBookFrom(bookAllocations), HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping("/collections/{username}")
    public ResponseEntity<List<BookAllocations>> getCollectionsByUsername(@PathVariable("username") String username){
        return new ResponseEntity<List<BookAllocations>>(bookAllocationsService.getCollectionsByUsername(username), HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping("/cart/{username}")
    public ResponseEntity<List<BookAllocations>> getCartByUsername(@PathVariable("username") String username){
        return new ResponseEntity<List<BookAllocations>>(bookAllocationsService.getCartByUsername(username), HttpStatus.ACCEPTED);
    }
}
