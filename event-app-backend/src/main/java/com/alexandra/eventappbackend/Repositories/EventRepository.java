package com.alexandra.eventappbackend.Repositories;

import com.alexandra.eventappbackend.Entities.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Integer> {

    Event findByEventId(Integer eventId);
    List<Event> findEventsByOrganizer(String organizer);
}
