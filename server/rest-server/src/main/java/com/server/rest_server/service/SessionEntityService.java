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

    public void saveSession(SessionEntityDto sDto) throws Exception {
        if(sDto.getSessionId() == null || sDto.getUserName() == null || sDto.getMessage() == null)
            throw new Exception("Session save error");

        SessionEntity se = new SessionEntity();

        se.setSessionId(sDto.getSessionId());
        se.setUserName(sDto.getUserName());
        se.setMessage(sDto.getMessage());

        sessionRepository.save(se);
    }
}
