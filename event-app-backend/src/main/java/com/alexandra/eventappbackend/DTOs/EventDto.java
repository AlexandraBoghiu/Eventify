package com.alexandra.eventappbackend.DTOs;

import com.alexandra.eventappbackend.Entities.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;

@Getter
@Setter
public class EventDto {

    private String name;

    private String description;

    private LocalDate creationDate;

    private LocalDate startDate;

    private LocalDate endDate;

    private LocalTime startTime;

    private LocalTime endTime;

    private String location;

    private String locationDetails;

    private String organizer;

    private String category;

    private Set<String> tags;

    private String imagePath;
}
