package ems.service;
import ems.model.Event;
import java.util.List;

public class EventService {
    private List<Event> events;

    //Creating the events
    public void createEvent(Event event) {
        events.add(event);
        System.out.println("Event has been created: " + event.getTitle());
    }

    //Read
    public Event getEventById(String id) {
        return events.stream().filter(event -> event.getId().equals(id)).findFirst().orElse(null);
    }

    //Reading all events
    public List<Event> getAllEvents() {
        return events;
    }

    //Update
    public boolean updateEvent(String id, Event updatedEvent){
        for (int i = 0; i < events.size(); i++) {
            if (events.get(i).getId().equals(id)) {
                events.set(i, updatedEvent);
                return true;
            }
        }
        return false;
    }
    //deleting events
    public boolean deleteEvent(String id) {
        return events.removeIf(e -> e.getId().equals(id));
    }
}
