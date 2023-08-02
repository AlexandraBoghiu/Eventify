package com.alexandra.eventappbackend.Services;

import com.alexandra.eventappbackend.DTOs.RatingDto;
import com.alexandra.eventappbackend.Entities.Rating;
import org.springframework.stereotype.Service;

import java.util.List;

public interface RatingService {

    void saveRating(RatingDto ratingDto);
    Integer getRatingValue(RatingDto ratingDto);
    List<Rating> getAllRatings();
}
