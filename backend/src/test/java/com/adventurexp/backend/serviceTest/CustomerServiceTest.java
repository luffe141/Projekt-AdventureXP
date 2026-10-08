package com.adventurexp.backend.serviceTest;


import com.adventurexp.backend.model.Customer;
import com.adventurexp.backend.repository.CustomerRepo;
import com.adventurexp.backend.service.CustomerService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class CustomerServiceTest
{
    private CustomerRepo mockCustomerRepo;
    private CustomerService mockCustomerService;

    @BeforeEach
    public void setUp()
    {
        mockCustomerRepo = mock(CustomerRepo.class);
        mockCustomerService = new CustomerService(mockCustomerRepo);
    }

    @Test
    void ShouldReturnCustomerById()
    {
        Customer customer = new Customer(
                1,
                "Leif",
                "email@email.com",
                "45968763"
        );

        when(mockCustomerRepo.findById(1)).thenReturn(Optional.of(customer));

        assertEquals(customer, mockCustomerService.getCustomerById(1));
    }

    @Test
    void ShouldThrowExceptionWhenCustomerNotFound()
    {
        when(mockCustomerRepo.findById(1)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class,
                () -> mockCustomerService.getCustomerById(1));
    }

    @Test
    void shouldThrowExceptionWhenNameIsInvalid()
    {
        Customer customer = new Customer(
                1,
                "",
                "jens@gmail.com",
                "22345678"
        );

        assertThrows(RuntimeException.class, () ->
                mockCustomerService.createCustomer(customer));
    }

    @Test
    void shouldThrowExceptionWhenEmailIsInvalid()
    {
        Customer customer = new Customer(
                1,
                "Karsten Kold",
                "invalidEmail",
                "22345678"
        );

        assertThrows(RuntimeException.class, () ->
                mockCustomerService.createCustomer(customer));
    }

    @Test
    void shouldThrowExceptionWhenPhoneNumberIsInvalid()
    {
        Customer customer = new Customer(
                1,
                "Torsten Larsen",
                "valid@gmail.com",
                "12345678"
        );

        assertThrows(RuntimeException.class, () ->
                mockCustomerService.createCustomer(customer));
    }

    @Test
    void shouldReturnAllCustomers()
    {
        when(mockCustomerRepo.findAll())
                .thenReturn(new ArrayList<>());

        List<Customer> result = mockCustomerService.getCustomers();

        assertNotNull(result);
    }
}
