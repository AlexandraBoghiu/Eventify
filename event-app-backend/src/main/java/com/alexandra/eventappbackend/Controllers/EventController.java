package com.alexandra.eventappbackend.Controllers;

import com.alexandra.eventappbackend.DTOs.EventDto;
import com.alexandra.eventappbackend.Entities.Event;
import com.alexandra.eventappbackend.Entities.User;
import com.alexandra.eventappbackend.Services.EventService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.DataInput;
import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class EventController {

    private EventService eventService;

    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping("/event")
    public String createEvent(@RequestParam("json") String eventDto, @RequestParam("file") MultipartFile file) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        EventDto event = objectMapper.readValue(eventDto, EventDto.class);
        eventService.saveEvent(event, file);
        return "success";
    }

    @GetMapping("/events")
    public List<Event> getEvents() {
        return eventService.getEvents();
    }
    @PostMapping("/event/{eventId}")
    public Event getEventById(@PathVariable Integer eventId) {
        return eventService.getEventById(eventId);
    }

    @PostMapping("/event-organiser")
    public List<Event> getEventById(@RequestParam("userEmail") String userEmail) {
        return eventService.findEventsByOrganizer(userEmail);
    }

}
