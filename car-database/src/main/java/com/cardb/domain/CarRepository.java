package com.cardb.domain;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface CarRepository extends CrudRepository<Car, Long>{
	List<Car> findByBrand(String brand);
    // Fetch cars by color
    List<Car> findByColor(String color);
    // Fetch cars by model year
    List<Car> findByModelYear(int modelYear);
}
