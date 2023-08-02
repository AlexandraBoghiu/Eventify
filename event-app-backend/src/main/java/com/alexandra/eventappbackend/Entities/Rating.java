package com.alexandra.eventappbackend.Entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "RATING")
public class Rating { //embedded id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ratingId;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private Integer eventId;

    @Column(nullable = false)
    private Integer rating;
}
