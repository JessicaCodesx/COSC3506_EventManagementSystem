package com.event.backend.service;

import com.event.backend.model.*;
import com.event.backend.repository.EventRepository;
import com.event.backend.repository.InvoiceRepository;
import com.event.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ReportServiceTest {

    @Mock
    private InvoiceRepository invoiceRepository;

    @Mock
    private EventRepository eventRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ReportService reportService;

    public ReportServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetInvoiceStatusCounts() {
        Invoice i1 = new Invoice(); i1.setStatus(InvoiceStatus.PAID);
        Invoice i2 = new Invoice(); i2.setStatus(InvoiceStatus.PENDING);
        Invoice i3 = new Invoice(); i3.setStatus(InvoiceStatus.PAID);
        when(invoiceRepository.findAll()).thenReturn(List.of(i1, i2, i3));

        Map<String, Long> result = reportService.getInvoiceStatusCounts();
        assertEquals(2, result.get("PAID"));
        assertEquals(1, result.get("PENDING"));
    }

    @Test
    public void testGetOverdueInvoices() {
        Invoice i1 = new Invoice(); i1.setStatus(InvoiceStatus.OVERDUE);
        Invoice i2 = new Invoice(); i2.setStatus(InvoiceStatus.PAID);
        when(invoiceRepository.findAll()).thenReturn(List.of(i1, i2));

        List<Invoice> result = reportService.getOverdueInvoices();
        assertEquals(1, result.size());
        assertEquals(InvoiceStatus.OVERDUE, result.get(0).getStatus());
    }
}