<?php
namespace Controllers;
use Core\Request;
use Core\Response;
use Middleware\Auth;
use Services\ProfilePhotoServiceProvider;


final class ProfilePhotoController {
    private Request $request;
    private ProfilePhotoServiceProvider $serviceProvider;

    public function __construct(Request $request) {
        $this->request = $request;
        $this->serviceProvider = new ProfilePhotoServiceProvider();
    }

    public function handleRequest(): Response {
        switch ($this->request->getMethod()) {

            case 'POST': return $this->handleUploadProfilePhoto();

            case 'GET': return $this->handleGetProfilePhoto();
        
            default: return new Response(Response::HTTP_METHOD_NOT_ALLOWED, false, "Método no soportado");
        }
    }

    private function handleUploadProfilePhoto(): Response {
        
        if (!Auth::isValidToken($this->request->getAccessToken())) {
            return new Response(Response::HTTP_UNAUTHORIZED, false, "No tienes permiso para realizar esta operación");
        }

        $userId = Auth::extractUserId($this->request->getAccessToken());
        return $this->serviceProvider->uploadProfilePhoto($userId);
    }

    private function handleGetProfilePhoto(): Response {
        if (!Auth::isValidToken($this->request->getAccessToken())) {
            return new Response(Response::HTTP_UNAUTHORIZED, false, "No tienes permiso para realizar esta operación");
        }

        $userId = Auth::extractUserId($this->request->getAccessToken());
        return $this->serviceProvider->getProfilePhotoByUserId($userId);
    }

}