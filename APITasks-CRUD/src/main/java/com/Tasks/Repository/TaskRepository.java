package com.Tasks.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Tasks.Model.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

}