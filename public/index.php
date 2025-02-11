<?php
require_once __DIR__."/../vendor/autoload.php";
use Dotenv\Dotenv;
use Core\Request;
use Core\Router;
use Core\Response;


/*

Este archivo es el único punto de entrada de la API.
Hacer una petición a cualquier otro archivo debería producir un error.
Configure el servidor para redirigir todas las llamadas a la API a este archivo.
Si está alojando otros archivos en el mismo servidor (por ejemplo, un sitio web),
configure el servidor para redirigir sólo las peticiones que comiencen con una palabra clave, como "/api".

*/



try {
    startApplication();
}

catch (JsonException $e) {
    $request = new Request();
    $response = new Response(Response::HTTP_INTERNAL_SERVER_ERROR, false, "Error al procesar la solicitud");
    $request->respond($response);
}
catch (PDOException $e) {
    $request = new Request();
    $response = new Response(Response::HTTP_INTERNAL_SERVER_ERROR, false, "Error insesperado en la base de datos");
    $request->respond($response);
}
catch (Exception $e) {
    $request = new Request();
    $response = new Response(Response::HTTP_INTERNAL_SERVER_ERROR, false, "Hubo un error en el servidor");
    $request->respond($response);
}


function startApplication(): void {

    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Credentials: true");

    if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
        http_response_code(200);
        exit;
    }

    (Dotenv::createImmutable(__DIR__."/.."))->load();
    $request = new Request();
    $router = new Router($request);
    $router->dispatch();
}