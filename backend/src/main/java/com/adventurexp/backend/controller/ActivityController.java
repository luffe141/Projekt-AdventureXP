package com.adventurexp.backend.controller;

import com.adventurexp.backend.model.Activity;
import com.adventurexp.backend.service.ActivityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
public class ActivityController
{
    private final ActivityService service;

    public ActivityController(ActivityService service)
    {
        this.service = service;
    }

    @GetMapping
    public List<Activity> getActivities()
    {
        return service.getActivities();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Activity> getActivityById(@PathVariable int id)
    {
        try
        {
            Activity activity = service.getActivityById(id);

            return ResponseEntity.ok(activity);
        }
        catch (RuntimeException e)
        {
            return ResponseEntity.notFound().build();
        }
    }


}
