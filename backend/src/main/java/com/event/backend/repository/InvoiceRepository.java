package com.event.backend.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.event.backend.model.Invoice;
import com.event.backend.model.InvoiceStatus;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    // Find invoices by client ID
    List<Invoice> findByClientId(Long clientId);
    
    // Find invoices by event ID
    List<Invoice> findByEventId(Long eventId);
    
    // Find invoices by status
    List<Invoice> findByStatus(InvoiceStatus status);
    
    // Find invoices by client ID and status
    List<Invoice> findByClientIdAndStatus(Long clientId, InvoiceStatus status);
    
    // Find overdue invoices
    List<Invoice> findByStatusAndDueDateBefore(InvoiceStatus status, LocalDateTime date);
}