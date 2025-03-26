package com.event.backend.service;

import com.event.backend.model.Event;
import com.event.backend.model.EventStatus;
import com.event.backend.repository.EventRepository;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class EventServiceTest {

    @Mock
    private EventRepository eventRepository;

    @InjectMocks
    private EventService eventService;

    public EventServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateEvent() {
        Event event = new Event();
        event.setEventName("Test Event");
        event.setEventDate(LocalDateTime.now());
        event.setStatus(EventStatus.SCHEDULED);

        when(eventRepository.save(event)).thenReturn(event);

        Event result = eventService.createEvent(event);
        assertNotNull(result);
        assertEquals("Test Event", result.getEventName());
    }

    @Test
    public void testGetAllEvents() {
        when(eventRepository.findAll()).thenReturn(List.of(new Event(), new Event()));
        List<Event> events = eventService.getAllEvents();
        assertEquals(2, events.size());
    }
}