package com.alexandra.eventappbackend.Controllers;

import com.alexandra.eventappbackend.DTOs.EventDto;
import com.alexandra.eventappbackend.Services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EventController {

    private EventService eventService;

    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping("/create/event")
    public String createEvent(@RequestBody EventDto eventDto){
        eventService.saveEvent(eventDto);
        return "redirect:/create/event?success";
    }
}
