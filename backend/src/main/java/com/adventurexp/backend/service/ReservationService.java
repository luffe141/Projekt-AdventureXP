package com.adventurexp.backend.service;

import com.adventurexp.backend.model.Reservation;
import com.adventurexp.backend.repository.ReservationRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationService
{
    private final ReservationRepo repository;

    public ReservationService(ReservationRepo repository)
    {
        this.repository = repository;
    }

    public List<Reservation> getReservations()
    {
        return repository.findAll();
    }
}
