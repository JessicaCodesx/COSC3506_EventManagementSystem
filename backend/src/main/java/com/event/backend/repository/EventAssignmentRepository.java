package com.event.backend.repository;

import com.event.backend.model.EventAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventAssignmentRepository extends JpaRepository<EventAssignment, Long> {
    List<EventAssignment> findByEventId(Long eventId);
    List<EventAssignment> findByVendorId(Long vendorId);
    List<EventAssignment> findByStaffId(Long staffId);
}
