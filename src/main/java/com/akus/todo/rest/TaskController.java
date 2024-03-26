package com.akus.todo.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TaskController {
    @GetMapping("/rest/getall")
    public String getAllTasks(){
        return "All the tasks";
    }
}
