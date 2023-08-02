package com.alexandra.eventappbackend.Services;

import com.alexandra.eventappbackend.DTOs.EventDto;
import com.alexandra.eventappbackend.Entities.Event;
import com.alexandra.eventappbackend.Entities.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Set;

public interface EventService {

    void saveEvent(EventDto eventDto, MultipartFile file) throws IOException;
    List<Event> getEvents();
    List<Event> getUserSavedEvents(Set<Integer> eventId);
    Event getEventById(Integer eventId);
    List<Event> findEventsByOrganizer(String userEmail);

}
