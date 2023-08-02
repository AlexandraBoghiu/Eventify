package com.alexandra.eventappbackend.Services;

import com.alexandra.eventappbackend.Entities.Event;
import com.alexandra.eventappbackend.Entities.Rating;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class RecommendationsService {

    private Map<String, Map<Integer, Integer>> userItemMatrix;
    private EventService eventService;

    @Autowired
    public RecommendationsService(EventService eventService) {
        userItemMatrix = new HashMap<>();
        this.eventService = eventService;
    }

    public void addRating(String userEmail, Integer event, Integer rating) {
        if (!userItemMatrix.containsKey(userEmail)) {
            userItemMatrix.put(userEmail, new HashMap<>());
        }
        userItemMatrix.get(userEmail).put(event, rating);
        System.out.println(userItemMatrix.get(userEmail));
    }

    public List<Event> recommendEvents(String userEmail, int numRec) {
        Map<String, Double> userSimilarities = new HashMap<>();
        for (String user : userItemMatrix.keySet()) {
            if (!user.equals(userEmail)) {
                Double cosSim = getCosineSimilarity(userEmail, user);
                userSimilarities.put(user, cosSim);
            }
        }
        Map<Integer, Double> scores = new HashMap<>();
        for (String user : userSimilarities.keySet()) {
            Double similarity = userSimilarities.get(user);
            for (Integer event : userItemMatrix.get(user).keySet()) {
                if (!userItemMatrix.get(userEmail).containsKey(event)) {
                    Integer rating = userItemMatrix.get(user).get(event);
                    scores.put(event, scores.getOrDefault(event, 0.0) +
                            (similarity * rating));
                }
            }
        }
        List<Map.Entry<Integer, Double>> sortedEvents = new ArrayList<>(
                scores.entrySet());
        sortedEvents.sort((event1, event2) -> event2.getValue().compareTo(event1.getValue()));
        List<Event> rec = new ArrayList<>();
        for (int i = 0; i < numRec && i < sortedEvents.size(); i++) {
            Integer eventId = sortedEvents.get(i).getKey();
            rec.add(eventService.getEventById(eventId));
        }
        return rec;
    }

    private double getCosineSimilarity(String user1, String user2) {
        Set<Integer> commonEvents = new HashSet<>(userItemMatrix.get(user1).keySet());
        commonEvents.retainAll(userItemMatrix.get(user2).keySet());
        Double product = 0.0;
        Double norm1 = 0.0;
        Double norm2 = 0.0;
        for (Integer event : commonEvents) {
            Integer rating1 = userItemMatrix.get(user1).get(event);
            Integer rating2 = userItemMatrix.get(user2).get(event);

            product += rating1 * rating2;
            norm1 += Math.pow(rating1, 2);
            norm2 += Math.pow(rating2, 2);
        }

        if (norm1 == 0.0 || norm2 == 0.0) {
            return 0.0;
        } else {
            norm1 = Math.sqrt(norm1);
            norm2 = Math.sqrt(norm2);
        }

        return product / (norm1 * norm2);
    }

    public List<Event> getRecommendations(List<Rating> ratings, List<String> userEmails) {
        for (Rating rating : ratings) {
            this.addRating(rating.getEmail(), rating.getEventId(), rating.getRating());
        }

        List<Event> recommendations = new ArrayList<>();
        for (String userEmail : userEmails) {
            recommendations.addAll(this.recommendEvents(userEmail, 10));
        }

        Map<Integer, Integer> eventCounts = new HashMap<>();
        for (Event event : recommendations) {
            eventCounts.put(event.getEventId(), eventCounts.getOrDefault(event.getEventId(), 0) + 1);
        }

        List<Event> commonEvents = new ArrayList<>();
        commonEvents = eventCounts.entrySet().stream()
                .filter(entry -> entry.getValue() == userEmails.size())
                .map(entry -> eventService.getEventById(entry.getKey()))
                .collect(Collectors.toList());

        return commonEvents;
    }

    public List<Event> getRecommendationsForUser(List<Rating> ratings, String userEmail) {
        for (Rating rating : ratings) {
            this.addRating(rating.getEmail(), rating.getEventId(), rating.getRating());
        }

        List<Event> recommendations = this.recommendEvents(userEmail, 5);
        return recommendations;
    }
}
