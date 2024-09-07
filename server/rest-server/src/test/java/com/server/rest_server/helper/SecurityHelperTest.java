package com.server.rest_server.helper;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class SecurityHelperTest {

    @Test
    void checkPasswordStrength() {
        SecurityHelper helper = new SecurityHelper();

        String passw = "se22";
        String res = helper.checkPasswordStrength(passw);
        assertEquals("not-good", res);

        String passw2 = "se22_343s";
        String res2 = helper.checkPasswordStrength(passw2);
        assertEquals("normal", res2);

        String passw3 = "Se22_343A_s";
        String res3 = helper.checkPasswordStrength(passw3);
        assertEquals("perfect", res3);
    }
}