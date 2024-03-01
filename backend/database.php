<?php
// Database connection
$databaseFile = './songs.db';
$database = new SQLite3($databaseFile);

if (!$database) {
    die("Connection failed: " . $database->lastErrorMsg());
}

function add_song($name, $image, $music){
    global $database;
    $statement = $database->prepare("INSERT INTO songs (name) VALUES (:name)");
    $statement->bindParam(':name', $name);
    $statement->execute();

    $id = $database->lastInsertRowID();
    move_uploaded_file($music["tmp_name"], "./audio/$id.mp3");
    move_uploaded_file($image["tmp_name"], "./images/$id.jpg");
}

function fetch_songs(){
    global $database;
    $statement = $database->prepare("SELECT * FROM songs");
    $result = $statement->execute();
    return $result;
}