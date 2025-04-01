package com.event.backend.controller;

import com.event.backend.model.Event;
import com.event.backend.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vendors")
@CrossOrigin(origins = "*")
public class VendorController {

    @Autowired
    private EventService eventService;

    @GetMapping("/{vendorId}/events/current")
    public ResponseEntity<List<Event>> getCurrentAssignedEvents(@PathVariable Long vendorId) {
        List<Event> events = eventService.getCurrentAssignedEvents(vendorId);
        if (events.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(events);
    }

    @GetMapping("/{vendorId}/events/completed")
    public ResponseEntity<List<Event>> getCompletedEvents(@PathVariable Long vendorId) {
        List<Event> events = eventService.getCompletedEvents(vendorId);
        if (events.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(events);
    }
}