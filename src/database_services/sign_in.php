<?php

require_once "vendor/autoload.php";
require_once __DIR__."/../types/session.php";


function sign_in(string $email, string $password): ?Session {
    
    $sql = "SELECT user_id, password FROM user WHERE email = :e";
    $user = run_query($sql, ['e' => $email])[0];
    
    if (!$user || !password_verify($password, $user["password"])) {
        return null;
    }
    
    return new Session($user["user_id"]);
}
