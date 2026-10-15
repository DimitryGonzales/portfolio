package com.example.portfolio.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactForm(
    @NotBlank @Size(max = 100) String name,
    @NotBlank @Size(max = 2000) String message
) {}
