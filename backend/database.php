<?php
// Database connection
$databaseFile = './songs.db';
$database = new SQLite3($databaseFile);

if (!$database) {
    die("Connection failed: " . $database->lastErrorMsg());
}

function check_args($args, $target){
    foreach($args as $arg){
        $required = [];
        if(!isset($target[$arg])){
            $required[] = $arg;
        }
        return $required;
    }
}

function add_song($name, $image, $music){
    global $database;
    $statement = $database->prepare("INSERT INTO songs (name) VALUES (:name)");
    $statement->bindParam(':name', $name);
    $statement->execute();

    $id = $database->lastInsertRowID();
    move_uploaded_file($music["tmp_name"], "./uploads/$id.mp3");
    move_uploaded_file($image["tmp_name"], "./uploads/$id.jpg");
}

function fetch_songs(){
    global $database;
    $statement = $database->prepare("SELECT * FROM songs");
    $result = $statement->execute();
    return $result;
}