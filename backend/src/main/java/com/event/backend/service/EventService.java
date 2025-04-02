package com.event.backend.service;

import com.event.backend.model.Event;
import com.event.backend.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }

    public List<Event> getEventsByClientId(Long clientId) {
        return eventRepository.findByClientId(clientId);
    }

    public Event updateEvent(Long id, Event updatedEvent) {
        return eventRepository.findById(id).map(event -> {
            event.setEventName(updatedEvent.getEventName());
            event.setEventDate(updatedEvent.getEventDate());
            event.setLocation(updatedEvent.getLocation());
            event.setStatus(updatedEvent.getStatus());
            event.setClient(updatedEvent.getClient());
            return eventRepository.save(event);
        }).orElse(null);
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }

    public Double calculateEventPrice(Long eventId, int quantity) {
        Optional<Event> eventOptional = eventRepository.findById(eventId);

        if (eventOptional.isPresent()) {
            Event event = eventOptional.get();
            String pricingType = event.getPricingType();
            Double basePrice = event.getBasePrice();

            if (pricingType == null || basePrice == null) {
                throw new IllegalArgumentException("Pricing details are missing for this event.");
            }

            switch (pricingType) {
                case "per_seat":
                case "per_attendee":
                    return basePrice * quantity;
                case "flat_rate":
                    return basePrice;
                default:
                    throw new IllegalArgumentException("Invalid pricing type: " + pricingType);
            }
        } else {
            throw new IllegalArgumentException("Event not found with ID: " + eventId);
        }
    }

    public List<Event> getCurrentAssignedEvents(Long vendorId) {
        return eventRepository.findByVendorIdAndStatus(vendorId, Event.EventStatus.IN_PROGRESS);
    }

    public List<Event> getCompletedEvents(Long vendorId) {
        return eventRepository.findByVendorIdAndStatus(vendorId, Event.EventStatus.COMPLETED);
    }

    public Event addRating(Long eventId, int rating) {
        return eventRepository.findById(eventId).map(event -> {
            if (rating < 1 || rating > 5) {
                throw new IllegalArgumentException("Rating must be between 1 and 5.");
            }
            event.addRating(rating);
            return eventRepository.save(event);
        }).orElseThrow(() -> new IllegalArgumentException("Event not found with ID: " + eventId));
    }
}
