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
@Table(name="answers")
public class Answer {
    @Id
    @GeneratedValue
    private Long id;

    @NotNull(message = "Answer can not be null")
    private String answer;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user ;
}
