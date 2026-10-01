package com.adventurexp.backend.service;

import com.adventurexp.backend.model.Customer;
import com.adventurexp.backend.repository.CustomerRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService
{
    private final CustomerRepo repository;

    public CustomerService(CustomerRepo repository)
    {
        this.repository = repository;
    }

    public List<Customer> getCustomers()
    {
        return repository.findAll();
    }
}
