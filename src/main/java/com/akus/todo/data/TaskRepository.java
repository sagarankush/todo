package com.akus.todo.data;

import com.akus.todo.model.Task;
import com.akus.todo.model.Users;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TaskRepository extends CrudRepository<Task, Long> {

    List<Task> findByUser(Users user);
}
