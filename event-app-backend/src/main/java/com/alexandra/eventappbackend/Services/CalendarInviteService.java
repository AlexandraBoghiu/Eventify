package com.alexandra.eventappbackend.Services;

import com.alexandra.eventappbackend.DTOs.EventDto;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class CalendarInviteService {

    public void sendCalendarInvite(String recipient, EventDto event) {
        Properties props = new Properties();
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.starttls.enable", "true");

        Session session = Session.getInstance(props,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication("noreply.event.app@gmail.com", "pass-placeholder");
                    }
                });

        try {
            Calendar startCal = Calendar.getInstance();
            startCal.set(event.getStartDate().getYear(), event.getStartDate().getMonthValue(), event
                            .getStartDate().getDayOfMonth(),
                    event.getStartTime().getHour(), event.getStartTime().getMinute());

            Calendar endCal = Calendar.getInstance();
            endCal.set(event.getEndDate().getYear(), event.getEndDate().getMonthValue(), event.getEndDate().getDayOfMonth(),
                    event.getEndTime().getHour(), event.getEndTime().getMinute());

            StringBuilder ical = new StringBuilder();
            ical.append("BEGIN:VCALENDAR\n")
                    .append("PRODID:-//Microsoft Corporation//Outlook 16.0 " +
                            "MIMEDIR//EN\n")
                    .append("VERSION:2.0\n")
                    .append("METHOD:REQUEST\n")
                    .append("BEGIN:VEVENT\n")
                    .append("DTSTART:").append(toICalDateFormat(startCal.getTime())).append("\n")
                    .append("DTEND:").append(toICalDateFormat(endCal.getTime())).append("\n")
                    .append("LOCATION:").append(event.getLocation()).append("\n")
                    .append("SUMMARY:").append(event.getName()).append("\n")
                    .append("DESCRIPTION:").append(event.getDescription()).append("\n")
                    .append("UID:").append(UUID.randomUUID()).append("\n")
                    .append("ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;" +
                            "RSVP=FALSE:mailto:").append(recipient).append("\n")
                    .append("ORGANIZER:mailto:noreply.event.app@gmail.com\n")
                    .append("SEQUENCE:0\n")
                    .append("STATUS:CONFIRMED\n")
                    .append("TRANSP:OPAQUE\n")
                    .append("END:VEVENT\n")
                    .append("END:VCALENDAR");

            String icalString = ical.toString();
            Message message = new MimeMessage(session);
            message.setFrom(new
                    InternetAddress("noreply.event.app@gmail.com"));
            message.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(recipient));
            message.setSubject("You're invited! " + event.getName());

            BodyPart messageBodyPart = new MimeBodyPart();
            messageBodyPart.setHeader("Content-Class", "urn:content-classes:calendarmessage");
            messageBodyPart.setHeader("Content-ID", "calendar_message");
            messageBodyPart.setHeader("Content-Disposition", "inline; filename=invite.ics");
            messageBodyPart.setContent(icalString, "text/calendar;method=REQUEST");
            messageBodyPart.setHeader("Content-Type",
                    "text/calendar;method=REQUEST;charset=UTF-8");

            Multipart multipart = new MimeMultipart("mixed");
            multipart.addBodyPart(messageBodyPart);
            message.setContent(multipart);

            Transport.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    private static String toICalDateFormat(Date date) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd'T'HHmmss'Z'");
        dateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
        return dateFormat.format(date);
    }
}
