//create a JPA entity class Users.java
// which follows the following sql scheme
//    CREATE TABLE user (
//            userId INT PRIMARY KEY,
//            firstName VARCHAR(100),
//    lastName VARCHAR(100),
//    phone VARCHAR(15),
//    email VARCHAR(100),
//    createdAT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//    modifiedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//    );

package com.akus.todo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class Users implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long userId;

    private String firstName;

    private String lastName;

    private String phone;

    private String email;

    private Date createdAt;

    private Date modifiedAt;
}