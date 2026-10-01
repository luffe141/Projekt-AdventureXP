package com.adventurexp.backend.controller;

import com.adventurexp.backend.model.Activity;
import com.adventurexp.backend.model.Customer;
import com.adventurexp.backend.service.CustomerService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CustomerController
{
    private final CustomerService service;

    public CustomerController(CustomerService service)
    {
        this.service = service;
    }

    @GetMapping("/api/customers")
    public List<Customer> getCustomers()
    {
        return service.getCustomers();
    }
}
