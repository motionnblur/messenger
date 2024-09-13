package com.server.rest_server.service;

import com.server.rest_server.entity.SessionEntity;
import com.server.rest_server.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class SessionEntityService {
    @Autowired
    protected SessionRepository sessionRepository;

    public void saveSession(Map<String, Object> payload) throws Exception {
        SessionEntity sDto = new SessionEntity();

        String sessionId = (String) payload.get("sessionId");
        String userName = (String) payload.get("userName");
        String[] messages = (String[]) payload.get("messages");

        if(sessionId == null || userName == null || messages == null)
            throw new Exception("Session save error");

        sDto.setSessionId(sessionId);
        sDto.setUserName(userName);
        sDto.setMessages(messages);

        sessionRepository.save(sDto);
    }
}
