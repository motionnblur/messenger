package com.server.rest_server.helper;

import com.server.rest_server.dto.UserEntityDto;
import org.springframework.stereotype.Service;

@Service
public class SecurityHelper {
    public void securityCheckSign(UserEntityDto userEntityDto) throws Exception {
        String userName = userEntityDto.getName();
        String userPass = userEntityDto.getPassword();

        if(userName.isEmpty() || userPass.isEmpty())
            throw new Exception("User name or password is empty");
        if(userName.length() < 2)
            throw new Exception("User name can not be less than 2");
        else if(userName.length() > 10)
            throw new Exception("User name can not be more than 10");
        if(userPass.length() < 5)
            throw new Exception("Password length can not be less than 5");
        else if(userPass.length() > 50)
            throw new Exception("Password length can not be more than 50");

        if(!isValidString(userEntityDto.getName()))
            throw new Exception("User name should include only character or number");

        int securityResult = checkPasswordStrength(userPass);
        if (securityResult == 0)
            throw new Exception("Your password is weak");
    }
    public void securityCheckLogin(UserEntityDto userEntityDto) throws Exception {
        String userName = userEntityDto.getName();
        String userPass = userEntityDto.getPassword();

        if(userName.isEmpty() || userPass.isEmpty())
            throw new Exception("User name or password is empty");
        if(userName.length() < 2)
            throw new Exception("Name length can not be less than 2");
        if(userPass.length() < 5)
            throw new Exception("Password length can not be less than 5");
    }
    public int checkPasswordStrength(String password) {
        int length = password.length();
        boolean hasLower = false, hasUpper = false, hasDigit = false, hasSpecial = false;

        for (char ch : password.toCharArray()) {
            if (Character.isLowerCase(ch)) hasLower = true;
            else if (Character.isUpperCase(ch)) hasUpper = true;
            else if (Character.isDigit(ch)) hasDigit = true;
            else hasSpecial = true;
        }

        if (length >= 8 && hasLower && hasUpper && hasDigit && hasSpecial) {
            return 2;
        } else if (length >= 6 && (hasLower || hasUpper) && hasDigit) {
            return 1;
        } else {
            return 0;
        }
    }

    public static boolean isValidString(String input) {
        for (int i = 0; i < input.length(); i++) {
            char c = input.charAt(i);
            if (!Character.isLetterOrDigit(c)) {
                return false;
            }
        }
        return true;
    }
}