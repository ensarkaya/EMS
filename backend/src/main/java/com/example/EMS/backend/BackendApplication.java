package com.example.EMS.backend;

import com.example.EMS.backend.repository.EventRepository;
import com.example.EMS.backend.repository.UserRepository;
import com.example.EMS.backend.model.Event;
import com.example.EMS.backend.model.User;
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
		    Event event1 = createEvent(eventRepo, "Party1","2019-12-29T17:00:00.000Z","2019-12-29T17:00:00.000Z",60L);
            Event event2 = createEvent(eventRepo, "Party2","2020-11-29T17:00:00.000Z","2020-12-29T17:00:00.000Z",30L);
            Event event3 = createEvent(eventRepo, "Party3","2021-12-19T17:00:00.000Z","2021-12-29T17:00:00.000Z",5L);
            Event event4 = createEvent(eventRepo, "Party4","2020-12-22T17:00:00.000Z","2021-05-29T17:00:00.000Z",2L);
            Event event5 = createEvent(eventRepo, "Party5","2020-11-29T17:00:00.000Z","2020-12-29T17:00:00.000Z",0L);
            Event event6 = createEvent(eventRepo, "Party6","2018-12-12T17:00:00.000Z","2021-12-29T17:00:00.000Z",10L);

            User user  = createUser(userRepo, event1, "Ensar1", "Kaya1", "ensar1@gmail.com", 12345678911L, "2019 08 02");
            User user4 = createUser(userRepo, event3, "Ensar4", "Kaya4", "ensar4@gmail.com", 12345321345L,"2020 08 02");
            User user3 = createUser(userRepo, event3, "Ensar3", "Kaya3", "ensar3@gmail.com", 12332112332L,"2020 08 02");
            User user2 = createUser(userRepo, event3, "Ensar2", "Kaya2", "ensar2@gmail.com", 12312912312L,"2020 08 01");
            User user5 = createUser(userRepo, event4, "Ensar5", "Kaya5", "ensar5@gmail.com", 12549112345L,"2020 08 02");
            User user9 = createUser(userRepo, event2, "Ensar9", "Kaya9", "ensar9@gmail.com", 12342321345L,"2018 12 29");
            User user8 = createUser(userRepo, event6, "Ensar8", "Kaya8", "ensar8@gmail.com", 12335412332L,"2020 08 02");
            User user7 = createUser(userRepo, event6, "Ensar7", "Kaya7", "ensar7@gmail.com", 12314212312L,"2020 08 01");
            User user6 = createUser(userRepo, event6, "Ensar6", "Kaya6", "ensar6@gmail.com", 12544312345L,"2020 08 02");
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

    private User createUser(UserRepository userRepo, Event event, String f_name, String l_name, String email, Long tc, String date) {
        User user = new User();

        user.setFirst_name(f_name);
        user.setLast_name(l_name);
        user.setTc(tc);
        user.setEmail(email);
        user.setEvent(event);
        user.setCreatedOn(date);
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
	            "Event Management System Backend API",
                "Sample API for personal project",
                "1.0",
                "Free to use",
                new springfox.documentation.service.Contact("Ensar Kaya", "ensarkaya@github.io", "ensarben@gmail.com"),
                "API License",
                "",
                Collections.emptyList());
    }
}
