package com.example.portfolio.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.Duration;
import java.time.Instant;

@JsonIgnoreProperties(ignoreUnknown = true)
public record GithubRepo(
    String name,
    String description,
    String language,
    @JsonProperty("html_url") String htmlUrl,
    @JsonProperty("pushed_at") Instant pushedAt,
    License license
) {
    @JsonIgnoreProperties(ignoreUnknown = true)
    public record License(@JsonProperty("spdx_id") String spdxId) {}

    public String licenseLabel() {
        return license == null || "NOASSERTION".equals(license.spdxId())
            ? null
            : license.spdxId() + " license";
    }

    public String timeAgo() {
        Duration d = Duration.between(pushedAt, Instant.now());
        if (d.toSeconds() < 60) return Math.max(d.toSeconds(), 0) + "s";
        if (d.toMinutes() < 60) return d.toMinutes() + "m";
        if (d.toHours() < 24) return d.toHours() + "h";
        return d.toDays() + "d";
    }

    public String imageUrl() {
        return (
            "https://opengraph.githubassets.com/1/" +
            htmlUrl.replace("https://github.com/", "")
        );
    }
}
