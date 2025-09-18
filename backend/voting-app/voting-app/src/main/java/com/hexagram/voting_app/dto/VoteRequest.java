package com.hexagram.voting_app.dto;

public class VoteRequest {
    private Long userId;
    private String selection;
    
    public VoteRequest() {}
    
    public VoteRequest(Long userId, String selection) {
        this.userId = userId;
        this.selection = selection;
    }
    
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
    public String getSelection() {
        return selection;
    }
    
    public void setSelection(String selection) {
        this.selection = selection;
    }
}
