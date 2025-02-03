<?php
namespace Middleware;
use Firebase\JWT\JWT;

class Session implements \JsonSerializable {
    
    private int $userId;
    private string $accessToken;
    private string $refreshToken;

    public function __construct($userId) {
        $this->userId = $userId;
        $this->accessToken = $this->generateJWT();
        $this->refreshToken = $this->generateJWT(true);
    }

    private function generateJWT(bool $isRefreshToken=false): string {
        return JWT::encode([
            "iss" => ISSUER,
            "sub" => $this->userId,
            "iat" => time(),
            "exp" => time() + ($isRefreshToken? ACCESS_TOKEN_EXPIRATION_TIME : REFRESH_TOKEN_EXPIRATION_TIME)
        ], KEY, ALGORITHM );
    }

    public function jsonSerialize(): array {
        return [
            "userId" => $this->userId,
            "accessToken" => $this->accessToken,
            "refreshToken" => $this->refreshToken
        ];
    }
}