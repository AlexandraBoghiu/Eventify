package com.alexandra.eventappbackend.Services;

import com.alexandra.eventappbackend.DTOs.UserDto;
import com.alexandra.eventappbackend.Entities.Event;
import com.alexandra.eventappbackend.Entities.User;

import java.util.List;
import java.util.Set;

public interface UserService {

    void saveUser(UserDto userDto);
    boolean checkIfUserExistByEmail(String email);
    boolean checkIfUserExistByUserName(String userName);
    String login(UserDto userDto);
    List<User> getUsers();
    User getUserByEmail(String email);
    String getEventStatus(String userEmail, Integer eventId);
    String saveEvent(String userEmail, Integer eventId);
    String deleteEvent(String userEmail, Integer eventId);
    List<Event> getUserEvent(String userEmail);
}
