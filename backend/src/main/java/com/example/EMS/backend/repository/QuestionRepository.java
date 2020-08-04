package com.example.EMS.backend.repository;

import com.example.EMS.backend.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long>{

    @Query(
            value = "SELECT question FROM questions WHERE event_id = ?1",
            nativeQuery = true)
    List<?> findByEventId(Long id);

    @Transactional
    @Modifying
    @Query(
            value = "UPDATE questions SET event_id = ?2 WHERE ID = ?1",
            nativeQuery = true
    )
    void updateQuestionByEventId(Long question_id, Long event_id);

    @Transactional
    @Modifying
    @Query(
            value = "DELETE FROM questions WHERE event_id = ?1",
            nativeQuery = true
    )
    void deleteQuestionByEventId(Long id);

}
