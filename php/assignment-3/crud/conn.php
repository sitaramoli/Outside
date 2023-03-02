<?php
$conn = new mysqli('localhost', 'root', '2055', 'library_management_system');

if (!$conn) {
    die(mysqli_errno($conn));
}
