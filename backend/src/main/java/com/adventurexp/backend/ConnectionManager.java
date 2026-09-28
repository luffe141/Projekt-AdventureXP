package com.adventurexp.backend;

import java.sql.Connection;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.springframework.stereotype.Component;

@Component
public class ConnectionManager
{
    private final DataSource dataSource;

    public ConnectionManager(DataSource dataSource)
    {
        this.dataSource = dataSource;
    }

    public Connection getConnection() throws SQLException
    {
        Connection connection = dataSource.getConnection();
        connection.setAutoCommit(true);
        return connection;
    }
}