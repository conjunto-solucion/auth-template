<?php


// Constantes útiles sobre la petición.
define('REQUEST_PATH', parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
define('REQUEST_METHOD', $_SERVER['REQUEST_METHOD']);
define('REQUEST_URI', $_SERVER['REQUEST_URI']);
define('REQUEST_BODY', file_get_contents('php://input'));


// Algunos de los códigos HTTP más usados.
const HTTP_CONTINUE = 100;
const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_ACCEPTED = 202;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;
const HTTP_UNAUTHORIZED = 401;
const HTTP_FORBIDDEN = 403;
const HTTP_NOT_FOUND = 404;
const HTTP_METHOD_NOT_ALLOWED = 405;
const HTTP_REQUEST_TIMEOUT = 408;
const HTTP_INTERNAL_SERVER_ERROR = 500;
const HTTP_NOT_IMPLEMENTED = 501;
const HTTP_BAD_GATEWAY = 502;
const HTTP_SERVICE_UNAVAILABLE = 503;
const HTTP_GATEWAY_TIMEOUT = 504;



function http_exit(int $http_code, string $message=""): void {
    http_response_code($http_code);
    exit($message);
}


function http_exit_with_json(int $http_code, string $json): void {
    header("Content-Type: application/json");
    http_response_code($http_code);
    echo $json; 
    exit;
}


function http_exit_with_blob(int $http_code, string $file_path): void {
    $file_info = finfo_open(FILEINFO_MIME_TYPE);
    $mime_type = finfo_file($file_info, $file_path);
    finfo_close($file_info);

    header("Content-Type: $mime_type");
    http_response_code($http_code);
    readfile($file_path);
    exit;
}