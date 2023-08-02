package com.alexandra.eventappbackend.Services;

import com.alexandra.eventappbackend.DTOs.CommentDto;
import com.alexandra.eventappbackend.DTOs.UserDto;
import com.alexandra.eventappbackend.Entities.Comment;
import com.alexandra.eventappbackend.Entities.Event;

import java.util.List;

public interface CommentService {
    void saveComment(CommentDto commentDto);
    List<Comment> getCommentsByEventId(Integer eventId);
}
