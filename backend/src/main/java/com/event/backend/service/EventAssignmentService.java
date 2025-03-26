package com.event.backend.service;

import com.event.backend.model.EventAssignment;
import com.event.backend.repository.EventAssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventAssignmentService {

    @Autowired
    private EventAssignmentRepository repository;

    public EventAssignment createAssignment(EventAssignment assignment) {
        return repository.save(assignment);
    }

    public List<EventAssignment> getAssignmentsByEvent(Long eventId) {
        return repository.findByEventId(eventId);
    }

    public List<EventAssignment> getAssignmentsByVendor(Long vendorId) {
        return repository.findByVendorId(vendorId);
    }

    public List<EventAssignment> getAssignmentsByStaff(Long staffId) {
        return repository.findByStaffId(staffId);
    }

    public void deleteAssignment(Long id) {
        repository.deleteById(id);
    }

    public Optional<EventAssignment> getAssignment(Long id) {
        return repository.findById(id);
    }
}
