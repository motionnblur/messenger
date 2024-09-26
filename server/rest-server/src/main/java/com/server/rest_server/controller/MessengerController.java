package com.server.rest_server.controller;

import com.server.rest_server.dto.SessionEntityDto;
import com.server.rest_server.dto.SessionMessageDto;
import com.server.rest_server.entity.SessionEntity;
import com.server.rest_server.repository.SessionRepository;
import com.server.rest_server.service.SessionEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class MessengerController {
    @Autowired
    protected SessionEntityService sessionEntityService;
    @Autowired
    protected SessionRepository sessionRepository;

    @PostMapping("/saveMessage")
    private ResponseEntity<?> saveMessage(@RequestBody SessionEntityDto sDto) {
        try{
            sessionEntityService.saveSession(sDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/getSessionMessages")
    private ResponseEntity<?> getSessionMessages() {
        try{
            Pageable pageable = PageRequest.of(0, 50, Sort.by("id").descending());

            List<SessionEntity> se = sessionRepository.findAll(pageable).getContent().reversed();
            if(se.isEmpty()) throw new Exception("Session is null");

            List<SessionMessageDto> messageArr = new ArrayList<>();
            for(SessionEntity s : se){
                SessionMessageDto dto = new SessionMessageDto();
                dto.setUserName(s.getUserName());
                dto.setMessage(s.getMessage());

                messageArr.add(dto);
            }

            return new ResponseEntity<>(messageArr, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
