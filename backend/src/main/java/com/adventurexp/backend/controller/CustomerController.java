package com.adventurexp.backend.controller;

import com.adventurexp.backend.model.Activity;
import com.adventurexp.backend.model.Customer;
import com.adventurexp.backend.model.Reservation;
import com.adventurexp.backend.service.CustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController
{
    private final CustomerService service;

    public CustomerController(CustomerService service)
    {
        this.service = service;
    }

    @GetMapping
    public List<Customer> getCustomers()
    {
        return service.getCustomers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable int id)
    {
        return ResponseEntity.ok(service.getCustomerById(id));
    }

    @PostMapping
    public ResponseEntity<Void> createCustomer(@RequestBody Customer customer)
    {
        service.createCustomer(customer);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateCustomer(@PathVariable int id, @RequestBody Customer update)
    {
        service.updateCustomer(id, update);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable int id)
    {
        service.deleteCustomer(id);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
