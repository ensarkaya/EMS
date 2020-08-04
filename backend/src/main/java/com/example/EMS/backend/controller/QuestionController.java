package com.example.EMS.backend.controller;

import com.example.EMS.backend.exception.ApiRequestException;
import com.example.EMS.backend.model.Event;
import com.example.EMS.backend.model.Question;
import com.example.EMS.backend.repository.QuestionRepository;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api")
public class QuestionController {

    @Autowired
    private QuestionRepository questionRepository;

    @GetMapping("question/{id}")
    @ApiOperation(value = "Find questions by event id",
            notes = "Provide an id to look up specific event questions",
            response = Question.class)
    List<?> getQuestionsByEventId(@PathVariable Long id) {
        if(questionRepository.findByEventId(id).isEmpty()) {
            throw new ApiRequestException(ApiRequestException.NO_RECORDS_FOUND);
        } else {
            List<?> ret = questionRepository.findByEventId(id);
            return ret;
        }
    }

    @PostMapping("/questionSave")
    @ApiOperation(value = "Save questions",
            notes = "Provide a question",
            response = Question.class)
    ResponseEntity<Question> createQuestion(@Valid @RequestBody Question question) {
        try {
            System.out.println("ananın ammı spring");
            System.out.println("question : " + question + " questioninside: " + question.getQuestion()+ " last: " + question.toString() );
            System.out.println("123");
            Question result = questionRepository.save(question);
            questionRepository.updateQuestionByEventId(result.getId(),question.getEvent().getId());
            return ResponseEntity.created(new URI("/api/questionSave" + result.getId())).body(result);
        } catch (Exception e) {
            throw new ApiRequestException(ApiRequestException.WRONG);
        }
    }


    @DeleteMapping("/question/{id}")
    @ApiOperation(value = "Delete an events questions",
            notes = "Provide an id of an existing event to delete its questions.",
            response = Question.class)
    ResponseEntity<?> deleteQuestion(@PathVariable Long id) {

        questionRepository.deleteQuestionByEventId(id);
        HttpStatus accepted = HttpStatus.ACCEPTED;
        return ResponseEntity.ok().body(accepted);
    }


}
