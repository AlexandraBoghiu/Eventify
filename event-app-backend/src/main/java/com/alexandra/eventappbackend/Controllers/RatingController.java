package com.alexandra.eventappbackend.Controllers;

import com.alexandra.eventappbackend.DTOs.RatingDto;
import com.alexandra.eventappbackend.Entities.Event;
import com.alexandra.eventappbackend.Entities.User;
import com.alexandra.eventappbackend.Services.RatingService;
import com.alexandra.eventappbackend.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class RatingController {
    private RatingService ratingService;

    @Autowired
    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @PostMapping("/rating")
    public void saveRating(@RequestBody RatingDto ratingDto) {
        ratingService.saveRating(ratingDto);
    }

    @PostMapping("/rating-value")
    public Integer getRating(@RequestBody RatingDto ratingDto) {
        return ratingService.getRatingValue(ratingDto);
    }
}
