package com.alexandra.eventappbackend.Controllers;

import com.alexandra.eventappbackend.DTOs.UserDto;
import com.alexandra.eventappbackend.Services.UserService;
import org.apache.commons.codec.DecoderException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
public class AuthenticationController {

    private UserService userService;

    @Autowired
    public AuthenticationController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/index")
    public String home(){
        return "index";
    }

    @PostMapping("/register/submit")
    public String registration(@RequestBody UserDto userDto){
        userService.saveUser(userDto);
        return "redirect:/register?success";
    }

    @PostMapping("/login/submit")
    public boolean login(@RequestBody UserDto userDto) throws DecoderException {
       // userService.login(userDto);
        return userService.login(userDto);
    }
}
