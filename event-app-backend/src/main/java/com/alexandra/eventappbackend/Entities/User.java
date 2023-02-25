package com.alexandra.eventappbackend.Entities;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "USERS")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String userName;

    @Column(nullable = false)
    private String password; //todo make secure

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    //@Column(nullable = false)
    private LocalDate dateOfBirth;

    @Column(nullable = false)
 //   @Size(min = 0, max = 1) //0 - regular user; 1 - moderator/admin ?
    private Integer roleType;
}
