package com.adventurexp.backend.service;

import com.adventurexp.backend.model.Activity;
import com.adventurexp.backend.model.Customer;
import com.adventurexp.backend.repository.CustomerRepo;
import com.adventurexp.backend.validation.EmailValidation;
import com.adventurexp.backend.validation.NameValidation;
import com.adventurexp.backend.validation.PhoneNumberValidation;
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
            throw new RuntimeException("Customer with id " + id + " not found");
        }

        return customer.get();
    }

    public Customer createCustomer(Customer customer)
    {
        if (!EmailValidation.isEmailValid(customer.getEmail()))
        {
            throw new RuntimeException("Email is not valid");
        }

        if (!NameValidation.isNameValid(customer.getName()))
        {
            throw new RuntimeException("Name is not valid");
        }

        if (!PhoneNumberValidation.isPhoneNumberValid(customer.getPhone()))
        {
            throw new RuntimeException("Phone number is not valid");
        }

        return repository.save(customer);
    }

    public void updateCustomer(int id, Customer update)
    {
        Optional<Customer> customerOptional = repository.findById(id);

        if (customerOptional.isEmpty())
        {
            throw new RuntimeException("Customer with id " + id + " not found");
        }

        Customer customer = customerOptional.get();

        customer.setName(update.getName());
        customer.setEmail(update.getEmail());
        customer.setPhone(update.getPhone());

        repository.save(customer);
    }
}
