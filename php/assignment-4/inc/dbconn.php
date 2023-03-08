<?php
$DB_HOST = 'localhost';
$DB_USER = 'root';
$DB_PASSWORD = '2055';
$DB_DATABASE_NAME = 'library_management_system';

$connection = new mysqli($DB_HOST, $DB_USER, $DB_PASSWORD, $DB_DATABASE_NAME);
if (!$connection) {
    die("Connection failed " . mysqli_connect_error());
}
?>