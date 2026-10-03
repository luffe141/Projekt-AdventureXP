package com.adventurexp.backend.repository;

import com.adventurexp.backend.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepo extends JpaRepository<Customer,Integer>
{
    Customer findByEmail(String email);
}
