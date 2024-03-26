package com.akus.todo.rest;

import com.akus.todo.data.UsersRepository;
import com.akus.todo.model.Users;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsersController {
    UsersRepository usersRepository;

    public UsersController(UsersRepository usersRepository){
        this.usersRepository = usersRepository;
    }
    @GetMapping("/rest/getalluser")
    public Iterable<Users> getAllTasks(){
        return usersRepository.findAll();
    }
}
