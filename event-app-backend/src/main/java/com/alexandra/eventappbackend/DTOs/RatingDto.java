package com.alexandra.eventappbackend.DTOs;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RatingDto {
    private Integer ratingId;
    private String email;
    private Integer eventId;
    private Integer rating;
}
