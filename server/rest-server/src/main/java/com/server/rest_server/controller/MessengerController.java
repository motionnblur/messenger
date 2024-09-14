package com.server.rest_server.controller;

import com.server.rest_server.dto.SessionEntityDto;
import com.server.rest_server.entity.SessionEntity;
import com.server.rest_server.repository.SessionRepository;
import com.server.rest_server.service.SessionEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

@RestController
public class MessengerController {
    @Autowired
    protected SessionEntityService sessionEntityService;
    @Autowired
    protected SessionRepository sessionRepository;

    @PostMapping("/saveMessages")
    private ResponseEntity<?> saveMessages(@RequestBody SessionEntityDto sDto) {
        try{
            sessionEntityService.saveSession(sDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/getSessionMessages")
    private ResponseEntity<?> getSessionMessages(@RequestParam String userName) {
        try{
            SessionEntity[] se = sessionRepository.findByUserName(userName);
            if(se == null ) throw new Exception("Session is null");

            List<String> messageArr = new ArrayList<>();
            for(SessionEntity s : se){
                messageArr.addAll(List.of(s.getMessages()));
            }

            return new ResponseEntity<>(messageArr, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
