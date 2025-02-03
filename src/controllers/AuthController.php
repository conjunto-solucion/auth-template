<?php
namespace Controllers;
use Core\Request;
use Core\Response;
use Middleware\Auth;


final class AuthController {
    private Request $request;

    public function __construct(Request $request) {
        $this->request = $request;
    }

    public function handleRequest(): Response {
        switch ($this->request->getMethod()) {

            case 'GET': return $this->handleVerifyToken();
        
            default: return new Response(Response::HTTP_METHOD_NOT_ALLOWED, false, "Método no soportado");
        }
    }

    private function handleVerifyToken(): Response {

        if (Auth::isValidToken($this->request->getRefreshToken())) {
            $userId = Auth::extractUserId($this->request->getRefreshToken());
            $session = Auth::createUserSession($userId);
            return new Response(Response::HTTP_OK, true, "Verificado exitosamente", $session);
        }
        return new Response(Response::HTTP_UNAUTHORIZED, false, "No pudimos verificar tu identidad, vuelva a iniciar sesión");
    }
}