package com.alexandra.eventappbackend.Repositories;

import com.alexandra.eventappbackend.Entities.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RatingRepository extends JpaRepository<Rating, Integer> {
    Rating findByEventIdAndEmail(Integer eventId, String email);
}
