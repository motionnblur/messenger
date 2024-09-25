package com.server.rest_server.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SessionEntity {
    @Id
    @Column(name = "message_entity_id")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String sessionId;
    private String userName;
    private String message;
}
