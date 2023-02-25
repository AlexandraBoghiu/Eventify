package com.alexandra.eventappbackend.Services;

import com.alexandra.eventappbackend.DTOs.EventDto;
import com.alexandra.eventappbackend.DTOs.UserDto;
import com.alexandra.eventappbackend.Entities.Event;
import com.alexandra.eventappbackend.Entities.User;
import com.alexandra.eventappbackend.Exceptions.UserAlreadyExistException;
import com.alexandra.eventappbackend.Repositories.EventRepository;
import com.alexandra.eventappbackend.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventServiceImpl implements EventService{

    private EventRepository eventRepository;
    private UserRepository userRepository;

    @Autowired
    public EventServiceImpl(EventRepository eventRepository, UserRepository userRepository) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void saveEvent(EventDto eventDto) {
        Event event = new Event();
        event.setName(eventDto.getName());
        event.setDescription(eventDto.getDescription());
        event.setDate(eventDto.getDate());
        event.setOrganizer(userRepository.findByEmail(eventDto.getOrganizer().getEmail()));
        eventRepository.save(event);
    }
}
