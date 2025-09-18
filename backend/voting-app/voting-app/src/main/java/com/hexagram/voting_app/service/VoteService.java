package com.hexagram.voting_app.service;

import com.hexagram.voting_app.dto.VoteRequest;
import com.hexagram.voting_app.entity.Vote;
import com.hexagram.voting_app.repository.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class VoteService {
    
    private final VoteRepository voteRepository;
    
    @Autowired
    public VoteService(VoteRepository voteRepository) {
        this.voteRepository = voteRepository;
    }
    
    public Vote createVote(VoteRequest voteRequest) {
        Vote vote = new Vote(voteRequest.getUserId(), voteRequest.getSelection());
        return voteRepository.save(vote);
    }

    // ✅ Get all votes
    public List<Vote> getAllVotes() {
        return voteRepository.findAll();
    }

    public long getVoteCount() {
    return voteRepository.count();
    }

    // ✅ Get a vote by its ID
    public Vote getVoteById(Long id) {
        Optional<Vote> vote = voteRepository.findById(id);
        return vote.orElse(null); // or throw custom exception if preferred
    }
}
