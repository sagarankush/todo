package com.akus.todo;

import com.akus.todo.data.TaskRepository;
import com.akus.todo.model.Task;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class TodoApplication {

	public static void main(String[] args) {
		SpringApplication.run(TodoApplication.class, args);
	}

	@Bean
	public CommandLineRunner dataLoader(TaskRepository taskRepository){
		return args -> {
			taskRepository.save(new Task(1L, "This is first Task"));
		};
	}

}
