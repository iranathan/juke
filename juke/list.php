<?php
require_once("database.php");
$result = fetch_songs();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f0f0f0;
        }

        h1 {
            text-align: center;
            margin-top: 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        th {
            background-color: #f2f2f2;
            font-weight: bold;
        }

        img {
            display: block;
            margin: auto;
            max-width: 100px;
            max-height: 100px;
        }

        audio {
            display: block;
            margin: auto;
        }

        td:last-child {
            text-align: center;
        }

        a {
            text-decoration: none;
            color: #007bff;
        }

        a:hover {
            text-decoration: underline;
        }

        .container {
            max-width: 800px;
            margin: auto;
            padding: 20px;
        }

        .btn-upload {
            display: block;
            text-align: center;
            margin-top: 20px;
            text-decoration: none;
            background-color: #007bff;
            color: #fff;
            padding: 10px 20px;
            border-radius: 5px;
        }

        .btn-upload:hover {
            background-color: #0056b3;
        }
    </style>
    <title>Song list</title>
</head>
<body>
    <div class="container">
        <h1>Songs</h1>
        <table>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Image</th>
                <th>Music</th>
                <th>Delete</th>
            </tr>
            <?php while($row = $result->fetchArray()): ?>
                <tr>
                    <td><?php echo $row["id"]; ?></td>
                    <td><?php echo $row["name"]; ?></td>
                    <td><img src="images/<?= $row["id"]; ?>.<?= $row["imageType"] ?>" alt="Image not available"></td>
                    <td><audio controls><source src="audio/<?= $row["id"]; ?>.mp3" type="audio/mpeg"></audio></td>
                    <td><a href="delete.php/?id=<?= $row["id"]; ?>">Delete</a></td>
                </tr>
            <?php endwhile; ?>
        </table>
        <a href="index.php" class="btn-upload">Upload</a>
    </div>
</body>
</html>
