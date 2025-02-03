<?php
namespace Repositories;
use Core\Database;
use Core\Response;
use Models\User;


final class UserRepository {

    private static function userEmailAlreadyExists(string $email): bool {
        $sql = "select COUNT(*) from user where email = ?";
        return Database::runQuery($sql, [$email])[0]["COUNT(*)"] > 0;
    }
    
    public static function insertUser(User $user): Response {
        
        if (self::userEmailAlreadyExists($user->getEmail())) {
            return new Response(Response::HTTP_BAD_REQUEST, false, "El correo electrónico ya está en uso");
        }
    
        $hashed_password = password_hash($user->getPassword(), PASSWORD_BCRYPT);
        $sql = "insert into user (username, email, password) values (?, ?, ?)";
        Database::runNonQuery($sql, [$user->getUsername(), $user->getEmail(), $hashed_password]);

        $sql = "select user_id from user where email = ?";
        $createdUser = Database::runQuery($sql, [$user->getEmail()])[0];
        $responseJson = json_encode(["userId" => $createdUser["user_id"]]);
        return new Response(Response::HTTP_CREATED, true, "La cuenta se creó exitosamente", $responseJson);
    }

    public static function logIn($email, $password): Response {

        $sql = "select user_id, password from user where email = ?";
        $user = Database::runQuery($sql, [$email])[0];
        
        if (!$user || !password_verify($password, $user["password"])) {
            return new Response(Response::HTTP_BAD_REQUEST, false, "Correo o contraseña incorrecta");
        }
        
        $logInSuccessResponseContent = json_encode(["userId" => $user["user_id"]]);
        return new Response(Response::HTTP_OK, true, "Se inició sesión correctamente", $logInSuccessResponseContent);
    }

    public static function getUserById(int $id): Response {
        $sql = "select username, email from user where user_id = ?";
        $user = Database::runQuery($sql, [$id])[0];

        if (!$user || empty($user["username"])) {
            return new Response(Response::HTTP_BAD_REQUEST, false, "No existe la cuenta solicitada");
        }

        $userDataJson = json_encode(["username"=>$user["username"], "email"=>$user["email"]]);
        return new Response(Response::HTTP_OK, true, "Se inició sesión correctamente", $userDataJson);
    }
}