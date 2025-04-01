package com.event.backend.controller;

import com.event.backend.model.EventAssignment;
import com.event.backend.service.EventAssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assignments")
@CrossOrigin(origins = "*")
public class EventAssignmentController {

    @Autowired
    private EventAssignmentService service;

    @PostMapping
    public ResponseEntity<EventAssignment> create(@RequestBody EventAssignment assignment) {
        return ResponseEntity.ok(service.createAssignment(assignment));
    }

    @GetMapping("/event/{eventId}")
    public List<EventAssignment> byEvent(@PathVariable Long eventId) {
        return service.getAssignmentsByEvent(eventId);
    }

    @GetMapping("/vendor/{vendorId}")
    public List<EventAssignment> byVendor(@PathVariable Long vendorId) {
        return service.getAssignmentsByVendor(vendorId);
    }

    @GetMapping("/staff/{staffId}")
    public List<EventAssignment> byStaff(@PathVariable Long staffId) {
        return service.getAssignmentsByStaff(staffId);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.deleteAssignment(id);
        return ResponseEntity.ok().build();
    }
}
