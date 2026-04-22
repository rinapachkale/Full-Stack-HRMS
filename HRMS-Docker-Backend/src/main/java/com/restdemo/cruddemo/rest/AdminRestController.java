package com.restdemo.cruddemo.rest;

import com.restdemo.cruddemo.entity.Admin;
import com.restdemo.cruddemo.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Applies to all methods in this controller
@RequestMapping("/api/admin")
public class AdminRestController {

    private AdminService adminService;

    @Autowired
    public AdminRestController(AdminService theAdminService) {
        this.adminService = theAdminService;
    }

    @PostMapping("/login")
    public String loginAdmin(@RequestBody Admin admin) {
        Admin verifiedAdmin = adminService.verifyCredentials(admin.getUsername(), admin.getPassword());

        if (verifiedAdmin != null) {
            return "Login successful!";
        } else {
            throw new RuntimeException("Invalid username or password");
        }
    }
}
