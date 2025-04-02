package com.event.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.event.backend.model.EventAssignment;
import com.event.backend.service.EventAssignmentService;

@RestController
@RequestMapping("/api/assignments")
@CrossOrigin(origins = "*")
public class EventAssignmentController {

    @Autowired
    private EventAssignmentService service;

    // Create a new assignment (Admin only)
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<EventAssignment> createAssignment(@RequestBody EventAssignment assignment) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.createAssignment(assignment));
    }

    // Get assignments by event ID
    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<EventAssignment>> getAssignmentsByEvent(@PathVariable Long eventId) {
        List<EventAssignment> assignments = service.getAssignmentsByEvent(eventId);
        if (assignments.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(assignments);
    }

    // Get assignments by vendor ID
    @GetMapping("/vendor/{vendorId}")
    public ResponseEntity<List<EventAssignment>> getAssignmentsByVendor(@PathVariable Long vendorId) {
        List<EventAssignment> assignments = service.getAssignmentsByVendor(vendorId);
        if (assignments.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(assignments);
    }

    // Get assignments by staff ID
    @GetMapping("/staff/{staffId}")
    public ResponseEntity<List<EventAssignment>> getAssignmentsByStaff(@PathVariable Long staffId) {
        List<EventAssignment> assignments = service.getAssignmentsByStaff(staffId);
        if (assignments.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(assignments);
    }

    // Delete an assignment (Admin only)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> deleteAssignment(@PathVariable Long id) {
        try {
            service.deleteAssignment(id);
            return ResponseEntity.ok(Map.of("message", "Assignment deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}