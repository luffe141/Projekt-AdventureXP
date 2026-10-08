package com.adventurexp.backend.service;

import com.adventurexp.backend.dto.CreateReservationRequest;
import com.adventurexp.backend.model.Activity;
import com.adventurexp.backend.model.Customer;
import com.adventurexp.backend.model.Reservation;
import com.adventurexp.backend.repository.ActivityRepo;
import com.adventurexp.backend.repository.CustomerRepo;
import com.adventurexp.backend.repository.ReservationRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationService
{
    private final ReservationRepo repository;
    private final CustomerRepo customerRepo;
    private final CustomerService customerService;
    private final ActivityRepo activityRepo;

    public ReservationService(ReservationRepo repository, CustomerRepo customerRepo, CustomerService customerService, ActivityRepo activityRepo)
    {
        this.repository = repository;
        this.customerRepo = customerRepo;
        this.customerService = customerService;
        this.activityRepo = activityRepo;
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
            throw new RuntimeException("Reservation not found");
        }

        return reservation.get();
    }

    public void createReservation(CreateReservationRequest request)
    {
        Customer customer = customerRepo.findByEmail(request.email());

        if (customer == null)
        {
            customer = customerService.createCustomer(new Customer(
                    request.name(),
                    request.email(),
                    request.phone()
                    ));
        }

        Reservation reservation = new Reservation();

        reservation.setCustomer(customer);

        Activity activity = activityRepo.findById(request.activityId())
                        .orElseThrow(() -> new RuntimeException("Activity not found"));


        reservation.setActivity(activity);

        reservation.setStartTime(request.time());
        reservation.setDate(request.date());
        if (request.numberOfPeople() < 1)
        {
            throw new RuntimeException("Number of people should be greater than 0");
        }
        reservation.setNumberOfPeople(request.numberOfPeople());

        repository.save(reservation);
    }

    public void updateReservation(int id, Reservation update)
    {
        Optional<Reservation> reservationOptional = repository.findById(id);

        if (reservationOptional.isEmpty())
        {
            throw new RuntimeException("Reservation not found");
        }

        Reservation reservation = reservationOptional.get();

        reservation.setDate(update.getDate());
        reservation.setStartTime(update.getStartTime());
        reservation.setNumberOfPeople(update.getNumberOfPeople());

        repository.save(reservation);
    }

    public void deleteReservation(int id)
    {
        Optional<Reservation> reservationOptional = repository.findById(id);

        if (reservationOptional.isEmpty())
        {
            throw new RuntimeException("Reservation not found");
        }

        repository.delete(reservationOptional.get());
    }
}
