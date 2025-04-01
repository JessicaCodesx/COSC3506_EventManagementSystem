package com.event.backend.controller;

import com.event.backend.model.Client;
import com.event.backend.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/clients")
@CrossOrigin(origins = "*")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping("/{id}")
    public ResponseEntity<Client> getClientById(@PathVariable Long id) {
        return clientService.getClientById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Client> updateClientProfile(@PathVariable Long id, @RequestBody Client updatedClient) {
        Client client = clientService.updateClientProfile(id, updatedClient);
        if (client != null) {
            return ResponseEntity.ok(client);
        }
        return ResponseEntity.notFound().build();
    }
}