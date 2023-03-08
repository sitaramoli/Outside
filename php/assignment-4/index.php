<?php
include("StudentController.php");
include("./inc/dbconn.php");

header('Content-type: application/json');


$studentController = new StudentController($connection);
echo $studentController->processRequest();
?>