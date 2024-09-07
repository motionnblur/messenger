package com.server.rest_server.helper;

import com.server.rest_server.dto.UserEntityDto;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
public class SecurityHelper {
    public void securityCheck(UserEntityDto userEntityDto) throws Exception {
        if(userEntityDto.getName().isEmpty() || userEntityDto.getPassword().isEmpty())
            throw new Exception("Security error");

        int nameSize = userEntityDto.getName().length();
        int passwordSize = userEntityDto.getPassword().length();

        if(nameSize > 20 || passwordSize > 25)
            throw new Exception("Security error");
    }
    public String checkPasswordStrength(String password) {
        int length = password.length();
        boolean hasLower = false, hasUpper = false, hasDigit = false, hasSpecial = false;

        for (char ch : password.toCharArray()) {
            if (Character.isLowerCase(ch)) hasLower = true;
            else if (Character.isUpperCase(ch)) hasUpper = true;
            else if (Character.isDigit(ch)) hasDigit = true;
            else hasSpecial = true;
        }

        if (length >= 8 && hasLower && hasUpper && hasDigit && hasSpecial) {
            return "perfect";
        } else if (length >= 6 && (hasLower || hasUpper) && hasDigit) {
            return "normal";
        } else {
            return "not-good";
        }
    }
}
