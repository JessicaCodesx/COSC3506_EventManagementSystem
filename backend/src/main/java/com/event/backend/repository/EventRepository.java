package com.event.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.event.backend.model.Event;
import com.event.backend.model.EventStatus;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    // Find events by client ID
    List<Event> findByClientId(Long clientId);

    // Find events by vendor ID and status (using JPQL query)
    @Query("SELECT e FROM Event e JOIN EventAssignment ea ON e.id = ea.event.id WHERE ea.vendor.id = :vendorId AND e.status = :status")
    List<Event> findByVendorIdAndStatus(@Param("vendorId") Long vendorId, @Param("status") EventStatus status);

    // Find events by status
    List<Event> findByStatus(EventStatus status);

    // Find events by location (partial match)
    List<Event> findByLocationContaining(String location);
}