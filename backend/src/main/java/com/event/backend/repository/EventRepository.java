package com.event.backend.repository;

import com.event.backend.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByClientId(Long clientId);
    List<Event> findByVendorIdAndStatus(Long vendorId, Event.EventStatus status);
}
