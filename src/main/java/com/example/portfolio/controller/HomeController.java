package com.example.portfolio.controller;

import com.example.portfolio.model.GithubRepo;
import com.example.portfolio.service.GithubService;
import java.util.List;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.client.RestClientException;

@Controller
public class HomeController {

    private final GithubService github;

    public HomeController(GithubService github) {
        this.github = github;
    }

    @GetMapping("/")
    public String index(Model model) {
        List<GithubRepo> repos;

        try {
            repos = github.latestRepos();
        } catch (RestClientException e) {
            repos = List.of();
        }

        model.addAttribute("repos", repos);

        return "index";
    }
}
