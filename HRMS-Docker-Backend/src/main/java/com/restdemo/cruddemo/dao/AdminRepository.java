package com.restdemo.cruddemo.dao;

import com.restdemo.cruddemo.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
    // Business logic as this function is apart from CRUD functionalities
    Admin findByUsernameAndPassword(String username, String password);
}
