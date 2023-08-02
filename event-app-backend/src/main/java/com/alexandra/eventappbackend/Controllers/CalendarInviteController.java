package com.alexandra.eventappbackend.Controllers;

import com.alexandra.eventappbackend.DTOs.EventDto;
import com.alexandra.eventappbackend.Services.CalendarInviteService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class CalendarInviteController {

    private CalendarInviteService calendarInviteService;
    @Autowired
    public CalendarInviteController(CalendarInviteService calendarInviteService) {
        this.calendarInviteService = calendarInviteService;
    }
    @PostMapping("/sendCalendarInvite")
    public String sendCalendarInvite(@RequestParam("recipient") String recipient, @RequestParam("json") String eventDto) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        EventDto event = objectMapper.readValue(eventDto, EventDto.class);
        calendarInviteService.sendCalendarInvite(recipient, event);
        return "succes";
    }
}