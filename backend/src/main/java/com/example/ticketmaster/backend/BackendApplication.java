package com.example.ticketmaster.backend;

import com.example.ticketmaster.backend.model.Event;
import com.example.ticketmaster.backend.model.User;
import com.example.ticketmaster.backend.repository.EventRepository;
import com.example.ticketmaster.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.time.Instant;
import java.util.Collections;

@SpringBootApplication
@EnableSwagger2
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner init(EventRepository eventRepo, UserRepository userRepo){
		return args -> {
		    Event event1 = createEvent(eventRepo, "Party","2019-12-29T17:00:00.000Z","2019-12-29T17:00:00.000Z",80L);
		    User user = createUser(userRepo, event1, "Asim", "Ghani", "asim@gmail.com", 12345678912314L);
		};
	}

    private Event createEvent(EventRepository eventRepo, String name, String event_date, String event_end_date, Long quota) {
        Instant instant = Instant.parse(event_date);
        Instant instant_end = Instant.parse(event_end_date);
        Event event = new Event();

        event.setName(name);
        event.setEvent_date(instant);
        event.setEvent_end_date(instant_end);
        event.setQuota(quota);
        return eventRepo.save(event);
    }

    private User createUser(UserRepository userRepo, Event event, String f_name, String l_name, String email, Long tc) {
        User user = new User();

        user.setFirst_name(f_name);
        user.setLast_name(l_name);
        user.setTc(tc);
        user.setEmail(email);
        user.setEvent(event);
        return userRepo.save(user);
    }

	@Bean
    public Docket swaggerConfiguration() {

	    return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .build()
                .apiInfo(apiDetails());
    }

    private ApiInfo apiDetails() {
	    return new ApiInfo(
	            "Ticket Master Backend API",
                "Sample API for personal project",
                "1.0",
                "Free to use",
                new springfox.documentation.service.Contact("Asim Ghani", "ghaniasim@github.io", "asim.ghani@metropolia.fi"),
                "API License",
                "",
                Collections.emptyList());
    }
}
