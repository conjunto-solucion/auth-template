<?php
namespace Core;
use Controllers\AuthController;
use Controllers\ProfilePhotoController;
use Controllers\UserController;
use Core\Response;
use Core\Request;



final class Router {

    private Request $request;

    public function __construct(Request $request) {
        $this->request = $request;
    }


    public function dispatch(): void {
        
        switch ($this->request->getPath()) {

            case "/api/users":
                $controller = new UserController($this->request);
                $response = $controller->handleRequest();
                $this->request->respond($response);
                return;

            case "/api/profile_photos":
                $controller = new ProfilePhotoController($this->request);
                $response = $controller->handleRequest();
                $this->request->respond($response);
                return;

            case "/api/auth":
                $controller = new AuthController($this->request);
                $response = $controller->handleRequest();
                $this->request->respond($response);
                return;
    
            default:
                $response = new Response(Response::HTTP_NOT_FOUND, false, "No se encontró el servicio solicitado");
                $this->request->respond($response);
                return;
        }
    }
}