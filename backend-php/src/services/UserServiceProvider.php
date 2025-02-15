<?php
namespace Services;
use Core\Response;
use Models\User;
use Repositories\UserRepository;


final class UserServiceProvider {

    public function createUserAccount(User $user): Response {
        
        if (strlen($user->getUsername()) < 1 || strlen($user->getUsername()) > 100)
            return new Response(Response::HTTP_BAD_REQUEST, false, "El nombre de usuario debe tener entre 1 y 100 caracteres");

        if (strlen($user->getEmail()) < 1 || strlen($user->getEmail()) > 100)
            return new Response(Response::HTTP_BAD_REQUEST, false, "El correo electrónico debe tener entre 1 y 100 caracteres");
        
        if (!filter_var($user->getEmail(), FILTER_VALIDATE_EMAIL))
            return new Response(Response::HTTP_BAD_REQUEST, false, "El correo electrónico no tiene un formato válido");
    
        if (strlen($user->getPassword()) < 5 || strlen($user->getPassword()) > 255)
            return new Response(Response::HTTP_BAD_REQUEST, false, "La contraseña debe tener entre 5 y 255 caracteres");
        

        return UserRepository::insertUser($user);
    }

    public function logIn(string $email, string $password): Response {

        return UserRepository::logIn($email, $password);
    }

    public function getUserById(int $userId): Response {
        return UserRepository::getUserById($userId);
    }

}