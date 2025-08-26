package com.project.Registration.Service;

import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.project.Registration.entity.User;
import com.project.Registration.Repository.UserRepository;

@Service
public class UserService implements UserServiceInterface {

	@Autowired
    private UserRepository userRepository;

    @Override
    public String RegisterUser(User obj) {
    	
    	  try {
			if (userRepository.findByEmail(obj.getEmail())!=null) {
			      return "Email already registered!";
			  }
		} catch (Exception e) {
			
			e.printStackTrace();
		}
    	  
    	String hashedPassword = BCrypt.hashpw(obj.getPassword(), BCrypt.gensalt());
        obj.setPassword(hashedPassword);
    	 userRepository.save(obj);

         return "Registration successful!";
    	
//    	import org.mindrot.jbcrypt.BCrypt;
//    	String hashed = BCrypt.hashpw("password", BCrypt.gensalt());
//    	boolean matches = BCrypt.checkpw("password", hashed);
	
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return Optional.of(userRepository.findByEmail(email));
    }
}
