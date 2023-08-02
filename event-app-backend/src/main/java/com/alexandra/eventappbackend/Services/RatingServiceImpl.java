package com.alexandra.eventappbackend.Services;

import com.alexandra.eventappbackend.DTOs.RatingDto;
import com.alexandra.eventappbackend.Entities.Rating;
import com.alexandra.eventappbackend.Repositories.CommentRepository;
import com.alexandra.eventappbackend.Repositories.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class RatingServiceImpl implements RatingService {

    private RatingRepository ratingRepository;

    @Autowired
    public RatingServiceImpl(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }

    @Transactional
    @Override
    public void saveRating(RatingDto ratingDto) {
        if (ratingRepository.findByEventIdAndEmail(ratingDto.getEventId(), ratingDto.getEmail()) != null) {
            ratingRepository.findByEventIdAndEmail(ratingDto.getEventId(), ratingDto.getEmail()).setRating(ratingDto.getRating());
        } else {
            Rating rating = new Rating();
            rating.setEmail(ratingDto.getEmail());
            rating.setEventId(ratingDto.getEventId());
            rating.setRating(ratingDto.getRating());

            ratingRepository.save(rating);
        }
    }

    @Override
    public Integer getRatingValue(RatingDto ratingDto) {
        if (ratingRepository.findByEventIdAndEmail(ratingDto.getEventId(), ratingDto.getEmail()) != null) {
            return ratingRepository.findByEventIdAndEmail(ratingDto.getEventId(), ratingDto.getEmail()).getRating();
        } else return 0;
    }

    @Override
    public List<Rating> getAllRatings() {
        return ratingRepository.findAll();
    }
}
