package com.server.rest_server.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.server.rest_server.dto.UserEntityDto;
import com.server.rest_server.entity.SessionEntity;
import com.server.rest_server.entity.UserEntity;
import com.server.rest_server.helper.AuthHelper;
import com.server.rest_server.repository.SessionRepository;
import com.server.rest_server.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

import java.util.UUID;

@Service
public class UserEntityService {
    @Autowired
    protected UserRepository userRepository;
    @Autowired
    protected SessionRepository sessionRepository;
    @Autowired
    protected AuthHelper authHelper;

    protected JedisPool pool = new JedisPool("redis", 6379);

    public void authUser(HttpServletRequest request) throws Exception {
        Cookie[] cookies = request.getCookies();
        String cookieValue = null;

        if(cookies == null) throw new Exception("Auth error");
        for(Cookie c : cookies){
            String cookieName = c.getName();
            if(cookieName.equals("SESSION_ID")){
                cookieValue = c.getValue();
                if(cookieValue == null || cookieValue.equals("undefined")) throw new Exception("Auth error");

                break;
            }
        }
        String userName = authHelper.getUserNameFromAuthList(cookieValue);
        if(userName == null) throw new Exception("Auth error");
    }

    public UserEntity saveUserEntity(UserEntityDto userEntityDto) throws Exception {
        UserEntity ue = userRepository.findByUserName(userEntityDto.getName());
        if(ue != null) throw new Exception("Same user exists");

        UserEntity userEntityTemp = new UserEntity();
        userEntityTemp.setUserName(userEntityDto.getName());
        userEntityTemp.setUserPassword(userEntityDto.getPassword());

        return userRepository.save(userEntityTemp);
    }

    public void loginUser(HttpServletResponse response, UserEntityDto userEntityDto) throws Exception {
        UserEntity userEntity = userRepository.findByUserName(userEntityDto.getName());
        if(userEntity == null) throw new Exception("User could not be found");

        String sessionId = UUID.randomUUID().toString();

        Cookie cookie = new Cookie("SESSION_ID", sessionId);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(60*3); // 3 minutes

        response.addCookie(cookie);

        try (Jedis jedis = pool.getResource()) {
            jedis.set("sessionId", sessionId);
            jedis.expire("sessionId", 60*3);
        }

        response.setHeader("Access-Control-Expose-Headers", "sessionId");
        response.setHeader("sessionId", sessionId);

        authHelper.addToAuthList(sessionId, userEntity.getUserName());

        if(!userEntity.getUserPassword().equals(userEntityDto.getPassword()))
            throw new Exception("Login error");
    }
}