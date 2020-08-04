package com.example.EMS.backend.controller;

import com.example.EMS.backend.exception.ApiRequestException;
import com.example.EMS.backend.helper.EmailHelper;
import com.example.EMS.backend.model.User;
import com.example.EMS.backend.repository.UserRepository;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.qrcode.QRCodeWriter;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import javax.validation.Valid;
import java.io.File;
import java.net.URI;
import java.sql.SQLOutput;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EmailHelper emailHelper;


    @GetMapping("/users")
    @ApiOperation(value = "Find all users")
    List<User> getUsers() {
        if(userRepository.findAll().isEmpty()) {
            throw new ApiRequestException(ApiRequestException.NO_RECORDS_FOUND);
        } else {
            return userRepository.findAll();
        }
    }

    @GetMapping("/bookings")
    @ApiOperation(value = "Find all bookings")
    List<?> getBookings() {
        if(userRepository.findAllBookings().isEmpty()) {
            throw new ApiRequestException(ApiRequestException.NO_RECORDS_FOUND);
        } else {
            return userRepository.findAllBookings();
        }
    }

    @GetMapping("/charts")
    @ApiOperation(value = "Find the name and the number of enrolled users of an event")
    List<?> getNumberOfEnrolls() {
        if(userRepository.findNumberOfEnrolledUsersForEvents().isEmpty()) {
            throw new ApiRequestException(ApiRequestException.NO_RECORDS_FOUND);
        } else {
            return userRepository.findNumberOfEnrolledUsersForEvents();
        }
    }


    @GetMapping("/dayCharts/{id}")
    @ApiOperation(value = "Find the name and the number of enrolled users of an event")
    List<?> getDatesOfEnrolls(@PathVariable Long id) {
        if(userRepository.datesOfEnrollsForAnEvent(id).isEmpty()) {
            throw new ApiRequestException(ApiRequestException.NO_RECORDS_FOUND);
        } else {
            List<?> ret = userRepository.datesOfEnrollsForAnEvent(id);
            System.out.println(Arrays.toString(ret.toArray()));
            return ret;
        }
    }

    @PostMapping("/users")
    @ApiOperation(value = "Save user and book an event",
            notes = "Provide first name of minimum 2 characters, correctly formatted email" +
                    "and id of existing event to book an event")
    ResponseEntity<User> createUser(@Valid @RequestBody User user) throws Exception {
        if(userRepository.findUsersWithSameIdForAnEvent(user.getEvent().getId(), user.getTc()) == 0)
        {
            if(userRepository.reamingQuotaOfAnEvent(user.getEvent().getId()) > 0){
                String qrText = "Kullanici adi: " + user.getFirst_name() + " Kullanici Soyadi: " + user.getLast_name()
                                + " TCK: " + user.getTc() + " Email: " + user.getEmail() + " Etkinlik: " + user.getEvent().toString();
                generateQRCodeImage(qrText);
                emailHelper.sendEmail(user.getEmail());

                userRepository.decreaseQuotaByOne(user.getEvent().getId());
                //HttpStatus accepted = HttpStatus.ACCEPTED;
                User result = userRepository.save(user);
                return ResponseEntity.created(new URI("/api/users" + result.getId())).body(result);
            }
            else{
                throw new ApiRequestException(ApiRequestException.QUOTA);
            }
        }
        else{
            throw new ApiRequestException(ApiRequestException.DUPLICATION);
        }

    }

    public static void generateQRCodeImage(String barcodeText) throws Exception {
        QRCodeWriter barcodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix =
                barcodeWriter.encode(barcodeText, BarcodeFormat.QR_CODE, 200, 200);
        File outputfile = new File("image.jpg");
        ImageIO.write(MatrixToImageWriter.toBufferedImage(bitMatrix), "jpg", outputfile);
    }

}
