package com.server.rest_server.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SessionEntityDto {
    private String sessionId;
    private String userName;
    private String message;
}
