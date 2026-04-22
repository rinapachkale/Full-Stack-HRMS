package com.restdemo.cruddemo.dao;

import com.restdemo.cruddemo.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

// <Entity-type , Primary-key>
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    // That's it.. no need to write an extra code

}
