package com.server.rest_server.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SessionMessageDto {
    private String userName;
    private String message;
}
