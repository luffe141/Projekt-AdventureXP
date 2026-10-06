package com.adventurexp.backend.exceptionHandler;

public class ErrorResponse
{

    private String message;

    public ErrorResponse(String message)
    {
        this.message = message;
    }

    public String getMessage()
    {
        return message;
    }
}
