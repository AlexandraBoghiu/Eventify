package com.alexandra.eventappbackend.Services;

import com.alexandra.eventappbackend.DTOs.UserDto;
import com.alexandra.eventappbackend.Entities.Event;
import com.alexandra.eventappbackend.Exceptions.UserAlreadyExistException;
import com.alexandra.eventappbackend.Repositories.EventRepository;
import com.alexandra.eventappbackend.Repositories.UserRepository;
import com.alexandra.eventappbackend.Entities.User;
import org.hibernate.Session;
import org.hibernate.SessionBuilder;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

import static org.apache.commons.codec.digest.Crypt.crypt;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private EventServiceImpl eventService;
    private EventRepository eventRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, EventServiceImpl eventService, EventRepository eventRepository) {
        this.userRepository = userRepository;
        this.eventService = eventService;
        this.eventRepository = eventRepository;
    }

    @Override
    public void saveUser(UserDto userDto) throws UserAlreadyExistException {
        if (checkIfUserExistByEmail(userDto.getEmail())) {
            throw new UserAlreadyExistException();
        }
        if (checkIfUserExistByUserName(userDto.getUserName())) {
            throw new UserAlreadyExistException();
        }
        User user = new User();
        user.setEmail(userDto.getEmail());
        user.setUserName(userDto.getUserName());
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setPassword(String.valueOf(userDto.getPassword().hashCode()));
        user.setDateOfBirth(userDto.getDateOfBirth());
        user.setRoleType(0);
        userRepository.save(user);
    }

    @Override
    public boolean checkIfUserExistByEmail(String email) {
        return userRepository.findByEmail(email) != null;
    }

    @Override
    public boolean checkIfUserExistByUserName(String userName) {
        return userRepository.findByEmail(userName) != null;
    }

    @Override
    public String login(UserDto userDto) {
        UUID uuid = UUID.randomUUID();
        String sessionCode = uuid.toString().replace("-", "");
        if (userRepository.findByEmailAndPassword(userDto.getEmail(), String.valueOf(userDto.getPassword().hashCode())) != null)
            return sessionCode;
        else return "KO";
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email) != null ? userRepository.findByEmail(email) : null;
    }

    @Override
    public String getEventStatus(String userEmail, Integer eventId) {
        if (getUserByEmail(userEmail) != null && eventService.getEventById(eventId) != null) {
            Set<Integer> savedEvents = getUserByEmail(userEmail).getSavedEvents();
            for (Integer i : savedEvents) {
                if (Objects.equals(i, eventId))
                    return "OK";
            }
        }
        return "KO";
    }

    @Override
    @Transactional
    public String saveEvent(String userEmail, Integer eventId) {
        if (getUserByEmail(userEmail) != null && eventService.getEventById(eventId) != null) {
            getUserByEmail(userEmail).getSavedEvents().add(eventId);
            return "OK";
        } else return "KO";
    }

    @Override
    @Transactional
    public String deleteEvent(String userEmail, Integer eventId) {
        if (getUserByEmail(userEmail) != null && eventService.getEventById(eventId) != null) {
            getUserByEmail(userEmail).getSavedEvents().remove(eventId);
            return "OK";
        } else return "KO";
    }

    @Override
    public List<Event> getUserEvent(String userEmail) {
        User user = userRepository.findByEmail(userEmail);
        Set<Integer> savedEvents = user.getSavedEvents();
        Event e;
        List<Event> eventList = new ArrayList<>();
        for (Integer i : savedEvents) {
            e = eventRepository.findByEventId(i);
            eventList.add(e);
        }
        return eventList;
    }
}
