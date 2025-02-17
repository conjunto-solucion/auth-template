<?php
namespace Repositories;
use Core\Database;
use Core\Response;


final class ProfilePhotoRepository {
    
    public static function insertProfilePhoto(int $userId, $file): Response {
        
        $filename = Database::saveFile($userId, $file);

        $sql = "update user set profile_photo = ? where user_id = ?";
        Database::runNonQuery($sql, [$filename, $userId]);

        $result = ["profilePhotoURL" => $_ENV["FILE_SERVER_URI"].$filename];
        return new Response(Response::HTTP_OK, true, "Se ha actualizado la imagen de perfil", $result);
    }

    public static function getProfilePhotoByUserId(int $userId): Response {
        $sql = "select profile_photo from user where user_id = ?";
        $filename = Database::runQuery($sql, [$userId])[0]["profile_photo"] ?? "";
        $result = ["profilePhotoURL" => $_ENV["FILE_SERVER_URI"].$filename];

        return new Response(Response::HTTP_OK, true, "URL de foto de perfil recuperada exitosamente", $result);
    }
}