package com.event.backend.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;


@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String eventName;
    private String location;

    @Enumerated(EnumType.STRING)
    private EventStatus status; // Enum to track event status

    @ManyToOne
    @JoinColumn(name = "vendor_id")
    private Vendor vendor; // Relationship with Vendor

    @ManyToOne
    @JoinColumn(name = "client_id")
    private User client;

    @Column(name = "pricing_type")
    private String pricingType;

    @Column(name = "base_price")
    private Double basePrice;

    LocalDateTime eventDate;

    public enum EventStatus {
        PENDING,
        IN_PROGRESS,
        COMPLETED
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public User getClient() {
        return client;
    }

    public void setClient(User client) {
        this.client = client;
    }

    public String getPricingType() {
        return pricingType;
    }

    public void setPricingType(String pricingType) {
        this.pricingType = pricingType;
    }

    public Double getBasePrice() {
        return basePrice;
    }

    public void setBasePrice(Double basePrice) {
        this.basePrice = basePrice;
    }

    public LocalDateTime getEventDate() {
        return eventDate;
    }

    public void setEventDate(LocalDateTime eventDate) {
        this.eventDate = eventDate;
    }

    public EventStatus getStatus() {
        return status;
    }

    public void setStatus(EventStatus status) {
        this.status = status;
    }

    
}

