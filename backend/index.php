<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet">
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
    <title>Upload Music Form</title>
</head>
<body>
    <div class="divwow">
        <h2 class="words">Upload Music</h2>
        <form action="upload.php" method="post" enctype="multipart/form-data">
            <label class="words" for="title">Title:</label><br>
            <input class="words" type="text" id="title" name="title" required><br><br>

            <label class="words" for="image">Select Image:</label><br>
            <input class="words" type="file" id="image" name="image" required><br><br>
            
            <label class="words" for="music">Select Music:</label><br>
            <input class="words" type="file" id="music" name="music" required><br><br>

            <label class="words" for="password">Password:</label><br>
            <input class="words" type="password" id="password" name="password" required><br><br>
            
            <input class="words" type="submit" value="Upload" name="submit">

            <?php if(ISSET($errors)): ?>
                <?php foreach($errors as $error): ?>
                    <p class="words red"><?php echo $error; ?></p>
                <?php endforeach; ?>
            <?php endif; ?>
        </form>
    </div>
</body>
</html>