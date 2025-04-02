package com.event.backend.service;

import com.event.backend.exception.ResourceNotFoundException;
import com.event.backend.model.Event;
import com.event.backend.model.EventStatus;
import com.event.backend.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    // Create a new event
    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    // Get all events
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    // Get event by ID
    public Event getEventById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));
    }

    // Get events by client ID
    public List<Event> getEventsByClientId(Long clientId) {
        return eventRepository.findByClientId(clientId);
    }

    // Get events by status
    public List<Event> getEventsByStatus(EventStatus status) {
        return eventRepository.findByStatus(status);
    }

    // Update an event
    public Event updateEvent(Long id, Event updatedEvent) {
        return eventRepository.findById(id)
                .map(event -> {
                    event.setEventName(updatedEvent.getEventName());
                    event.setEventDate(updatedEvent.getEventDate());
                    event.setLocation(updatedEvent.getLocation());
                    
                    if (updatedEvent.getStatus() != null) {
                        event.setStatus(updatedEvent.getStatus());
                    }
                    
                    if (updatedEvent.getBasePrice() != null) {
                        event.setBasePrice(updatedEvent.getBasePrice());
                    }
                    
                    if (updatedEvent.getPricingType() != null) {
                        event.setPricingType(updatedEvent.getPricingType());
                    }
                    
                    return eventRepository.save(event);
                })
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));
    }

    // Delete an event
    public void deleteEvent(Long id) {
        if (!eventRepository.existsById(id)) {
            throw new ResourceNotFoundException("Event not found with id: " + id);
        }
        eventRepository.deleteById(id);
    }

    // Calculate event price based on pricing type and quantity
    public Double calculateEventPrice(Long eventId, int quantity) {
        Event event = getEventById(eventId);
        
        if (event.getPricingType() == null || event.getBasePrice() == null) {
            throw new IllegalArgumentException("Pricing details are missing for this event");
        }

        return switch (event.getPricingType()) {
            case "per_seat", "per_attendee" -> event.getBasePrice() * quantity;
            case "flat_rate" -> event.getBasePrice();
            default -> throw new IllegalArgumentException("Invalid pricing type: " + event.getPricingType());
        };
    }

    // Add a rating to an event
    public Event addRating(Long eventId, int rating) {
        Event event = getEventById(eventId);
        event.addRating(rating);
        return eventRepository.save(event);
    }

    // Get current assigned events for a vendor
    public List<Event> getCurrentAssignedEvents(Long vendorId) {
        return eventRepository.findByVendorIdAndStatus(vendorId, EventStatus.IN_PROGRESS);
    }

    // Get completed events for a vendor
    public List<Event> getCompletedEvents(Long vendorId) {
        return eventRepository.findByVendorIdAndStatus(vendorId, EventStatus.COMPLETED);
    }
}
