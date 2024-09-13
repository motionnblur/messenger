package com.server.rest_server.controller;

import com.server.rest_server.dto.SessionEntityDto;
import com.server.rest_server.service.SessionEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.Map;

@RestController
public class MessengerController {
    @Autowired
    protected SessionEntityService sessionEntityService;

    @PostMapping("/saveMessages")
    private ResponseEntity<?> saveMessages(@RequestBody SessionEntityDto sDto) {
        try{
            sessionEntityService.saveSession(sDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
