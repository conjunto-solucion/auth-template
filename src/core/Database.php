<?php
namespace Core;
use ErrorException;

final class Database {

    const FILE_UPLOAD_DIRECTORY = __DIR__."/../../uploads/";

    private static function getConnection(): \PDO {
        return new \PDO($_ENV["DB_CONNECTION_STRING"], $_ENV["DB_USER"], $_ENV["DB_PASSWORD"],
        array(\PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION));
    }

    public static function runQuery(string $sql="", $values=array()): array {
        $connection = self::getConnection();
        $query = $connection->prepare($sql);
        $query->execute($values);

        var_dump($connection);
        return $query->fetchAll(\PDO::FETCH_ASSOC);
    }
    
    public static function runNonQuery(string $sql="", $values=array()): void {
        $connection = self::getConnection();
        $query = $connection->prepare($sql);

        var_dump($connection);
        $query->execute($values);
    }

    public static function saveFile(string $filenamePrefix, $file): string {
        $uploadDir = self::FILE_UPLOAD_DIRECTORY;
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $extension = pathinfo($file["name"], PATHINFO_EXTENSION);
        $filename = $filenamePrefix."_".time().".".$extension;
        $filePath = $uploadDir . $filename;

        if (!move_uploaded_file($file["tmp_name"], $filePath)) {
            throw new ErrorException("No se pudo guardar la imagen");
        }

        return $filePath;
    }
}