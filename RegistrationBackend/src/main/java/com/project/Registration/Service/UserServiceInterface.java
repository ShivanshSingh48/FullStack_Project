package com.project.Registration.Service;

import java.util.Optional;
import com.project.Registration.entity.User;

public interface UserServiceInterface {
   String RegisterUser(User obj);
    Optional<User> findByEmail(String email); // new method
}
