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
			usersRepository.save((new Users(2L, "Suresh", "Smith", "1335513616")));
			usersRepository.save((new Users(3L, "Durgesh", "Obama", "1234213451")));
			usersRepository.save((new Users(4L, "Lankesh", "Cook", "1234213451")));
			usersRepository.save((new Users(5L, "Dyakesh", "Page", "1234213451")));
			Optional<Users> user1 = usersRepository.findById(1L);
			Optional<Users> user2 = usersRepository.findById(2L);
			Optional<Users> user3 = usersRepository.findById(3L);
			Optional<Users> user4 = usersRepository.findById(4L);
			Optional<Users> user5 = usersRepository.findById(5L);
			if(user1.isPresent()){
				Users realUser = user1.get();
				taskRepository.save(new Task(1L, realUser, "Monday Task", new Date(), "This is first Task Ramesh"));
				taskRepository.save(new Task(2L, realUser, "Tuesday Task", new Date(), "This is Second Task Ramesh"));
				taskRepository.save(new Task(3L, realUser, "Wednesday Task", new Date(), "This is third Task Ramesh"));
				taskRepository.save(new Task(4L, realUser, "Monday Task", new Date(), "This is fourth Task Ramesh"));
				taskRepository.save(new Task(5L, realUser, "Monday Task", new Date(), "This is fifth Task Ramesh"));
				taskRepository.save(new Task(6L, realUser, "Monday Task", new Date(), "This is sixth Task Ramesh"));
			}
			if(user2.isPresent()){
				Users realUser = user2.get();
				taskRepository.save(new Task(7L, realUser, "Monday Task", new Date(), "This is first Task Suresh"));
				taskRepository.save(new Task(8L, realUser, "Tuesday Task", new Date(), "This is Second Task Suresh"));
				taskRepository.save(new Task(9L, realUser, "Wednesday Task", new Date(), "This is third Task Suresh"));
			}
			if(user3.isPresent()){
				Users realUser = user3.get();
				taskRepository.save(new Task(10L, realUser, "Monday Task", new Date(), "This is first Task Durgesh"));
				taskRepository.save(new Task(11L, realUser, "Tuesday Task", new Date(), "This is Second Task Durgesh"));
				taskRepository.save(new Task(12L, realUser, "Wednesday Task", new Date(), "This is third Task Durgesh"));
			}
			if(user4.isPresent()){
				Users realUser = user4.get();
				taskRepository.save(new Task(13L, realUser, "Monday Task", new Date(), "This is first Task Lankesh"));
				taskRepository.save(new Task(14L, realUser, "Tuesday Task", new Date(), "This is Second Task Lankesh"));
				taskRepository.save(new Task(15L, realUser, "Wednesday Task", new Date(), "This is third Task Lankesh"));
			}
			if(user5.isPresent()){
				Users realUser = user5.get();
				taskRepository.save(new Task(16L, realUser, "Monday Task", new Date(), "This is first Task Dyakesh"));
				taskRepository.save(new Task(17L, realUser, "Tuesday Task", new Date(), "This is Second Task Dyakesh"));
				taskRepository.save(new Task(18L, realUser, "Wednesday Task", new Date(), "This is third Task Dyakesh"));
			}
		};
	}

}
