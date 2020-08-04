package com.example.EMS.backend.controller;

import com.example.EMS.backend.exception.ApiRequestException;
import com.example.EMS.backend.model.Answer;
import com.example.EMS.backend.model.Question;
import com.example.EMS.backend.repository.AnswerRepository;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api")
public class AnswerController {

    @Autowired
    private AnswerRepository answerRepository;

    @GetMapping("answer/{id}")
    @ApiOperation(value = "Find answers by user id",
            notes = "Provide an id to look up specific users answers",
            response = Answer.class)
    List<?> getAnswersByUserId(@PathVariable Long id) {
        if(answerRepository.findAnswerByUserId(id).isEmpty()) {
            throw new ApiRequestException(ApiRequestException.NO_RECORDS_FOUND);
        } else {
            List<?> ret = answerRepository.findAnswerByUserId(id);
            return ret;
        }
    }

    @PostMapping("/answerSave")
    @ApiOperation(value = "Save answers",
            notes = "Provide an answer",
            response = Answer.class)
    ResponseEntity<Answer> createAnswer(@Valid @RequestBody Answer answer) {
        try {
            Answer result = answerRepository.save(answer);
            return ResponseEntity.created(new URI("/api/answerSave" + result.getId())).body(result);
        } catch (Exception e) {
            System.out.println(ApiRequestException.WRONG);
        }
        throw new ApiRequestException(ApiRequestException.WRONG);
    }

    @DeleteMapping("/answer/{id}")
    @ApiOperation(value = "Delete a users answers",
            notes = "Provide an id of an existing user to delete its answers.",
            response = Answer.class)
    ResponseEntity<?> deleteAnswer(@PathVariable Long id) {
        answerRepository.deleteAnswersByUserId(id);
        HttpStatus accepted = HttpStatus.ACCEPTED;
        return ResponseEntity.ok().body(accepted);
    }


}

