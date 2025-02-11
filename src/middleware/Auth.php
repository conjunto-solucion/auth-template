<?php
namespace Middleware;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

define("ACCESS_TOKEN_EXPIRATION_TIME", time() + 3600); // una hora.
define("REFRESH_TOKEN_EXPIRATION_TIME", time() + 604800); // una semana.
const ALGORITHM = 'HS256';
const ISSUER = 'php-auth-api';
define("KEY", $_ENV['JWT_SECRET_KEY']);

final class Auth {


    public static function setUserSession(int $userId): void {
        $session = new Session($userId);

        setcookie("accessToken", $session->getAccessToken(), ACCESS_TOKEN_EXPIRATION_TIME, "/", "localhost", false, true);
        setcookie("refreshToken", $session->getRefreshToken(), REFRESH_TOKEN_EXPIRATION_TIME, "/", "localhost", false, true);
    }

    public static function expireUserSession(): void {
        setcookie("accessToken", "", time() - 3600, "/", "localhost", false, true);
        setcookie("refreshToken", "", time() - 3600, "/", "localhost", false, true);
    }


    public static function isValidToken(string $jwt): bool {
        if (!$jwt)
        return false;
        
        $decoded = JWT::decode($jwt, new Key(KEY, ALGORITHM));
        return ($decoded->iss == ISSUER && $decoded->iat <= time() && $decoded->exp >= time());
    }

    public static function extractUserId(string $jwt): int {
        if (!$jwt)
        return 0;
        
        $decoded = JWT::decode($jwt, new Key(KEY, ALGORITHM));
        return intval($decoded->sub);
    }
}