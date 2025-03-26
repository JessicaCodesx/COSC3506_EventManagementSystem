package com.event.backend.controller;

import com.event.backend.model.Invoice;
import com.event.backend.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "*")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping("/revenue-per-event")
    public Map<Long, Double> revenuePerEvent() {
        return reportService.getTotalRevenuePerEvent();
    }

    @GetMapping("/event-count-per-client")
    public Map<Long, Long> eventCountPerClient() {
        return reportService.getEventCountPerClient();
    }

    @GetMapping("/invoice-status")
    public Map<String, Long> invoiceStatusCounts() {
        return reportService.getInvoiceStatusCounts();
    }

    @GetMapping("/overdue-invoices")
    public List<Invoice> overdueInvoices() {
        return reportService.getOverdueInvoices();
    }
}
