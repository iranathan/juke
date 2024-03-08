<?php
require("database.php");

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$arr = [];
$songs = fetch_songs();
while($song = $songs->fetchArray(SQLITE3_ASSOC)) {
    $arr[] = $song;
}

echo json_encode($arr);