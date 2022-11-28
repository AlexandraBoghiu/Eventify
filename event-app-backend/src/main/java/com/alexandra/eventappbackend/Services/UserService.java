package com.alexandra.eventappbackend.Services;

import com.alexandra.eventappbackend.DTOs.UserDto;
import com.alexandra.eventappbackend.Entities.User;
import org.springframework.beans.factory.annotation.Autowired;

public interface UserService {

    void saveUser(UserDto userDto);

    boolean checkIfUserExist(String email);

    User findUserByEmail(String email);

    boolean login(UserDto userDto);

}
