package com.alexandra.eventappbackend.Services;

import com.alexandra.eventappbackend.DTOs.EventDto;
import com.alexandra.eventappbackend.DTOs.UserDto;
import com.alexandra.eventappbackend.Entities.Event;
import com.alexandra.eventappbackend.Entities.User;
import com.alexandra.eventappbackend.Exceptions.UserAlreadyExistException;
import com.alexandra.eventappbackend.Repositories.EventRepository;
import com.alexandra.eventappbackend.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class EventServiceImpl implements EventService {

    private EventRepository eventRepository;
    private UserRepository userRepository;

    @Autowired
    public EventServiceImpl(EventRepository eventRepository, UserRepository userRepository) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void saveEvent(EventDto eventDto, MultipartFile file) throws IOException {
        Event event = new Event();
        event.setName(eventDto.getName());
        event.setCreationDate(LocalDate.now());
        event.setDescription(eventDto.getDescription());
        event.setStartDate(eventDto.getStartDate());
        event.setEndDate(eventDto.getEndDate());
        event.setStartTime(LocalTime.parse(eventDto.getStartTime().toString(), DateTimeFormatter.ofPattern("HH:mm")));
        event.setEndTime(eventDto.getEndTime());
        event.setImagePath(eventDto.getImagePath());
        event.setLocation(eventDto.getLocation());
        event.setLocationDetails(eventDto.getLocationDetails());
        event.setCategory(eventDto.getCategory());
        event.setTags(eventDto.getTags());
        event.setOrganizer(eventDto.getOrganizer());

        String filename = event.getCategory();
//        event.setFilename(filename);
//+ event.getName() + event.getOrganizer() + ".png"
        String filePath = Paths.get("\\event-app-frontend", "public", "uploads", event.getCategory() + "\\" + event.getName().trim() + event.getOrganizer() + ".png" ).toString();
        System.out.println(filePath);
        event.setImagePath("\\uploads\\" + event.getCategory() + "\\" + event.getName() + event.getOrganizer() + ".png"); //todo

        File destFile = new File(System.getProperty("user.dir")).getParentFile();
        File destFileFull = new File(destFile + filePath);
        file.transferTo(destFileFull);

        eventRepository.save(event);
    }

    @Override
    public List<Event> getEvents() {
        return eventRepository.findAll();
    }

    @Override
    public List<Event> getUserSavedEvents(Set<Integer> eventId) {
        Event e = new Event();
        List<Event> eventList = new ArrayList<>();
        for (Integer i : eventId) {
            e = eventRepository.findByEventId(i);
            eventList.add(e);
        }
        return eventList;
    }

    @Override
    public Event getEventById(Integer eventId) {
        return eventRepository.findByEventId(eventId);
    }

    @Override
    public List<Event> findEventsByOrganizer(String userEmail) {
        User user = userRepository.findByEmail(userEmail);
        List<Event> events = eventRepository.findEventsByOrganizer(user.getUserName());
        if (events.size() > 5) {
            return events.subList(0, 5);
        } else {
            return events;
        }
    }
}
