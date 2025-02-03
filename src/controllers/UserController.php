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

            case 'PUT': return $this->handleLogIn();

            case 'GET': return $this->handleGetUser();

            case 'HEAD': return $this->handleVerifyToken();
        
            default: return new Response(Response::HTTP_METHOD_NOT_ALLOWED, false, "Método no soportado");
        }
    }

    private function handleCreateUserAccount(): Response {
        
        $data = json_decode($this->request->getContent());
        $user = new User($data->username, $data->email, $data->password);
        $response = $this->serviceProvider->createUserAccount($user);
        if (!$response->ok) return $response;

        $userId = json_decode($response->jsonContent)->userId;
        $session = Auth::createUserSessionJson($userId);
        return new Response($response->statusCode, $response->ok, $response->message, $session);
    }

    private function handleLogIn(): Response {
        
        $data = json_decode($this->request->getContent());
        $email = $data->email;
        $password = $data->password;

        $response = $this->serviceProvider->logIn($email, $password);
        if (!$response->ok) return $response;

        $userId = json_decode($response->jsonContent)->userId;
        $session = Auth::createUserSessionJson($userId);
        return new Response($response->statusCode, $response->ok, $response->message, $session);
    }

    private function handleGetUser(): Response {

        if (!Auth::isValidToken($this->request->getAccessToken())) {
            return new Response(Response::HTTP_UNAUTHORIZED, false, "No tienes permiso para realizar esta operación");
        }

        $userId = Auth::extractUserId($this->request->getAccessToken());
        return $this->serviceProvider->getUserById($userId);
    }


    private function handleVerifyToken(): Response {

        if (Auth::isValidToken($this->request->getRefreshToken())) {
            $userId = Auth::extractUserId($this->request->getRefreshToken());
            $session = Auth::createUserSessionJson($userId);
            return new Response(Response::HTTP_OK, true, "Verificado exitosamente", $session);
        }
        return new Response(Response::HTTP_UNAUTHORIZED, false, "No pudimos verificar tu identidad, vuelva a iniciar sesión");
    }
}