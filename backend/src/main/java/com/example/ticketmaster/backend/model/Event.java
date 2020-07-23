package com.example.ticketmaster.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.Instant;

@Entity
@Data
@NoArgsConstructor
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
