package com.server.rest_server.controller;

import com.server.rest_server.service.UserEntityService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    @Autowired
    protected UserEntityService userEntityService;

    @GetMapping("/auth")
    private ResponseEntity<?> authUser(HttpServletRequest request) {
        try{
            userEntityService.authUser(request);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
