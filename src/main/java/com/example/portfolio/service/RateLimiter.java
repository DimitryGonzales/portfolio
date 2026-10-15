package com.example.portfolio.service;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import java.time.Duration;
import java.util.concurrent.atomic.AtomicInteger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class RateLimiter {

    private final Cache<String, AtomicInteger> attempts;
    private final int maxAttempts;

    public RateLimiter(
        @Value("${app.contact.max-per-window:3}") int maxAttempts,
        @Value("${app.contact.window-minutes:60}") long windowMinutes
    ) {
        this.maxAttempts = maxAttempts;
        this.attempts = Caffeine.newBuilder()
            .expireAfterWrite(Duration.ofMinutes(windowMinutes))
            .maximumSize(10_000)
            .build();
    }

    public boolean tryAcquire(String ip) {
        return (
            attempts.get(ip, k -> new AtomicInteger()).incrementAndGet() <=
            maxAttempts
        );
    }
}
