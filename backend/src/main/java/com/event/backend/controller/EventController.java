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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.event.backend.model.Event;
import com.event.backend.model.EventStatus;
import com.event.backend.service.EventService;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class EventController {

    @Autowired
    private EventService eventService;

    // Create a new event (Admin or Client only)
    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('CLIENT')")
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        return ResponseEntity.status(HttpStatus.CREATED).body(eventService.createEvent(event));
    }

    // Get all events
    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    // Get event by ID
    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(eventService.getEventById(id));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Get events by client ID
    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<Event>> getEventsByClient(@PathVariable Long clientId) {
        List<Event> events = eventService.getEventsByClientId(clientId);
        if (events.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(events);
    }
    
    // Get events by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Event>> getEventsByStatus(@PathVariable String status) {
        try {
            EventStatus eventStatus = EventStatus.valueOf(status.toUpperCase());
            List<Event> events = eventService.getEventsByStatus(eventStatus);
            if (events.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(events);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Update an event (Admin or Client only)
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('CLIENT')")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event event) {
        try {
            return ResponseEntity.ok(eventService.updateEvent(id, event));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete an event (Admin only)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> deleteEvent(@PathVariable Long id) {
        try {
            eventService.deleteEvent(id);
            return ResponseEntity.ok(Map.of("message", "Event deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Calculate event price
    @GetMapping("/{eventId}/price")
    public ResponseEntity<Double> calculateEventPrice(
            @PathVariable Long eventId, 
            @RequestParam int quantity) {
        try {
            Double price = eventService.calculateEventPrice(eventId, quantity);
            return ResponseEntity.ok(price);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // Add rating to event (Client only)
    @PostMapping("/{eventId}/ratings")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<Event> addRating(
            @PathVariable Long eventId,
            @RequestParam int rating) {
        try {
            Event event = eventService.addRating(eventId, rating);
            return ResponseEntity.ok(event);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // Get vendor's current assigned events
    @GetMapping("/vendor/{vendorId}/current")
    public ResponseEntity<List<Event>> getCurrentVendorEvents(@PathVariable Long vendorId) {
        List<Event> events = eventService.getCurrentAssignedEvents(vendorId);
        if (events.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(events);
    }
    
    // Get vendor's completed events
    @GetMapping("/vendor/{vendorId}/completed")
    public ResponseEntity<List<Event>> getCompletedVendorEvents(@PathVariable Long vendorId) {
        List<Event> events = eventService.getCompletedEvents(vendorId);
        if (events.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(events);
    }
}