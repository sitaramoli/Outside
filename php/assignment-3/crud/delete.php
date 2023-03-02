<?php
include("conn.php");
if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $sql = "delete from students where id= $id";
    $result = mysqli_query($conn, $sql);
    if ($result) {
        header('location:home.php');
    } else {
        echo "failed to delete";
    }
}
?>