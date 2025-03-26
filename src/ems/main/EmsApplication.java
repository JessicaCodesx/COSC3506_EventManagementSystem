package ems.main;
import ems.model.Event;
import ems.model.Customer;
import ems.service.EventService;
import ems.service.UserService;

import java.time.LocalDateTime;

public class EmsApplication {
    public static void main(String[] args) {
        EventService eventService = new EventService();

        //Creating a test
        Customer organizer = new Customer();
        organizer.setId("C001");
        organizer.setName(" Ayan Jama");
        organizer.setEmail("ayanjama@gmail.com");
        organizer.setPhone("1234567890");

        Event event = new Event();
        event.setId("Event1");
        event.setTitle("Ayan's Grad Party");
        event.setDescription("Graduation Party at Hilton hotel");
        event.setStartDateTime(LocalDateTime.of(2025,05,20,15,0
        ));
        event.setEndDateTime(LocalDateTime.of(2025,05,20,21,0));
        event.setLocation("Hilton Hotel");
        event.setOrganizer(organizer);

        eventService.createEvent(event);

        //Seeing all events in system
        System.out.println("All Events:");
        eventService.getAllEvents().forEach(e -> System.out.println(e.getTitle()));

        //Updating
        event.setTitle("Updating Graduating Party");
        eventService.updateEvent("Graduating Party", event);

        // Deleting events
        eventService.deleteEvent("Graduating Party");
        System.out.println("Event has been deleted");

        UserService userService = new UserService();
        String username = "admin";
        String password = "admin123";

        if (userService.login(username, password)) {
            System.out.println("User logged in" + username);
        } else {
            System.out.println("User login failed, incorrect credentials " + username);
        }


    }
}
