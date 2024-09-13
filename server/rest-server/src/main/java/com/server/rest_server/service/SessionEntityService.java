package com.server.rest_server.service;

import com.server.rest_server.dto.SessionEntityDto;
import com.server.rest_server.entity.SessionEntity;
import com.server.rest_server.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SessionEntityService {
    @Autowired
    protected SessionRepository sessionRepository;
    public void saveSession(SessionEntityDto sDto) {
        SessionEntity se = new SessionEntity();
        se.setSessionId(sDto.getSessionId());
        se.setUserName(sDto.getUserName());
        se.setMessages(sDto.getMessages());

        sessionRepository.save(se);
    }
}
