package com.adventurexp.backend.service;

import com.adventurexp.backend.model.Activity;
import com.adventurexp.backend.model.Customer;
import com.adventurexp.backend.repository.CustomerRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Customer getCustomerById(int id)
    {
        Optional<Customer> customer = repository.findById(id);

        if(customer.isEmpty())
        {
            throw new RuntimeException();
        }

        return customer.get();
    }

    public void createCustomer(Customer customer)
    {
        repository.save(customer);
    }
}
