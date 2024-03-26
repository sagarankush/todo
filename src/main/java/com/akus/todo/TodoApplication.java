package com.akus.todo;

import com.akus.todo.data.TaskRepository;
import com.akus.todo.data.UsersRepository;
import com.akus.todo.model.Task;
import com.akus.todo.model.Users;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Optional;

@SpringBootApplication
public class TodoApplication {

	public static void main(String[] args) {
		SpringApplication.run(TodoApplication.class, args);
	}

	@Bean
	public CommandLineRunner dataLoader(TaskRepository taskRepository, UsersRepository usersRepository){
		return args -> {
			usersRepository.save((new Users(1L, "Ramesh", "Jobs", "1234213451")));
			Optional<Users> user = usersRepository.findById(1L);
			if(user.isPresent()){
				Users realUser = user.get();
				taskRepository.save(new Task(1L, realUser, "This is first Task"));
			}
		};
	}

}
