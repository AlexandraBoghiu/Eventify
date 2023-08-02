package com.alexandra.eventappbackend.Repositories;

import com.alexandra.eventappbackend.Entities.Comment;
import com.alexandra.eventappbackend.Entities.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    Comment findByComId(Integer commentId);
}
