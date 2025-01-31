<?php

require_once "vendor/autoload.php";
require_once __DIR__."/http_utils.php";

use Dotenv\Dotenv;
(Dotenv::createImmutable(__DIR__."/.."))->load();


switch (REQUEST_PATH) {

    case '/users':
        echo require_once __DIR__."/request_handlers/users_handler.php";
        break;


    default:
        http_exit(HTTP_NOT_FOUND);
}
