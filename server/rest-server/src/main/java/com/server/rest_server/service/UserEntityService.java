package com.server.rest_server.service;

import com.server.rest_server.dto.UserEntityDto;
import com.server.rest_server.entity.UserEntity;
import com.server.rest_server.helper.AuthHelper;
import com.server.rest_server.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserEntityService {
    @Autowired
    protected UserRepository userRepository;
    @Autowired
    protected AuthHelper authHelper;

    public UserEntity saveUserEntity(UserEntityDto userEntityDto) {
        UserEntity userEntityTemp = new UserEntity();
        userEntityTemp.setUserName(userEntityDto.getName());
        userEntityTemp.setUserPassword(userEntityDto.getPassword());

        return userRepository.save(userEntityTemp);
    }
    public void loginUser(HttpServletResponse response, UserEntityDto userEntityDto) throws Exception {
        UserEntity userEntity = userRepository.findByUserName(userEntityDto.getName());
        if(userEntity == null) throw new Exception("Login error");

        String sessionId = UUID.randomUUID().toString();

        Cookie cookie = new Cookie("SESSION_ID", sessionId);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(60* 3); // 60 minutes

        response.addCookie(cookie);

        authHelper.addToAuthList(sessionId, userEntity.getUserName());

        if(!userEntity.getUserPassword().equals(userEntityDto.getPassword()))
            throw new Exception("Login error");
    }
}
