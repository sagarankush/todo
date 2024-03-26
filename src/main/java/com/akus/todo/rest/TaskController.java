package com.akus.todo.rest;

import com.akus.todo.data.TaskRepository;
import com.akus.todo.model.Task;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TaskController {
    TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository){
        this.taskRepository = taskRepository;
    }
    @GetMapping("/rest/getall")
    public Iterable<Task> getAllTasks(){
        return taskRepository.findAll();
    }
}
