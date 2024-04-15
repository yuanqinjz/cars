package com.cardb;

import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.cardb.domain.AppUser;
import com.cardb.domain.AppUserRepository;
import com.cardb.domain.Car;
import com.cardb.domain.CarRepository;
import com.cardb.domain.Owner;
import com.cardb.domain.OwnerRepository;



@SpringBootApplication
public class CarDatabaseApplication implements CommandLineRunner{
	private static final Logger logger =
	        LoggerFactory.getLogger(CarDatabaseApplication.class);
	private final CarRepository repository;
	private final OwnerRepository ownerRepository;
	private final AppUserRepository userRepository;
	
	
	public CarDatabaseApplication(CarRepository repository, 
			OwnerRepository ownerRepository, AppUserRepository userRepository) {
		super();
		this.repository = repository;
		this.ownerRepository = ownerRepository;
		this.userRepository = userRepository;
	}

	public static void main(String[] args) {
		SpringApplication.run(CarDatabaseApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Owner owner1 = new Owner("John" , "Johnson");
		Owner owner2 = new Owner("Mary" , "Robinson");
		ownerRepository.saveAll(Arrays.asList(owner1, owner2));
		
		repository.save(new Car("Ford", "Mustang", "Red",
		        "ADF-1121", 2023, 59000, owner1));
		repository.save(new Car("Nissan", "Leaf", "White",
		        "SSJ-3002", 2020, 29000, owner2));
		repository.save(new Car("Toyota", "Prius",
		        "Silver", "KKO-0212", 2022, 39000, owner2));
		// Fetch all cars and log to console
		for (Car car : repository.findAll()) {
			logger.info("brand: {}, model: {}",
			  car.getBrand(), car.getModel());
		}
		// Username: user, password: user
		userRepository.save(new AppUser("user",
		            "$2a$10$NVM0n8ElaRgg7zWO1CxUdei7vWoPg91Lz2aYavh9.f9q0e4bRadue","USER"));
		        // Username: admin, password: admin
		userRepository.save(new AppUser("admin",
		            "$2a$10$8cjz47bjbR4Mn8GMg9IZx.vyjhLXR/SKKMSZ9.mP9vpMu0ssKi8GW", "ADMIN"));
	}

}
