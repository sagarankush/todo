//create a JPA entity class Users.java
// which follows the following sql scheme
//    CREATE TABLE user (CREATE TABLE task (
//    taskId INT PRIMARY KEY,
//    title VARCHAR(100),
//    details TEXT,
//    dueDate TIMESTAMP,
//    userId INT,
//    FOREIGN KEY (userId) REFERENCES user(userId)
//      );

package com.akus.todo.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor(access= AccessLevel.PRIVATE, force=true)
public class Task implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long taskId;

    private String title;

    private Date dueDate;

    private String details;

    @ManyToOne
    private Users user;
}