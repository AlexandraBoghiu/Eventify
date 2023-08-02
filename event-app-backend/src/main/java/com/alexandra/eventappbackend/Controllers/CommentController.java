package com.alexandra.eventappbackend.Controllers;

import com.alexandra.eventappbackend.DTOs.CommentDto;
import com.alexandra.eventappbackend.DTOs.EventDto;
import com.alexandra.eventappbackend.DTOs.UserDto;
import com.alexandra.eventappbackend.Entities.Comment;
import com.alexandra.eventappbackend.Entities.User;
import com.alexandra.eventappbackend.Services.CommentService;
import com.alexandra.eventappbackend.Services.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class CommentController {
    private CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/comment")
    public boolean saveComment(@RequestParam("json") String commentDto, @RequestParam("eventId") Integer eventId) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        CommentDto comment = objectMapper.readValue(commentDto, CommentDto.class);
        comment.setEventId(eventId.toString());
        commentService.saveComment(comment);
        return true;
    }

    @PostMapping("/comment-list/{eventId}")
    public List<Comment> getCommentsByEventId(@PathVariable Integer eventId) {
        List<Comment> comments = commentService.getCommentsByEventId(eventId);
        Collections.reverse(comments);
        return comments;
    }
}
