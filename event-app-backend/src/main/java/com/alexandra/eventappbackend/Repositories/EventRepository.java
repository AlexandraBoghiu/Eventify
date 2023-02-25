package com.alexandra.eventappbackend.Repositories;

import com.alexandra.eventappbackend.Entities.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Integer> {
}
