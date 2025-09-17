package com.hexagram.voting_app.repository;

import com.hexagram.voting_app.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {

    // Retrieve all votes by a specific user
    List<Vote> findByUserId(Long userId);

    // Count pila kabuok niboto sa specific selection
    Long countBySelection(String selection);
}
