package com.alexandra.eventappbackend.Entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "EVENT")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer eventId;

    @Column
    private String name;

    @Column
    private LocalDate creationDate;

    @Column
    private LocalDate startDate;

    @Column
    private LocalDate endDate;

    @Column
    private LocalTime startTime;

    @Column
    private LocalTime endTime;

    @Column
    private String description;

    @Column
    private String location;

    @Column
    private String locationDetails;

//    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
//    @JoinColumn(name = "userId")
    @Column
    private String organizer;

    @Column
    private String category;

    @Column
    @ElementCollection
    private Set<String> tags;

    @Column
    private String imagePath;

}
