package com.adventurexp.backend.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "activity")
public class Activity
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int activityId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private int duration;

    @Column(nullable = false)
    private int minimumAge;

    @Column(nullable = false)
    private double price;

    @OneToMany(mappedBy = "activity")
    private List<Reservation> reservations;

    public Activity(){}

    public Activity(String name, String description, int duration, int minimumAge, double price) {
        this.name = name;
        this.description = description;
        this.duration = duration;
        this.minimumAge = minimumAge;
        this.price = price;
    }

    public int getActivityId() {
        return activityId;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public int getDuration() {
        return duration;
    }

    public int getMinimumAge() {
        return minimumAge;
    }

    public double getPrice() {
        return price;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public void setMinimumAge(int minimumAge) {
        this.minimumAge = minimumAge;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
