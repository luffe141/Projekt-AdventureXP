package com.adventurexp.backend.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public record CreateReservationRequest(
        String name,
        String email,
        String phone,
        int activityId,
        LocalDate date,
        LocalTime time,
        int numberOfPeople
)
{}
