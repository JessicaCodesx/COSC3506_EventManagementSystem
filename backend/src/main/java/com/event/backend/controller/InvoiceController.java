package com.event.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.event.backend.model.Invoice;
import com.event.backend.model.InvoiceStatus;
import com.event.backend.service.InvoiceService;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin(origins = "*")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    // Create a new invoice (Admin or Vendor only)
    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('VENDOR')")
    public ResponseEntity<Invoice> createInvoice(@RequestBody Invoice invoice) {
        return ResponseEntity.status(HttpStatus.CREATED).body(invoiceService.createInvoice(invoice));
    }

    // Get all invoices (Admin only)
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Invoice>> getAllInvoices() {
        return ResponseEntity.ok(invoiceService.getAllInvoices());
    }

    // Get invoice by ID
    @GetMapping("/{id}")
    public ResponseEntity<Invoice> getInvoiceById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(invoiceService.getInvoiceById(id));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Get invoices by client ID
    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<Invoice>> getInvoicesByClient(@PathVariable Long clientId) {
        List<Invoice> invoices = invoiceService.getInvoicesByClientId(clientId);
        if (invoices.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(invoices);
    }
    
    // Get invoices by client ID and status
    @GetMapping("/client/{clientId}/status/{status}")
    public ResponseEntity<List<Invoice>> getInvoicesByClientAndStatus(
            @PathVariable Long clientId,
            @PathVariable String status) {
        try {
            InvoiceStatus invoiceStatus = InvoiceStatus.valueOf(status.toUpperCase());
            List<Invoice> invoices = invoiceService.getInvoicesByClientIdAndStatus(clientId, invoiceStatus);
            if (invoices.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(invoices);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Get invoices by event ID
    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<Invoice>> getInvoicesByEvent(@PathVariable Long eventId) {
        try {
            List<Invoice> invoices = invoiceService.getInvoicesByEventId(eventId);
            if (invoices.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(invoices);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Update an invoice (Admin or Vendor only)
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('VENDOR')")
    public ResponseEntity<Invoice> updateInvoice(@PathVariable Long id, @RequestBody Invoice invoice) {
        try {
            return ResponseEntity.ok(invoiceService.updateInvoice(id, invoice));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Update invoice status (Admin or Client only)
    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN') or hasRole('CLIENT')")
    public ResponseEntity<Invoice> updateInvoiceStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        try {
            InvoiceStatus invoiceStatus = InvoiceStatus.valueOf(status.toUpperCase());
            return ResponseEntity.ok(invoiceService.updateInvoiceStatus(id, invoiceStatus));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete an invoice (Admin only)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> deleteInvoice(@PathVariable Long id) {
        try {
            invoiceService.deleteInvoice(id);
            return ResponseEntity.ok(Map.of("message", "Invoice deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Get overdue invoices (Admin only)
    @GetMapping("/overdue")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Invoice>> getOverdueInvoices() {
        List<Invoice> invoices = invoiceService.getOverdueInvoices();
        if (invoices.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(invoices);
    }
}