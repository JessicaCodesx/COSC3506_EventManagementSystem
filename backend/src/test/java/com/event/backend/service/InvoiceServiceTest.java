package com.event.backend.service;

import com.event.backend.model.Invoice;
import com.event.backend.model.InvoiceStatus;
import com.event.backend.repository.InvoiceRepository;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class InvoiceServiceTest {

    @Mock
    private InvoiceRepository invoiceRepository;

    @InjectMocks
    private InvoiceService invoiceService;

    public InvoiceServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateInvoice() {
        Invoice invoice = new Invoice();
        invoice.setTotalAmount(200.0);
        invoice.setStatus(InvoiceStatus.PENDING);
        invoice.setDueDate(LocalDate.now());

        when(invoiceRepository.save(invoice)).thenReturn(invoice);

        Invoice result = invoiceService.create(invoice);
        assertNotNull(result);
        assertEquals(200.0, result.getTotalAmount());
    }

    @Test
    public void testGetAllInvoices() {
        when(invoiceRepository.findAll()).thenReturn(List.of(new Invoice(), new Invoice()));
        assertEquals(2, invoiceService.getAll().size());
    }
}