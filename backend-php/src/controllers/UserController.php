<?php
namespace Controllers;
use Core\Request;
use Core\Response;
use Middleware\Auth;
use Models\User;
use Services\UserServiceProvider;


final class UserController {
    private Request $request;
    private UserServiceProvider $serviceProvider;

    public function __construct(Request $request) {
        $this->request = $request;
        $this->serviceProvider = new UserServiceProvider();
    }

    public function handleRequest(): Response {
        switch ($this->request->getMethod()) {

            case 'POST': return $this->handleCreateUserAccount();

            case 'GET': return $this->handleGetUser();
        
            default: return new Response(Response::HTTP_METHOD_NOT_ALLOWED, false, "Método no soportado");
        }
    }

    private function handleCreateUserAccount(): Response {
        
        $data = json_decode($this->request->getContent());
        $user = new User($data->username, $data->email, $data->password);
        $response = $this->serviceProvider->createUserAccount($user);
        if (!$response->ok) return $response;

        $userId = $response->content["userId"];
        Auth::setUserSession($userId);
        return new Response($response->statusCode, $response->ok, $response->message);
    }

    private function handleGetUser(): Response {

        if (!Auth::isValidToken($this->request->getAccessToken())) {
            return new Response(Response::HTTP_UNAUTHORIZED, false, "No tienes permiso para realizar esta operación");
        }

        $userId = Auth::extractUserId($this->request->getAccessToken());
        return $this->serviceProvider->getUserById($userId);
    }
}