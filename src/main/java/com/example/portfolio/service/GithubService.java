package com.example.portfolio.service;

import com.example.portfolio.model.GithubRepo;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class GithubService {

    private static final int GITHUB_MAX_PER_PAGE = 100;

    private final RestClient client;
    private final String username;
    private final int max;

    public GithubService(
        @Value("${github.username}") String username,
        @Value("${github.max-projects:6}") int max
    ) {
        this.client = RestClient.builder()
            .baseUrl("https://api.github.com")
            .defaultHeader("Accept", "application/vnd.github+json")
            .build();
        this.username = username;
        this.max = Math.clamp(max, 1, GITHUB_MAX_PER_PAGE);
    }

    @Cacheable("repos")
    public List<GithubRepo> latestRepos() {
        GithubRepo[] repos = client
            .get()
            .uri(
                "/users/{u}/repos?sort=pushed&direction=desc&per_page={n}",
                username,
                max
            )
            .retrieve()
            .body(GithubRepo[].class);

        return repos == null ? List.of() : List.of(repos);
    }
}
