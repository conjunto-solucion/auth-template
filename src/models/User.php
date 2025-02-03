<?php
namespace Models;



final class User implements \JsonSerializable {
    private int $user_id;
    private string $username;
    private string $email;
    private string $password;

    public function __construct(string $username, string $email, string $password) {
        $this->username = $username;
        $this->email = $email;
        $this->password = $password;
    }

    public function getUsername(): string {
        return $this->username;
    }

    public function getEmail(): string {
        return $this->email;
    }

    public function getPassword(): string {
        return $this->password;
    }

    public function jsonSerialize(): array {
        return [
            'username' => $this->username,
            'email' => $this->email
        ];
    }
}