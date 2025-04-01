package com.event.backend.repository;

import com.event.backend.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    // No additional methods needed for this functionality
}