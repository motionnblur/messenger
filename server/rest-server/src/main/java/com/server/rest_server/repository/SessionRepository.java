package com.server.rest_server.repository;

import com.server.rest_server.entity.SessionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SessionRepository extends JpaRepository<SessionEntity, Long> {
    @Query("SELECT e FROM SessionEntity e WHERE e.id BETWEEN :startId AND :endId ORDER BY e.id DESC")
    List<SessionEntity> findEntitiesInRange(@Param("startId") Long startId, @Param("endId") Long endId);
}
