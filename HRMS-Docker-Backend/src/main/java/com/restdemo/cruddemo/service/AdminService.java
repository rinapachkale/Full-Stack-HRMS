package com.restdemo.cruddemo.service;

import com.restdemo.cruddemo.entity.Admin;

public interface AdminService {
    Admin verifyCredentials(String username, String password);
}
