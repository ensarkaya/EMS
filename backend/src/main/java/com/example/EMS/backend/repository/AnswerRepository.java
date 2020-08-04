package com.example.EMS.backend.repository;

import com.example.EMS.backend.model.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;


public interface AnswerRepository extends JpaRepository<Answer, Long>{

    @Query(
            value = "SELECT answer FROM answers WHERE user_id  = ?1",
            nativeQuery = true)
    List<?> findAnswerByUserId(Long user_id);

    @Transactional
    @Modifying
    @Query(
            value = "INSERT INTO answers(user_id,answer) VALUES(?1, ?2) ",
            nativeQuery = true
    )
    void insertAnswerByUserId(Long user_id, String answer);

    @Transactional
    @Modifying
    @Query(
            value = "DELETE FROM answers WHERE user_id = ?1",
            nativeQuery = true
    )
    void deleteAnswersByUserId(Long user_id);

}
