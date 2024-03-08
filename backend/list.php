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
        table, td, th {
            border: 1px solid;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }
    </style>
    <title>Song list</title>
</head>
<body>
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
                <td><img src="images/<?php echo $row["id"]; ?>.jpg" width="100" height="100"></td>
                <td><audio controls><source src="audio/<?php echo $row["id"]; ?>.mp3" type="audio/mpeg"></audio></td>
                <td><a href="delete.php/?id=<?= $row["id"]; ?>">Delete</a></td>
            </tr>
        <?php endwhile; ?>
    </table>
</body>
</html>