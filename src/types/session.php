<?php

use Firebase\JWT\JWT;

const ACCESS_TOKEN_EXPIRATION_TIME = 3600; // una hora.
const REFRESH_TOKEN_EXPIRATION_TIME = 604800; // una semana.


function generate_jwt(int $user_id, bool $is_refresh_token=false): string {
    return JWT::encode([
        'iss' => 'php-auth-api',
        'sub' => $_ENV['JWT_SECRET_KEY'],
        'iat' => time(),
        'exp' => time() + ($is_refresh_token? ACCESS_TOKEN_EXPIRATION_TIME : REFRESH_TOKEN_EXPIRATION_TIME)
    ], $_ENV['JWT_SECRET_KEY'], 'HS256');
}


class Session {
    public int $userId;
    public string $accessToken;
    public string $refreshToken;

    function __construct(int $user_id) {
        $this->userId = $user_id;
        $this->accessToken = generate_jwt($user_id);
        $this->refreshToken = generate_jwt($user_id, true);
    }
}