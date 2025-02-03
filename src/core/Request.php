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
        $this->accessToken = $_COOKIE['access_token'] ?? "";
        $this->refreshToken = $_COOKIE['refresh_token'] ?? "";
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

        if (!empty($response->filepath)) {
            $file_info = finfo_open(FILEINFO_MIME_TYPE);
            $mime_type = finfo_file($file_info, $response->filepath);
            finfo_close($file_info);
    
            header("Content-Type: $mime_type");
            readfile($response->filepath);

            exit;
        }

        header("Content-Type: application/json");
        echo json_encode([
            "message" => $response->message,
            "content" => $response->jsonContent
        ]);
    
        exit;
    }

}