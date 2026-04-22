package com.restdemo.cruddemo.service;

import com.restdemo.cruddemo.dao.AdminRepository;
import com.restdemo.cruddemo.entity.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements AdminService {

    private AdminRepository adminRepository;

    @Autowired
    public AdminServiceImpl(AdminRepository theAdminRepository) {
        this.adminRepository = theAdminRepository;
    }

    @Override
    public Admin verifyCredentials(String username, String password) {
        return adminRepository.findByUsernameAndPassword(username, password);
    }
}
