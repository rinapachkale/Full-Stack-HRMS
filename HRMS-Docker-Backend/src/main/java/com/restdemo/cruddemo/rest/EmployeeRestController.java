package com.restdemo.cruddemo.rest;

import com.restdemo.cruddemo.entity.Employee;
import com.restdemo.cruddemo.service.EmployeeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@CrossOrigin(origins = "http://localhost:3000") // Applies to all methods in this controller
@RequestMapping("/api")
public class EmployeeRestController {
    // EmployeeDAO constructor
    private EmployeeService employeeService;

    // Constructor injection
    public EmployeeRestController(EmployeeService theEmployeeService){
        this.employeeService = theEmployeeService;
    }

    // Expose "/employees" & return list of employees
    @GetMapping("/employees")
    public List<Employee> findAll(){
        return employeeService.findAll();
    }

    @GetMapping("/employees/{employeeId}")
    public Employee getEmployee(@PathVariable int employeeId){
        Employee employee = employeeService.findById(employeeId);

        if(employee == null){
            throw new RuntimeException("Employee not found - "+employeeId);
        }
        return employee;
    }

    // Expose endpoint to add new employee
    @PostMapping("/employees")
    public Employee addEmployee(@RequestBody Employee theEmployee){
        // also just in case they pass an Id in JSON... set it to 0
        // this is to force save of new item...instead of update

        theEmployee.setId(0);
        Employee dbEmployee = employeeService.save(theEmployee);
        return dbEmployee;
    }

    // Expose endpoint to update existing employing - /employees
    @PutMapping("/employees")
    public Employee updateEmployee(@RequestBody Employee theEmployee){
        Employee dbEmployee = employeeService.save(theEmployee);

        return  dbEmployee;
    }

    // expose endpoint to delete employee - /employees/{employeeId}
    @DeleteMapping("/employees/{employeeId}")
    public String deleteEmployee(@PathVariable int employeeId){
        Employee dbEmployee = employeeService.findById(employeeId);

        if(dbEmployee==null){
            throw new RuntimeException("Employee id not found - "+employeeId);
        }
        employeeService.deleteById(employeeId);
        return "Deleted employee with Id - "+employeeId;
    }

}
