package com.server.rest_server.helper;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class SecurityHelperTest {

    @Test
    void checkPasswordStrength() {
        SecurityHelper helper = new SecurityHelper();

        String passw = "se22";
        int res = helper.checkPasswordStrength(passw);
        assertEquals(0, res);

        String passw2 = "se22_343s";
        int res2 = helper.checkPasswordStrength(passw2);
        assertEquals(1, res2);

        String passw3 = "Se22_343A_s";
        int res3 = helper.checkPasswordStrength(passw3);
        assertEquals(2, res3);
    }
}