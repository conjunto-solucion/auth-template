<?php
namespace Services;
use Core\Response;
use Repositories\ProfilePhotoRepository;
final class ProfilePhotoServiceProvider {

    const MAX_FILE_SIZE = 2 * 1024 * 1024;
    private $allowedTypes = ["image/jpeg", "image/png", "image/gif"];

    public function uploadProfilePhoto(int $userId): Response {
        $file = $_FILES["profilePhoto"];

        if (!in_array($file["type"], $this->allowedTypes)) {
            return new Response(Response::HTTP_BAD_REQUEST, false, "El archivo subido no tiene un formato válido");
        }

        if ($file["size"] > self::MAX_FILE_SIZE) {
            return new Response(Response::HTTP_BAD_REQUEST, false, "El archivo subido excede el límite de 2MB");
        }


        return ProfilePhotoRepository::insertProfilePhoto($userId, $file);
    }

    public function getProfilePhotoByUserId(int $userId): Response {
        return ProfilePhotoRepository::getProfilePhotoByUserId($userId);
    }
}