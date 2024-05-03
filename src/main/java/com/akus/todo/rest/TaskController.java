package com.akus.todo.rest;

import com.akus.todo.data.TaskRepository;
import com.akus.todo.data.UsersRepository;
import com.akus.todo.model.Task;
import com.akus.todo.model.Users;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping(path = "/rest", produces = "application/json")
@CrossOrigin(origins="*")
public class TaskController {
    TaskRepository taskRepository;
    UsersRepository usersRepository;

    public TaskController(TaskRepository taskRepository, UsersRepository usersRepository){
        this.taskRepository = taskRepository;
        this.usersRepository = usersRepository;
    }
    @GetMapping(path = "/getall")
    public Iterable<Task> getAllTasks(){
        return taskRepository.findAll();
    }

    @GetMapping(path = "/getbyuser/{userId}")
    public Iterable<Task> getTaskByUserId(@PathVariable("userId") Long userId) {
        Optional<Users> user = usersRepository.findById(userId);
        if(user.isPresent())
            return taskRepository.findByUser(user.get());
        return null;
    }

    @GetMapping(path = "/gettaskbyid/{taskId}")
    public Task getTaskById(@PathVariable("taskId") Long taskId){
        return taskRepository.findById(taskId).get();
    }

    @PostMapping(path = "/savetaskbyuser/{userId}", consumes = "application/json")
    public Task saveTaskByUserId(@PathVariable("userId") Long userId, @RequestBody String taskDetails){
        Optional<Users> user = usersRepository.findById(userId);
        if(user.isPresent()){
            Task task = new Task(null, user.get(), "Random Title", new Date(), taskDetails);
            return taskRepository.save(task);
        }
        return null;
    }

    @DeleteMapping(path = "/deletetask/{taskId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTask(@PathVariable Long taskId){
        taskRepository.deleteById(taskId);
    }

    @PostMapping(path = "/savetask", consumes = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public Task saveTask(@RequestBody Task task){
        return taskRepository.save(task);
    }

    @PutMapping(path = "/updatetask/{taskId}", consumes = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public Task updateTask(@PathVariable Long taskId, @RequestBody String taskDetail){
        Task task = taskRepository.findById(taskId).get();
        task.setTaskDetails(taskDetail);
        return taskRepository.save(task);
    }
}
