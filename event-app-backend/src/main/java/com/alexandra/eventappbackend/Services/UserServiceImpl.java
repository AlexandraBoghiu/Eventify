package com.alexandra.eventappbackend.Services;

import com.alexandra.eventappbackend.DTOs.UserDto;
import com.alexandra.eventappbackend.Exceptions.UserAlreadyExistException;
import com.alexandra.eventappbackend.Repositories.UserRepository;
import com.alexandra.eventappbackend.Entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

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
        if (checkIfUserExist(userDto.getEmail())) {
            throw new UserAlreadyExistException();
        }
        User user = new User();
        user.setEmail(userDto.getEmail());
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setPassword(crypt(userDto.getPassword(), "salt"));
        user.setDateOfBirth(userDto.getDateOfBirth());
        user.setRoleType(0);
        userRepository.save(user);
    }

    @Override
    public boolean checkIfUserExist(String email) {
        return userRepository.findByEmail(email) != null;
    }
    @Override
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public boolean login(UserDto userDto){
        return userRepository.findByEmailAndPassword(userDto.getEmail(), crypt(userDto.getPassword(), "salt")) != null;
    }
}
