<?php
// Database connection
$databaseFile = './songs.db';
$database = new SQLite3($databaseFile);

if (!$database) {
    die("Connection failed: " . $database->lastErrorMsg());
}

function add_song($name, $image, $music){
    global $database;
    $statement = $database->prepare("INSERT INTO songs (name, imageType, audioType) VALUES (:name, :it, :at)");
    $statement->bindParam(':name', $name);

    $extensionImage = strtolower(pathinfo($image["name"], PATHINFO_EXTENSION));
    $statement->bindParam(':it', $extensionImage);
    $extensionMusic = strtolower(pathinfo($music["name"], PATHINFO_EXTENSION));
    $statement->bindParam(':at', $extensionMusic);

    $statement->execute();

    $id = $database->lastInsertRowID();
    move_uploaded_file($music["tmp_name"], "./audio/$id.$extensionMusic");
    move_uploaded_file($image["tmp_name"], "./images/$id.$extensionImage");
}


function fetch_songs(){
    global $database;
    $statement = $database->prepare("SELECT * FROM songs");
    $result = $statement->execute();
    return $result;
}

function fetch_song($id){
    global $database;
    $statement = $database->prepare("SELECT * FROM songs WHERE id = :id");
    $statement->bindParam(':id', $id);
    $result = $statement->execute();
    return $result;
}

function delete_song($id){
    global $database;
    
    // delete the audio and image files
    $song = fetch_song($id)->fetchArray();
    unlink("./audio/" . $song["id"] . "." . $song["audioType"]);
    unlink("./images/" . $song["id"] . "." . $song["imageType"]);

    // delete the song from the database
    $statement = $database->prepare("DELETE FROM songs WHERE id = :id");
    $statement->bindParam(':id', $id);
    return $statement->execute();
}