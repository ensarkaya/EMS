package com.example.ticketmaster.backend.exception;

public class ApiRequestException extends RuntimeException {

    public static final String NO_RECORDS_FOUND = "Kayıt bulunamadı";
    public static final String WRONG = "Bir şey ters gitti";
    public static final String VALID = "Lütfen gerekli alanlara geçerli bilgileri giriniz";
    public static final String DUPLICATION = "Bir etkinliğe aynı TCK ile birden fazla başvuru yapılamaz";
    public static final String QUOTA = "Bu etkinlik için yeterli kota kalmamıştır";
    public static final String PAST_EVENT_DELETION = "Zaten gerçekleşmiş bir etkinliği silemezsiniz";
    public static final String PAST_EVENT_MODIFICATION = "Lütfen başlangıç tarihini en az bugünün tarihi yapınız";
    public static final String PAST_EVENT_CREATION= "Geçmiş tarihli bir etkinlik yaratamazsınız";
    public static final String END_START_DATES = "Bitiş tarihi başlangıç tarihinden önce olamaz";
    public ApiRequestException(String message) {
        super(message);
    }

    public ApiRequestException(String message, Throwable cause) {
        super(message, cause);
    }
}
