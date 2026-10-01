package com.adventurexp.backend.service;

import com.adventurexp.backend.model.Activity;
import com.adventurexp.backend.repository.ActivityRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityService
{
    private final ActivityRepo repository;

    public ActivityService(ActivityRepo repository)
    {
        this.repository = repository;
    }

    public List<Activity> getActivities()
    {
        return repository.findAll();
    }
}
