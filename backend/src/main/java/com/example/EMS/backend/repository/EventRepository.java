package com.example.EMS.backend.repository;

import com.example.EMS.backend.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
    Event findByName(String name);
}
