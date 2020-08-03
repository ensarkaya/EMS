package com.example.EMS.backend.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Data
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue
    private Long id;

    @NotNull(message = "First name can not be null")
    @Size(min = 1, message = "First name can not be less than 2 characters")
    private String first_name;

    @NotNull(message = "Last name can not be null")
    private String last_name;

    @NotNull(message = "TC can not be null")
    private Long tc;

    @Email(message = "Email is not formatted correctly")
    private String email;


    private String createdOn;

    @PrePersist
    public void prePersist() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy MM dd");
        createdOn = LocalDateTime.now().format( formatter);
    }


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "event_id")
    private Event event ;
}
