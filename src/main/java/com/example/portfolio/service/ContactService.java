package com.example.portfolio.service;

import com.example.portfolio.model.ContactForm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private final JavaMailSender mailSender;
    private final String from;
    private final String to;

    public ContactService(
        JavaMailSender mailSender,
        @Value("${spring.mail.username}") String from,
        @Value("${app.contact.to}") String to
    ) {
        this.mailSender = mailSender;
        this.from = from;
        this.to = to;
    }

    public void send(ContactForm form) {
        String safeName = form.name().replaceAll("[\\r\\n]+", " ").trim();

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom(from);
        mail.setTo(to);
        mail.setSubject("Portfolio message from " + safeName);
        mail.setText("From: " + safeName + "\n\n" + form.message());
        mailSender.send(mail);
    }
}
