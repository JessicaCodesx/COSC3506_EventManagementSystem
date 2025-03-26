package com.event.backend.controller;

import com.event.backend.model.Invoice;
import com.event.backend.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin(origins = "*")
public class InvoiceController {

    @Autowired
    private InvoiceService service;

    @PostMapping
    public ResponseEntity<Invoice> create(@RequestBody Invoice invoice) {
        return ResponseEntity.ok(service.create(invoice));
    }

    @GetMapping
    public List<Invoice> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Invoice> getById(@PathVariable Long id) {
        return service.getById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/client/{clientId}")
    public List<Invoice> getByClient(@PathVariable Long clientId) {
        return service.getByClientId(clientId);
    }

    @GetMapping("/event/{eventId}")
    public List<Invoice> getByEvent(@PathVariable Long eventId) {
        return service.getByEventId(eventId);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}
