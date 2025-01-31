<?php


class User {
    public int $user_id;
    public string $username;
    public string $email;
    public string $password;

    public function __construct(string $username, string $email, string $password) {
        $this->username = $username;
        $this->email = $email;
        $this->password = $password;
    }
}


function validate_user(User $user) {
    if (strlen($user->username) < 1 || strlen($user->username) > 100)
        http_exit(HTTP_BAD_REQUEST, "El nombre de usuario debe tener entre 1 y 100 caracteres.");
    
    if (!filter_var($user->email, FILTER_VALIDATE_EMAIL))
        http_exit(HTTP_BAD_REQUEST, "El correo electrónico no tiene un formato válido.");

    if (strlen($user->email) < 1 || strlen($user->email) > 100)
        http_exit(HTTP_BAD_REQUEST, "El correo electrónico debe tener entre 1 y 100 caracteres.");

    if (strlen($user->password) < 5 || strlen($user->password) > 255)
        http_exit(HTTP_BAD_REQUEST, "La contraseña debe tener entre 5 y 255 caracteres.");
}