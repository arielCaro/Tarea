package com.Tasks;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EntityScan(basePackages = {"com.Tasks.Model"}) 
@EnableConfigurationProperties
public class TasksCrudApplication {

	public static void main(String[] args) {
		SpringApplication.run(TasksCrudApplication.class, args);
	}
	
	

}
