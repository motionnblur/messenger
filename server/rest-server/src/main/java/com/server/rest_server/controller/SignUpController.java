package com.server.rest_server.controller;

import com.server.rest_server.dto.UserEntityDto;
import com.server.rest_server.entity.UserEntity;
import com.server.rest_server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class SignUpController {
    @Autowired
    protected UserRepository userRepository;

    @PutMapping("signup")
    private ResponseEntity<?> addUser(@RequestBody UserEntityDto userEntityDto) {
        try{
            UserEntity userEntity = new UserEntity();
            userEntity.setUserName(userEntityDto.getName());
            userEntity.setUserPassword(userEntityDto.getPassword());

            UserEntity userEntitySaved = userRepository.save(userEntity);
            return new ResponseEntity<>(userEntitySaved, HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
