package com.event.backend.service;

import com.event.backend.model.Payment;
import com.event.backend.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository repository;

    public Payment create(Payment payment) {
        return repository.save(payment);
    }

    public List<Payment> getByInvoiceId(Long invoiceId) {
        return repository.findByInvoiceId(invoiceId);
    }

    public List<Payment> getAll() {
        return repository.findAll();
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
