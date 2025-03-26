package com.event.backend.service;

import com.event.backend.model.Invoice;
import com.event.backend.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public List<Invoice> getByEventId(Long eventId) {
        return repository.findByEventId(eventId);
    }

    public List<Invoice> getAll() {
        return repository.findAll();
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
