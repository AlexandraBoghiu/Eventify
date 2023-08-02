package com.alexandra.eventappbackend.Controllers;

import com.alexandra.eventappbackend.Entities.Event;
import com.alexandra.eventappbackend.Entities.Rating;
import com.alexandra.eventappbackend.Services.RatingService;
import com.alexandra.eventappbackend.Services.RecommendationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class RecommendationsController {
    private RecommendationsService recommendationsService;
    private RatingService ratingService;

    @Autowired
    public RecommendationsController(RecommendationsService recommendationsService, RatingService ratingService) {
        this.recommendationsService = recommendationsService;
        this.ratingService = ratingService;
    }

    @PostMapping("/recommend")
    public List<Event> getRecommendations(@RequestBody List<String> userEmails) {
        if (userEmails.size() > 1) {
            return recommendationsService.getRecommendations(ratingService.getAllRatings(), userEmails);

        } else {
            return recommendationsService.getRecommendationsForUser(ratingService.getAllRatings(), userEmails.get(0));
        }
    }
}