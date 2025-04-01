package com.event.backend.repository;

import com.event.backend.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    List<Invoice> findByClientId(Long clientId);

    List<Invoice> findByClientIdAndStatus(Long clientId, Invoice.InvoiceStatus status);
}
