<?php
    require_once("database.php");

    if($_SERVER["REQUEST_METHOD"] == "GET" ) {
        $id = isset($_GET["id"]) ? $_GET["id"] : null;
        if($id === null) header("Location: /juke/list.php");
        $song = fetch_song($id);
        if($song === false) header("Location: /juke/list.php");
        $song = $song->fetchArray();
    }

    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $id = isset($_POST["id"]) ? $_POST["id"] : null;
        $password = isset($_POST["password"]) ? $_POST["password"] : null;
        if($id === null || $password === null){
            header("Location: /juke/list.php");
        }
        if($password === "test123"){
            delete_song($id);
            header("Location: /juke/list.php");
        } else{
            die("<h2>Password is incorrect</h2>");
        }
    }
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="images/icon.png">
    <style>
        .words {
            font-family: "Inter", sans-serif;
            font-optical-sizing: auto;
            font-weight: 400;
            font-style: normal;
            font-variation-settings:
            "slnt" 0;
            padding: 1%;
        }
        

        body{
            background-color: rgb(220, 220, 220);
        }
        .divwow{
            text-align: center;
            background-color: white;
            border-radius: 10px;
            width: 40vw;
            margin-left: 25%;
            min-height: 400px;
            padding: 5%;
            margin-top: 5%;
            box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
        }

        h2{
            font-size: xx-large;
        }
        .red {
            color: red;
        }
    </style>
    <title>Document</title>
</head>
<body>
    <form class="divwow" method="post">
        <h1>Delete Song <?= $song["name"] ?>?</h1>
        <input class="words" type="hidden" name="id" value="<?= $id ?>">
        <label class="words" for="password">Password:</label>
        <input class="words" type="password" id="password" name="password">
        <input class="words" type="submit" value="Delete">
    </form>
</body>
</html>