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

    @GetMapping("/getPreviousMessagePage")
    private ResponseEntity<?> getPreviousMessagePage(@RequestParam int factor) {
        try {
            if(factor <= 0) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

            long count = sessionRepository.count();
            if(count <= 50) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

            long difL = (count - 50L*factor) - 50;
            if(difL < 0) difL = 0;
            long difR = count - 50L*factor;

            List<SessionEntity> se = sessionRepository.findEntitiesInRange(difL, difR).reversed();
            if (se.isEmpty()) throw new Exception("Session is null");

            List<SessionMessageDto> messageArr = new ArrayList<>();
            for (SessionEntity s : se) {
                SessionMessageDto dto = new SessionMessageDto();
                dto.setUserName(s.getUserName());
                dto.setMessage(s.getMessage());

                messageArr.add(dto);
            }

            return new ResponseEntity<>(messageArr, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/getSessionMessages")
    private ResponseEntity<?> getSessionMessages() {
        try{
            long count = sessionRepository.count();
            List<SessionEntity> se;

            if(count > 50) {
                se = sessionRepository.findEntitiesInRange(count-50, count).reversed();
            }else{
                se = sessionRepository.findEntitiesInRange(0L, count).reversed();
            }
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
