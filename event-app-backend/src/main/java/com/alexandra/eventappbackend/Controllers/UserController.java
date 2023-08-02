package com.alexandra.eventappbackend.Controllers;

import com.alexandra.eventappbackend.Entities.Event;
import com.alexandra.eventappbackend.Entities.User;
import com.alexandra.eventappbackend.Services.EventService;
import com.alexandra.eventappbackend.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Set;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("/user-event-list")
    public List<Event> getUserEvent(String email) {
        return userService.getUserEvent(email);
    }
    @PostMapping("/user")
    public User getUserByEmail(String email) {
        return userService.getUserByEmail(email);
    }

    @PostMapping("/user-eventstatus")
    public String getEventStatus(@RequestBody Map<String, Object> requestBody) {
        String userEmail = (String) requestBody.get("email");
        Integer eventId = Integer.valueOf((String) requestBody.get("eventId"));
        return userService.getEventStatus(userEmail, eventId);
    }
    @PostMapping("/user-event")
    public String saveEvent(@RequestBody Map<String, Object> requestBody) {
        String userEmail = (String) requestBody.get("email");
        Integer eventId = Integer.valueOf((String) requestBody.get("eventId"));
        return userService.saveEvent(userEmail, eventId);
    }
    @DeleteMapping("/user-event")
    public String deleteEvent(@RequestBody Map<String, Object> requestBody) {
        String userEmail = (String) requestBody.get("email");
        Integer eventId = Integer.valueOf((String) requestBody.get("eventId"));
        return userService.deleteEvent(userEmail, eventId);
    }
}
