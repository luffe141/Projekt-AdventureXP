package com.adventurexp.backend.controller;

import java.sql.Connection;
import java.sql.SQLException;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adventurexp.backend.ConnectionManager;

@RestController
public class TestController
{
    private final ConnectionManager connectionManager;

    public TestController(ConnectionManager connectionManager)
    {
        this.connectionManager = connectionManager;
    }

    @GetMapping("/db-test")
    public String testDB()
    {
        try (Connection conn = connectionManager.getConnection())
        {
            return conn.isValid(2)
                    ? "Connected successfully to the database"
                    : "Database connection was opened, but validation failed";
        }
        catch (SQLException e)
        {
            return "Failed to connect to the database: " + e.getMessage();
        }
    }
}