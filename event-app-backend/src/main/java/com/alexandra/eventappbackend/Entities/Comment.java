package com.alexandra.eventappbackend.Entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "COMMENT")
public class Comment {
    @Id
    private String comId;

    @Column
    private String eventId;

    @Column
    private String  userId;

    @Column
    private String avatarUrl;

    @Column
    private String userProfile;

    @Column
    private String fullName;

    @Column
    private String text;

    @Column
    @ElementCollection
    private Set<String> replies;
}
