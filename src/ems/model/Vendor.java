package ems.model;
import java.util.List;

public class Vendor {
    private String id;
    private String name;
    private String serviceType;
    private String email;
    private boolean available;
    private List<String> assignedEventIds;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getServiceType() {
        return serviceType;
    }

    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public List<String> getAssignedEventIds() {
        return assignedEventIds;
    }

    public void setAssignedEventIds(List<String> assignedEventIds) {
        this.assignedEventIds = assignedEventIds;
    }
}
