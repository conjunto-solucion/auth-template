<?php
namespace Core;

final class Request {

    private string $path;
    private string $method;
    private string $URI;
    private string $content;
    private string $accessToken;
    private string $refreshToken;




    public function __construct() {
        $this->path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $this->method = $_SERVER['REQUEST_METHOD'];
        $this->URI = $_SERVER['REQUEST_URI'];
        $this->content = file_get_contents('php://input');
        $this->accessToken = $_COOKIE['accessToken'] ?? "";
        $this->refreshToken = $_COOKIE['refreshToken'] ?? "";
    }


    public function getPath(): string {
        return $this->path;
    }
    public function getMethod(): string {
        return $this->method;
    }

    public function getURI(): string {
        return $this->URI;
    }

    public function getContent(): string {
        return $this->content;
    }

    public function getAccessToken(): string {
        return $this->accessToken;
    }

    public function getRefreshToken(): string {
        return $this->refreshToken;
    }

    public function respond(Response $response) {

        http_response_code($response->statusCode);
        echo json_encode(new ResponseBody($response->message, $response->content));
    
        exit;
    }

}