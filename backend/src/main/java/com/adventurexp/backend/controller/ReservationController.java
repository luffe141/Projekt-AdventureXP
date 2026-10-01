package com.adventurexp.backend.controller;

import com.adventurexp.backend.model.Activity;
import com.adventurexp.backend.model.Reservation;
import com.adventurexp.backend.service.ReservationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ReservationController
{
    private final ReservationService service;

    public ReservationController(ReservationService service)
    {
        this.service = service;
    }

    @GetMapping("/api/reservations")
    public List<Reservation> getReservations()
    {
        return service.getReservations();
    }
}
