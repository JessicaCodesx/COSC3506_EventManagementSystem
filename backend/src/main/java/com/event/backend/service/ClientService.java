package com.event.backend.service;

import com.event.backend.model.Client;
import com.event.backend.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public Optional<Client> getClientById(Long id) {
        return clientRepository.findById(id);
    }

    public Client updateClientProfile(Long id, Client updatedClient) {
        return clientRepository.findById(id).map(client -> {
            client.setName(updatedClient.getName());
            client.setEmail(updatedClient.getEmail());
            client.setPhoneNumber(updatedClient.getPhoneNumber());
            client.setPhysicalAddress(updatedClient.getPhysicalAddress());
            return clientRepository.save(client);
        }).orElse(null);
    }
}