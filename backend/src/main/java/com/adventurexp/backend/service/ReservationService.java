package com.adventurexp.backend.service;

import com.adventurexp.backend.model.Customer;
import com.adventurexp.backend.model.Reservation;
import com.adventurexp.backend.repository.ReservationRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Reservation getReservationById(int id)
    {
        Optional<Reservation> reservation = repository.findById(id);

        if (reservation.isEmpty())
        {
            throw new RuntimeException();
        }

        return reservation.get();
    }

    public void createReservation(Reservation reservation)
    {
        repository.save(reservation);
    }
}
