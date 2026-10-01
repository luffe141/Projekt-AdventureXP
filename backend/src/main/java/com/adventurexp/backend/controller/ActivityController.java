package com.adventurexp.backend.controller;

import com.adventurexp.backend.model.Activity;
import com.adventurexp.backend.service.ActivityService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ActivityController
{
    private final ActivityService service;

    public ActivityController(ActivityService service)
    {
        this.service = service;
    }

    @GetMapping("/api/activities")
    public List<Activity> getActivities()
    {
        return service.getActivities();
    }

}
