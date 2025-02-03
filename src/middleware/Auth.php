<?php
namespace Middleware;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

const ACCESS_TOKEN_EXPIRATION_TIME = 3600; // una hora.
const REFRESH_TOKEN_EXPIRATION_TIME = 604800; // una semana.
const ALGORITHM = 'HS256';
const ISSUER = 'php-auth-api';
define("KEY", $_ENV['JWT_SECRET_KEY']);

final class Auth {


    public static function createUserSessionJson(int $userId): string {
        return json_encode(new Session($userId));
    }


    public static function isValidToken(string $jwt): bool {
        if (!$jwt)
        return false;
        
        $decoded = JWT::decode($jwt, new Key(KEY, ALGORITHM));
        return ($decoded->iss == ISSUER && $decoded->iat < time() && $decoded->exp > time());
    }

    public static function extractUserId(string $jwt): int {
        if (!$jwt)
        return 0;
        
        $decoded = JWT::decode($jwt, new Key(KEY, ALGORITHM));
        return intval($decoded->sub);
    }
}