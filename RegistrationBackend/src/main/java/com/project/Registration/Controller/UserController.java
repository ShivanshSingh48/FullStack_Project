package com.project.Registration.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.Registration.Service.UserServiceInterface;
import com.project.Registration.entity.User;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserServiceInterface userService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        System.out.println(user.toString());

        String result = userService.RegisterUser(user);

        if (result.equals("Registration successful!")) {
            return ResponseEntity.ok(result); // 200 OK
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(result); // 409 Conflict
        }
    }
}
