package com.server.rest_server.helper;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AuthHelper {
    List<Auth> authList = new ArrayList<>();

    public void addToAuthList(String sessionId, String userName) {
        Auth au = new Auth();
        au.sessionId = sessionId;
        au.userName = userName;

        authList.add(au);
    }
    public void removeFromAuthList(String userName) {
        if(authList.isEmpty()) return;

        int index = 0;
        for(Auth au : authList) {
            if(au.userName.equals(userName)) {
                authList.remove(index);
                return;
            }
            index++;
        }
    }
    public String getUserNameFromAuthList(String sessionId) {
        if(authList.isEmpty()) return null;

        for(Auth au : authList) {
            if(au.sessionId.equals(sessionId)) {
                return au.userName;
            }
        }
        return null;
    }
}

class Auth {
    public String sessionId;
    public String userName;
}