package ems.model;
import java.beans.Customizer;
import java.time.LocalDateTime;
import java.util.List;

public class Event {
    private String id;
    private String title;
    private String description;
    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;
    private String location;
    private Customer organizer;
    private List<Event> assignedVendors;


    //add getters and setters**

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getStartDateTime() {
        return startDateTime;
    }

    public void setStartDateTime(LocalDateTime startDateTime) {
        this.startDateTime = startDateTime;
    }

    public LocalDateTime getEndDateTime() {
        return endDateTime;
    }

    public void setEndDateTime(LocalDateTime endDateTime) {
        this.endDateTime = endDateTime;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Customer getOrganizer() {
        return organizer;
    }

    public void setOrganizer(Customer organizer) {
        this.organizer = organizer;
    }

    public List<Event> getAssignedVendors() {
        return assignedVendors;
    }

    public void setAssignedVendors(List<Event> assignedVendors) {
        this.assignedVendors = assignedVendors;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
