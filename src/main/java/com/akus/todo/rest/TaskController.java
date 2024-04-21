package com.akus.todo.rest;

import com.akus.todo.data.TaskRepository;
import com.akus.todo.model.Task;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/rest", produces = "application/json")
public class TaskController {
    TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository){
        this.taskRepository = taskRepository;
    }
    @GetMapping(path = "/getall")
    public Iterable<Task> getAllTasks(){
        return taskRepository.findAll();
    }

    @PostMapping(path = "/savetask", consumes = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public Task saveTask(@RequestBody Task task){
        return taskRepository.save(task);
    }
}
