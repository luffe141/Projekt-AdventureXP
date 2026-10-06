package com.adventurexp.backend.validation;

public class NameValidation
{
    public static boolean isNameValid(String name)
    {
        return name != null
                && !name.isBlank()
                && name.length() >= 2
                && name.length() <= 50;
    }
}
