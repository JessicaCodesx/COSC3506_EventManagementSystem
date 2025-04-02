package com.event.backend.service;

import com.event.backend.exception.ResourceNotFoundException;
import com.event.backend.model.Invoice;
import com.event.backend.model.InvoiceStatus;
import com.event.backend.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    // Create a new invoice
    public Invoice createInvoice(Invoice invoice) {
        // Set default values if not provided
        if (invoice.getCreatedAt() == null) {
            invoice.setCreatedAt(LocalDateTime.now());
        }
        
        if (invoice.getStatus() == null) {
            invoice.setStatus(InvoiceStatus.DUE);
        }
        
        return invoiceRepository.save(invoice);
    }

    // Get invoice by ID
    public Invoice getInvoiceById(Long id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found with id: " + id));
    }

    // Get all invoices
    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }
    
    // Get invoices by client ID
    public List<Invoice> getInvoicesByClientId(Long clientId) {
        return invoiceRepository.findByClientId(clientId);
    }
    
    // Get invoices by event ID
    public List<Invoice> getInvoicesByEventId(Long eventId) {
        return invoiceRepository.findByEventId(eventId);
    }
    
    // Get invoices by status
    public List<Invoice> getInvoicesByStatus(InvoiceStatus status) {
        return invoiceRepository.findByStatus(status);
    }
    
    // Get invoices by client ID and status
    public List<Invoice> getInvoicesByClientIdAndStatus(Long clientId, InvoiceStatus status) {
        return invoiceRepository.findByClientIdAndStatus(clientId, status);
    }
    
    // Get overdue invoices
    public List<Invoice> getOverdueInvoices() {
        return invoiceRepository.findByStatusAndDueDateBefore(InvoiceStatus.DUE, LocalDateTime.now());
    }

    // Update an invoice
    public Invoice updateInvoice(Long id, Invoice updatedInvoice) {
        return invoiceRepository.findById(id)
                .map(invoice -> {
                    if (updatedInvoice.getTotalAmount() != null) {
                        invoice.setTotalAmount(updatedInvoice.getTotalAmount());
                    }
                    
                    if (updatedInvoice.getStatus() != null) {
                        invoice.setStatus(updatedInvoice.getStatus());
                    }
                    
                    if (updatedInvoice.getDueDate() != null) {
                        invoice.setDueDate(updatedInvoice.getDueDate());
                    }
                    
                    return invoiceRepository.save(invoice);
                })
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found with id: " + id));
    }
    
    // Update invoice status
    public Invoice updateInvoiceStatus(Long id, InvoiceStatus status) {
        return invoiceRepository.findById(id)
                .map(invoice -> {
                    invoice.setStatus(status);
                    return invoiceRepository.save(invoice);
                })
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found with id: " + id));
    }

    // Delete an invoice
    public void deleteInvoice(Long id) {
        if (!invoiceRepository.existsById(id)) {
            throw new ResourceNotFoundException("Invoice not found with id: " + id);
        }
        invoiceRepository.deleteById(id);
    }
}