<?php
namespace Core;

final class Response {
    public const HTTP_CONTINUE = 100;
    public const HTTP_OK = 200;
    public const HTTP_CREATED = 201;
    public const HTTP_ACCEPTED = 202;
    public const HTTP_NO_CONTENT = 204;
    public const HTTP_BAD_REQUEST = 400;
    public const HTTP_UNAUTHORIZED = 401;
    public const HTTP_FORBIDDEN = 403;
    public const HTTP_NOT_FOUND = 404;
    public const HTTP_METHOD_NOT_ALLOWED = 405;
    public const HTTP_REQUEST_TIMEOUT = 408;
    public const HTTP_INTERNAL_SERVER_ERROR = 500;
    public const HTTP_NOT_IMPLEMENTED = 501;
    public const HTTP_BAD_GATEWAY = 502;
    public const HTTP_SERVICE_UNAVAILABLE = 503;
    public const HTTP_GATEWAY_TIMEOUT = 504;

    public int $statusCode;
    public bool $ok;
    public string $message;
    public $content;
    public string $filepath;

    public function __construct(int $statusCode, bool $ok, string $message="", $content=array(), string $filepath="") {
        $this->statusCode = $statusCode;
        $this->ok = $ok;
        $this->message = $message;
        $this->content = $content;
        $this->filepath = $filepath;
    }

}