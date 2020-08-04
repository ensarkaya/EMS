package com.example.EMS.backend.model;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@SequenceGenerator(name="seq", initialValue=1, allocationSize=100)
@Table(name="questions")
public class Question {

    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
    private Long id;

    @NotNull(message = "Question can not be null")
    private String question;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "event_id")
    private Event event ;
}
