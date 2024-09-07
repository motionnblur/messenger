package com.server.rest_server.service;

import com.server.rest_server.dto.UserEntityDto;
import com.server.rest_server.entity.UserEntity;
import com.server.rest_server.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class UserEntityServiceTest {
    @Mock private UserRepository userRepository;
    @InjectMocks private UserEntityService userEntityService;

    @Test
    void saveUserEntity() throws Exception {
        UserEntity userEntity = new UserEntity();
        userEntity.setUserName("Can");
        userEntity.setUserPassword("se22_343s");

        when(userRepository.save(any(UserEntity.class))).thenReturn(userEntity);

        UserEntityDto userEntityDto = new UserEntityDto();
        userEntityDto.setName("Can");
        userEntityDto.setPassword("se22_343s");

        UserEntity savedUserEntity = userEntityService.saveUserEntity(userEntityDto);

        assertEquals(userEntity, savedUserEntity);
    }
}