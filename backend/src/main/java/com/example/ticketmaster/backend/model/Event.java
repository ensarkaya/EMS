package com.example.ticketmaster.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.Instant;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@Getter
@Setter
@Table(name="events")
public class Event {

    @Id
    @GeneratedValue
    private Long id;

    @NotNull(message = "Name can not be null")
    private String name;

    @NotNull(message = "Begin date cannot be null")
    private Instant event_date;

    @NotNull(message = "End date cannot be null")
    private Instant event_end_date;

    private Long quota;
}
