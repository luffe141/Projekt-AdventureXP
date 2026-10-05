package com.adventurexp.backend.controller;

import com.adventurexp.backend.dto.CreateReservationRequest;
import com.adventurexp.backend.model.Activity;
import com.adventurexp.backend.model.Customer;
import com.adventurexp.backend.model.Reservation;
import com.adventurexp.backend.service.ReservationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController
{
    private final ReservationService service;

    public ReservationController(ReservationService service)
    {
        this.service = service;
    }

    @GetMapping
    public List<Reservation> getReservations()
    {
        return service.getReservations();
    }

   @GetMapping("/{id}")
    public ResponseEntity<Reservation> getReservationById(@PathVariable int id)
    {
        return ResponseEntity.ok(service.getReservationById(id));
    }

    @PostMapping
    public ResponseEntity<Void> createReservation(@RequestBody CreateReservationRequest request)
    {
        service.createReservation(request);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


    @PutMapping("/{id}")
    public ResponseEntity<Void> updateReservation(@PathVariable int id, @RequestBody Reservation reservation)
    {
        service.updateReservation(id, reservation);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }


   @DeleteMapping("/{id}")
   public ResponseEntity<Void> deleteReservation(@PathVariable int id)
   {
       service.deleteReservation(id);

       return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
   }
}
