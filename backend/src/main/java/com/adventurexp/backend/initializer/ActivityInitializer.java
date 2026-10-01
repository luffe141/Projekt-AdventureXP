package com.adventurexp.backend.initializer;

import com.adventurexp.backend.model.Activity;
import com.adventurexp.backend.repository.ActivityRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ActivityInitializer implements CommandLineRunner
{
    private final ActivityRepo repository;

    public ActivityInitializer(ActivityRepo repository)
    {
        this.repository = repository;
    }

    @Override
    public void run(String... args)
    {
        if(repository.findAll().isEmpty())
        {
            List<Activity> activities = List.of(
                    new Activity("GoKart", "...", 60, 10, 200.0),
                    new Activity("Paintball", "...", 90, 16, 350.0),
                    new Activity("Sumo Wrestling", "...", 30, 12, 150.0),
                    new Activity("Minigolf", "...", 90, 6, 200.0));

            repository.saveAll(activities);
        }
    }
}
