package com.example.ticketmaster.backend.repository;

import com.example.ticketmaster.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query(
            value = "SELECT COUNT(*) FROM users WHERE event_id = ?1",
            nativeQuery = true
    )
    int findAllByEvent(Long id);

    @Query(
            value = "SELECT users.first_name, users.last_name, users.tc, users.email, events.name \n" +
                    "AS event_name FROM users INNER JOIN events ON users.event_id = events.id",
            nativeQuery = true)
    List<?> findAllBookings();

    @Transactional
    @Modifying
    @Query(
            value = "DELETE FROM users WHERE event_id = ?1",
            nativeQuery = true
    )
    void deleteUserByEventId(Long id);

    @Query(
            value = "SELECT COUNT(*) FROM users WHERE event_id = ?1 AND tc = ?2",
            nativeQuery = true
    )
    int findUsersWithSameIdForAnEvent(Long id, Long tc);

    @Query(
            value = "SELECT  events.name , COUNT(*) FROM users, events WHERE events.id = users.event_id GROUP BY events.name ORDER BY COUNT(*) DESC",
            nativeQuery = true
    )
    List<?> findNumberOfEnrolledUsersForEvents();

    @Query(
            value = "SELECT quota FROM events WHERE id = ?1",
            nativeQuery = true
    )
    int reamingQuotaOfAnEvent(Long id);

    @Transactional
    @Modifying
    @Query(
            value = "UPDATE events SET quota = quota - 1 WHERE id = ?1",
            nativeQuery = true
    )
    void decreaseQuotaByOne(Long id);
}
