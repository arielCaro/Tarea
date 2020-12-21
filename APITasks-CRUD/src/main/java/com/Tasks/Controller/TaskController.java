package com.Tasks.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Tasks.Exception.ResourceNotFoundException;
import com.Tasks.Model.Task;
import com.Tasks.Repository.TaskRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(value = "tasks microservice", description = "Esta API tiene un CRUD para las tareas.")
@RequestMapping("/api/v1/")
public class TaskController {

	@Autowired
	private TaskRepository taskRepository;
	
	@GetMapping("/tasks/GetAllTask")
	@ApiOperation(value = "Obtiene una lista de tareas.", notes = "Retorna una lista de objetos tarea." )
	public List<Task> GetAllTask(){
		return this.taskRepository.findAll();
	}

	@GetMapping("/tasks/GetTaskById/{id}")
	@ApiOperation(value = "Obtiene una tarea.", notes = "Retorna un objeto tarea." )
	public ResponseEntity<Task> GetTaskById(@PathVariable(value="Id") Long id)
	throws ResourceNotFoundException{
		Task task = taskRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No existe tarea para ese Identificador: " + id));
		return ResponseEntity.ok().body(task);
		
	}
	
	@PostMapping("/tasks/CreateTask")
	@ApiOperation(value = "Crea una tarea.", notes = "Retorna entidad Tarea." )
	public Task CreateTask(@RequestBody Task task) {
		return this.taskRepository.save(task);
		
	}
	
	//
	@PutMapping("/tasks/UpdateTask/{id}")
	@ApiOperation(value = "Actualiza una tarea.", notes = "Retorna entidad Tarea." )
	public ResponseEntity<Task> UpdateTask(@PathVariable(value="Id") Long id, 
			@Value(value = "error") @RequestBody Task taskModificated) throws ResourceNotFoundException {
		Task task = taskRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No existe tarea para ese Identificador: " + id));
		task.setDescription(taskModificated.getDescription());
		task.setIsValidity(taskModificated.getIsValidity());
		return ResponseEntity.ok(this.taskRepository.save(task));
	}
	
	
	@DeleteMapping("/tasks/DeleteTask/{id}")
	@ApiOperation(value = "Elimina una tarea.", notes = "Retorna entidad Tarea." )
	public Map<String, Boolean> DeleteTask(@PathVariable(value="Id") Long id) throws ResourceNotFoundException{
		Task task = taskRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No existe tarea para ese Identificador: " + id));
		this.taskRepository.delete(task);
		Map<String, Boolean> response = new HashMap<String, Boolean>();
		response.put("deleted", Boolean.TRUE);
		return response;
		
	}
}
