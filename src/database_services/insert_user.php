<?php

require_once __DIR__."/database_connection.php";
function insert_user(User $user) {
    
    $hashed_password = password_hash($user->password, PASSWORD_BCRYPT);

    $sql = "INSERT INTO user (username, email, password) VALUES (?, ?, ?)";
    run_non_query($sql, [$user->username, $user->email, $hashed_password]);
}
