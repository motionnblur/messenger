package com.server.rest_server.controller;

import com.server.rest_server.dto.UserEntityDto;
import com.server.rest_server.entity.UserEntity;
import com.server.rest_server.repository.UserRepository;
import com.server.rest_server.service.UserEntityService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class SignUpController {
    @Autowired
    protected UserEntityService userEntityService;

    @PutMapping("signup")
    private ResponseEntity<?> addUser(@RequestBody UserEntityDto userEntityDto) {
        try{
            UserEntity userEntity = userEntityService.saveUserEntity(userEntityDto);
            return new ResponseEntity<>(userEntity, HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/login")
    private ResponseEntity<?> loginUser(@RequestBody UserEntityDto userEntityDto, HttpServletResponse response) {
        try{
            userEntityService.loginUser(response, userEntityDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}