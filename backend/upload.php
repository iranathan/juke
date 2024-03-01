<?php
require("database.php");

// Function to check if required arguments are supplied
function checkRequiredArguments($arguments) {
    $missingArguments = [];
    foreach ($arguments as $argument) {
        if (!isset($_POST[$argument])) {
            $missingArguments[] = $argument;
        }
    }
    return $missingArguments;
}

// Function to check if required files are supplied
function checkRequiredFiles($files) {
    $missingFiles = [];
    foreach ($files as $file) {
        if (!isset($_FILES[$file])) {
            $missingFiles[] = $file;
        }
    }
    return $missingFiles;
}

// Function to validate password
function validatePassword($password) {
    return $password === "test123";
}

// Function to validate file size
function validateFileSize($file, $maxSize) {
    return $file["size"] <= $maxSize;
}

// Function to validate file extension
function validateFileExtension($file, $allowedExtensions) {
    $extension = strtolower(pathinfo($file["name"], PATHINFO_EXTENSION));
    return in_array($extension, $allowedExtensions);
}

// Function to redirect with errors
function redirectWithErrors($errors) {
    if (!empty($errors)) {
        require("index.php");
        die();
    }
}

// Main logic
$errors = [];

// Check required arguments
$requiredArgs = checkRequiredArguments(["title", "password"]);
if (!empty($requiredArgs)) {
    $errors[] = "The following arguments were not supplied: " . implode(", ", $requiredArgs);
}

// Check required files
$requiredFiles = checkRequiredFiles(["image", "music"]);
if (!empty($requiredFiles)) {
    $errors[] = "The following files were not supplied: " . implode(", ", $requiredFiles);
}
redirectWithErrors($errors);

// Validate password
if (!validatePassword($_POST["password"])) {
    $errors[] = "The password is incorrect";
}

// Validate image file
if (!validateFileSize($_FILES["image"], 10000000) || !validateFileExtension($_FILES["image"], ["jpg", "jpeg"])) {
    $errors[] = "The image file must be in JPG or JPEG format and should not exceed 10MB";
}

// Validate music file
if (!validateFileSize($_FILES["music"], 10000000) || !validateFileExtension($_FILES["music"], ["mp3"])) {
    $errors[] = "The music file must be in MP3 format and should not exceed 10MB";
}

// Redirect with errors if any
redirectWithErrors($errors);

// Add the song to the database and redirect to the list page
add_song($_POST["title"], $_FILES["image"], $_FILES["music"]);
header("Location: list.php");