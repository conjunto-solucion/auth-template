<?php
namespace Services;
use Core\Response;
use Repositories\UserRepository;


final class AuthServiceProvider {

    public function logIn(string $email, string $password): Response {

        return UserRepository::logIn($email, $password);
    }

}