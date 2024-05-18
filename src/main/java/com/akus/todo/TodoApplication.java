package com.akus.todo;

import com.akus.todo.data.TaskRepository;
import com.akus.todo.data.UsersRepository;
import com.akus.todo.model.Task;
import com.akus.todo.model.Users;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Date;
import java.util.List;

@SpringBootApplication
public class TodoApplication {

    public static void main(String[] args) {
        SpringApplication.run(TodoApplication.class, args);
    }

    @Bean
    public CommandLineRunner dataLoader(TaskRepository taskRepository, UsersRepository usersRepository) {
        return args -> {
            List<Users> users = List.of(
                    new Users(1L, "Ramesh", "Jobs", "1234213451", "Ramesh@Jobs.com", new Date(), new Date()),
                    new Users(2L, "Suresh", "Smith", "1335513616", "Suresh@Smith.com", new Date(), new Date()),
                    new Users(3L, "Durgesh", "Obama", "1234213451", "Durgesh@Obama.com", new Date(), new Date()),
                    new Users(4L, "Lankesh", "Cook", "1234213451", "Lankesh@Cook.com", new Date(), new Date()),
                    new Users(5L, "Dyakesh", "Page", "1234213451", "Dyakesh@Page.com", new Date(), new Date())
            );

            usersRepository.saveAll(users);

            users.forEach(user -> {
                List<Task> tasks = List.of(
                        new Task(null, "Monday Task", new Date(), "This is first Task " + user.getFirstName(), user),
                        new Task(null, "Tuesday Task", new Date(), "This is Second Task " + user.getFirstName(), user),
                        new Task(null, "Wednesday Task", new Date(), "This is third Task " + user.getFirstName(), user)
                );

                taskRepository.saveAll(tasks);
            });
        };
    }
}