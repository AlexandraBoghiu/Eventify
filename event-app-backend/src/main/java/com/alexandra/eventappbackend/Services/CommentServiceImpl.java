package com.alexandra.eventappbackend.Services;

import com.alexandra.eventappbackend.DTOs.CommentDto;
import com.alexandra.eventappbackend.DTOs.UserDto;
import com.alexandra.eventappbackend.Entities.Comment;
import com.alexandra.eventappbackend.Entities.Event;
import com.alexandra.eventappbackend.Entities.User;
import com.alexandra.eventappbackend.Exceptions.UserAlreadyExistException;
import com.alexandra.eventappbackend.Repositories.CommentRepository;
import com.alexandra.eventappbackend.Repositories.EventRepository;
import com.alexandra.eventappbackend.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class CommentServiceImpl implements CommentService {
    private CommentRepository commentRepository;
    static Integer idGenerator = 0;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @Override
    @Transactional
    public void saveComment(CommentDto commentDto) {
        Comment comment = new Comment();
        idGenerator++;
        comment.setComId(idGenerator.toString());
        comment.setText(commentDto.getText());
        comment.setEventId(commentDto.getEventId());
        comment.setUserId(commentDto.getUserId());
        comment.setFullName(commentDto.getFullName());
        comment.setAvatarUrl(commentDto.getAvatarUrl());
        comment.setUserProfile(commentDto.getUserProfile());
        commentRepository.save(comment);
    }

    @Override
    public List<Comment> getCommentsByEventId(Integer eventId) {
        System.out.println("aaaaa");
        List<Comment> commentList = new ArrayList<>();
        List<Comment> allCommentsList = commentRepository.findAll();
        for (Comment i : allCommentsList) {
            if (i.getEventId().equals(eventId.toString())) {
                commentList.add(i);
            }
        }
        return commentList;
    }
}
