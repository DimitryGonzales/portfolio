package com.example.portfolio.controller;

import com.example.portfolio.model.ContactForm;
import com.example.portfolio.service.ContactService;
import com.example.portfolio.service.RateLimiter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ContactController {

    private final ContactService contact;
    private final RateLimiter rateLimiter;

    public ContactController(ContactService contact, RateLimiter rateLimiter) {
        this.contact = contact;
        this.rateLimiter = rateLimiter;
    }

    @PostMapping("/contact")
    @ResponseBody
    public ResponseEntity<String> send(
        @Valid ContactForm form,
        BindingResult result,
        HttpServletRequest request
    ) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body("invalid");
        }

        if (!rateLimiter.tryAcquire(request.getRemoteAddr())) {
            return ResponseEntity.status(429).body("rate-limited");
        }

        try {
            contact.send(form);
            return ResponseEntity.ok("sent");
        } catch (MailException e) {
            return ResponseEntity.internalServerError().body("error");
        }
    }
}
