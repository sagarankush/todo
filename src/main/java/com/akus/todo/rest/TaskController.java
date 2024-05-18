package com.akus.todo.rest;

import com.akus.todo.data.TaskRepository;
import com.akus.todo.data.UsersRepository;
import com.akus.todo.model.Task;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/rest", produces = "application/json")
@CrossOrigin(origins = "*")
public class TaskController {
    private final TaskRepository taskRepository;
    private final UsersRepository usersRepository;

    public TaskController(TaskRepository taskRepository, UsersRepository usersRepository) {
        this.taskRepository = taskRepository;
        this.usersRepository = usersRepository;
    }

    @GetMapping("/getalltask")
    public Iterable<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @GetMapping("/getallbyuserid/{userId}")
    public Iterable<Task> getAllByUserId(@PathVariable Long userId) {
        return usersRepository.findById(userId)
                .map(taskRepository::findByUser)
                .orElse(null);
    }

    @GetMapping("/getbytaskid/{taskId}")
    public Task getByTaskId(@PathVariable Long taskId) {
        return taskRepository.findById(taskId).orElse(null);
    }

    @PostMapping("/savetask")
    public Task saveOrUpdateTask(@RequestBody Task task) {
        return taskRepository.save(task);
    }

    @DeleteMapping("/deletetask/{taskId}")
    public void deleteTask(@PathVariable Long taskId) {
        taskRepository.deleteById(taskId);
    }
}