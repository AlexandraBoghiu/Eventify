package com.alexandra.eventappbackend.Services;

import com.alexandra.eventappbackend.DTOs.UserDto;
import com.alexandra.eventappbackend.Exceptions.UserAlreadyExistException;
import com.alexandra.eventappbackend.Repositories.UserRepository;
import com.alexandra.eventappbackend.Entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

import static org.apache.commons.codec.digest.Crypt.crypt;

@Component
public class UserServiceImpl implements UserService{

    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
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
    public boolean login(UserDto userDto){
        return userRepository.findByEmailAndPassword(userDto.getEmail(), String.valueOf(userDto.getPassword().hashCode())) != null;
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }
}
