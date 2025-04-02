package com.event.backend.service;

import com.event.backend.exception.ResourceNotFoundException;
import com.event.backend.model.Invoice;
import com.event.backend.model.InvoiceStatus;
import com.event.backend.model.Payment;
import com.event.backend.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;
    
    @Autowired
    private InvoiceService invoiceService;

    // Create a new payment (with auto-update of invoice status)
    @Transactional
    public Payment createPayment(Payment payment) {
        // Set payment date to today if not provided
        if (payment.getPaymentDate() == null) {
            payment.setPaymentDate(LocalDate.now());
        }
        
        // Save the payment
        Payment savedPayment = paymentRepository.save(payment);
        
        // Update invoice status to PAID if payment amount matches or exceeds total amount
        Invoice invoice = payment.getInvoice();
        if (invoice != null) {
            // Get total payments for this invoice
            List<Payment> payments = getPaymentsByInvoiceId(invoice.getId());
            double totalPaid = payments.stream()
                    .mapToDouble(Payment::getAmountPaid)
                    .sum();
            
            // Update invoice status if fully paid
            if (totalPaid >= invoice.getTotalAmount()) {
                invoiceService.updateInvoiceStatus(invoice.getId(), InvoiceStatus.PAID);
            } else {
                invoiceService.updateInvoiceStatus(invoice.getId(), InvoiceStatus.PROCESSING);
            }
        }
        
        return savedPayment;
    }

    // Get payment by ID
    public Payment getPaymentById(Long id) {
        return paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found with id: " + id));
    }

    // Get all payments
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }
    
    // Get payments by invoice ID
    public List<Payment> getPaymentsByInvoiceId(Long invoiceId) {
        return paymentRepository.findByInvoiceId(invoiceId);
    }

    // Delete a payment
    public void deletePayment(Long id) {
        if (!paymentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Payment not found with id: " + id);
        }
        paymentRepository.deleteById(id);
    }
}
