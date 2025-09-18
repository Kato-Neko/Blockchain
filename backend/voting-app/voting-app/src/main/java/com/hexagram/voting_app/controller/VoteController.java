package com.hexagram.voting_app.controller;

import com.hexagram.voting_app.dto.VoteRequest;
import com.hexagram.voting_app.entity.Vote;
import com.hexagram.voting_app.service.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/votes")
@CrossOrigin(origins = "*")
public class VoteController {
    
    private final VoteService voteService;
    
    @Autowired
    public VoteController(VoteService voteService) {
        this.voteService = voteService;
    }
    
    @PostMapping
    public ResponseEntity<Vote> createVote(@RequestBody VoteRequest voteRequest) {
        Vote savedVote = voteService.createVote(voteRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedVote);
    }
}
