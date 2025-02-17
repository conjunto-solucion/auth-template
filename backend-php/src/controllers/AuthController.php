<?php
namespace Controllers;
use Core\Request;
use Core\Response;
use Services\AuthServiceProvider;
use Middleware\Auth;


final class AuthController {
    private Request $request;
    private AuthServiceProvider $serviceProvider;

    public function __construct(Request $request) {
        $this->serviceProvider = new AuthServiceProvider();
        $this->request = $request;
    }

    public function handleRequest(): Response {
        switch ($this->request->getMethod()) {

            case 'POST': return $this->handleLogIn();

            case 'PUT': return $this->handleVerifyToken();

            case 'DELETE': return $this->handleLogOut();
        
            default: return new Response(Response::HTTP_METHOD_NOT_ALLOWED, false, "Método no soportado");
        }
    }

    private function handleLogIn(): Response {
        
        $data = json_decode($this->request->getContent());
        $email = strtolower(trim($data->email));
        $password = trim($data->password);

        $response = $this->serviceProvider->logIn($email, $password);
        if (!$response->ok) return $response;

        $userId = $response->content["userId"];
        Auth::setUserSession($userId);
        return new Response($response->statusCode, $response->ok, $response->message);
    }


    private function handleVerifyToken(): Response {

        if (Auth::isValidToken($this->request->getRefreshToken())) {
            $userId = Auth::extractUserId($this->request->getRefreshToken());
            Auth::setUserSession($userId);

            return new Response(Response::HTTP_OK, true, "Verificado exitosamente");
        }
        return new Response(Response::HTTP_UNAUTHORIZED, false, "No pudimos verificar tu identidad, vuelva a iniciar sesión");
    }

    private function handleLogOut(): Response {
        Auth::expireUserSession();
        return new Response(Response::HTTP_OK, true, "Se ha cerrado sesión correctamente");
    }
}