package com.event.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.event.backend.model.Invoice;
import com.event.backend.repository.InvoiceRepository;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository repository;

    public Invoice create(Invoice invoice) {
        return repository.save(invoice);
    }

    public Optional<Invoice> getById(Long id) {
        return repository.findById(id);
    }

    public List<Invoice> getByClientId(Long clientId) {
        return repository.findByClientId(clientId);
    }

    public List<Invoice> getInvoicesByClientId(Long clientId) {
        return repository.findByClientId(clientId);
    }

    public List<Invoice> getInvoicesByClientIdAndStatus(Long clientId, Invoice.InvoiceStatus status) {
        return repository.findByClientIdAndStatus(clientId, status);
    }

    public List<Invoice> getByEventId(Long eventId) {
        return repository.findByEventId(eventId);
    }

    public List<Invoice> getAll() {
        return repository.findAll();
    }

    public Invoice update(Long id, Invoice invoiceDetails) {
        return repository.findById(id).map(invoice -> {
            invoice.setTotalAmount(invoiceDetails.getTotalAmount());
            invoice.setStatus(invoiceDetails.getStatus());
            invoice.setDueDate(invoiceDetails.getDueDate());
            return repository.save(invoice);
        }).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}