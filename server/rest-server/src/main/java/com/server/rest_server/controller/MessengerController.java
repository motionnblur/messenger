package com.server.rest_server.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.server.rest_server.dto.SessionEntityDto;
import com.server.rest_server.entity.SessionEntity;
import com.server.rest_server.repository.SessionRepository;
import com.server.rest_server.service.SessionEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.DataInput;
import java.util.Map;

@RestController
public class MessengerController {
    @Autowired
    protected SessionEntityService sessionEntityService;

    @PostMapping("/saveMessages")
    private ResponseEntity<?> saveMessages(@RequestBody Map<String, Object> payload) {
        try{
            SessionEntityDto sDto = new SessionEntityDto();

            String sessionId = (String) payload.get("sessionId");
            String userName = (String) payload.get("userName");
            String[] messages = (String[]) payload.get("messages");

            sDto.setSessionId(sessionId);
            sDto.setUserName(userName);
            sDto.setMessages(messages);

            sessionEntityService.saveSession(sDto);

            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
