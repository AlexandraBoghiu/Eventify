package com.alexandra.eventappbackend.Services;

import com.alexandra.eventappbackend.DTOs.UserDto;
import com.alexandra.eventappbackend.Entities.User;

import java.util.List;

public interface UserService {

    void saveUser(UserDto userDto);

    boolean checkIfUserExistByEmail(String email);
    boolean checkIfUserExistByUserName(String userName);
    boolean login(UserDto userDto);

    List<User> getUsers();

}
