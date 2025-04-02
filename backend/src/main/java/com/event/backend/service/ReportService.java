package com.event.backend.service;

import com.event.backend.model.Invoice;
import com.event.backend.model.InvoiceStatus;
import com.event.backend.model.Event;
import com.event.backend.repository.InvoiceRepository;
import com.event.backend.repository.UserRepository;
import com.event.backend.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ReportService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    public Map<Long, Double> getTotalRevenuePerEvent() {
        List<Invoice> invoices = invoiceRepository.findAll();

        return invoices.stream()
                .filter(inv -> inv.getStatus() == InvoiceStatus.PAID)
                .collect(Collectors.groupingBy(
                        inv -> inv.getEvent().getId(),
                        Collectors.summingDouble(Invoice::getTotalAmount)
                ));
    }

    public Map<Long, Long> getEventCountPerClient() {
        return eventRepository.findAll().stream()
                .collect(Collectors.groupingBy(
                        event -> event.getClient().getId(),
                        Collectors.counting()
                ));
    }

    public Map<String, Long> getInvoiceStatusCounts() {
        List<Invoice> invoices = invoiceRepository.findAll();
        Map<String, Long> statusCounts = new HashMap<>();

        for (Invoice invoice : invoices) {
            String status = invoice.getStatus().toString();
            statusCounts.put(status, statusCounts.getOrDefault(status, 0L) + 1);
        }

        return statusCounts;
    }

    public List<Invoice> getOverdueInvoices() {
        return invoiceRepository.findAll().stream()
                .filter(inv -> inv.getStatus() == InvoiceStatus.OVERDUE)
                .toList();
    }
}
