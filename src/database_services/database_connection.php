<?php


function get_database_connection(): PDO {
    return new PDO($_ENV["DB_CONNECTION_STRING"], $_ENV["DB_USER"], $_ENV["DB_PASSWORD"],
    array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
}


function run_query(string $sql="", $values=array()): array {
    $connection = get_database_connection();
    $query = $connection->prepare($sql);
    $query->execute($values);
    return $query->fetchAll(PDO::FETCH_ASSOC);
}

function run_non_query(string $sql="", $values=array()): void {
    $connection = get_database_connection();
    $query = $connection->prepare($sql);
    $query->execute($values);
}