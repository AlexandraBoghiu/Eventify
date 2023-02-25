package com.alexandra.eventappbackend.Controllers;

import com.alexandra.eventappbackend.DTOs.UserDto;
import com.alexandra.eventappbackend.Entities.User;
import com.alexandra.eventappbackend.Services.UserService;
import org.apache.commons.codec.DecoderException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class AuthenticationController {

    private UserService userService;

    @Autowired
    public AuthenticationController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @PostMapping("/register")
    public boolean registration(@RequestBody UserDto userDto){
        userService.saveUser(userDto);
        return true;
    }
    @PostMapping("/login")
    public boolean login(@RequestBody UserDto userDto) {
        return userService.login(userDto);
    }
}
