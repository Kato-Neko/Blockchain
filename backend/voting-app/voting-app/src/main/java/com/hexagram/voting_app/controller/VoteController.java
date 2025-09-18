package com.hexagram.voting_app.controller;

import com.hexagram.voting_app.dto.VoteRequest;
import com.hexagram.voting_app.entity.Vote;
import com.hexagram.voting_app.service.VoteService;
import java.util.List;
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

    @GetMapping
    public ResponseEntity<List<Vote>> getAllVotes() {
        List<Vote> votes = voteService.getAllVotes();
        return ResponseEntity.ok(votes);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getVoteCount() {
        long count = voteService.getVoteCount();
        return ResponseEntity.ok(count);
    }

    @GetMapping("/id")
    public ResponseEntity<Vote> getVoteById(@PathVariable Long id) {
    Vote vote = voteService.getVoteById(id);
          if (vote != null) {
              return ResponseEntity.ok(vote);
          } else {
              return ResponseEntity.notFound().build();
          }
      }
  }
}

