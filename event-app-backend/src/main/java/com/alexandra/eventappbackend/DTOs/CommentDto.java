package com.alexandra.eventappbackend.DTOs;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class CommentDto {

    private String comId;
    private String eventId;
    private String userId;
    private String avatarUrl;
    private String userProfile;
    private String fullName;
    private String text;
    private List<Integer> replies;
}
