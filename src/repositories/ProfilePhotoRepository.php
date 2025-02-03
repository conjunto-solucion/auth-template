<?php
namespace Repositories;
use Core\Database;
use Core\Response;


final class ProfilePhotoRepository {
    
    public static function insertProfilePhoto(int $userId, $file): Response {
        
        $filePath = Database::saveFile($userId, $file);

        $sql = "update user set profile_photo = ? where user_id = ?";
        Database::runNonQuery($sql, [$filePath, $userId]);

        return new Response(Response::HTTP_OK, true, "Se ha actualizado la imagen de perfil");
    }

    public static function getProfilePhotoByUserId(int $userId): Response {
        $sql = "select profile_photo from user where user_id = ?";
        $filepath = Database::runQuery($sql, [$userId])[0]["profile_photo"] ?? "";

        return new Response(Response::HTTP_OK, true, "", [], $filepath);
    }
}