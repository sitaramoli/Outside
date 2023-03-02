<?php
include("conn.php");
if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $id = $_POST['id'];
    $password = $_POST['password'];
    $sql = "update students set name = '$name' password = '$password' where email = '$email' ";
    $result = mysqli_query($conn, $sql);
    header('location:home.php');
}
$edit_id = $_GET['id'];
$query = "select * from students where id = $edit_id";
$result = mysqli_query($conn, $query);
$row = mysqli_fetch_assoc($result);
echo $row['id'];

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles/style.css">
    <title>Edit</title>
</head>

<body>
    <main class="edit">
        <form method="post" class="form" action="edit.php">
            <div class="name">
                <label for="name">Name</label>
                <input type="text" name="name" id="name" placeholder="Enter your name" value="<?php echo $row['name'] ?>">
            </div>
            <div class="email">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" placeholder="Enter your email" value="<?php echo $row['email'] ?>" readonly>
            </div>
            <div class="password">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" placeholder="Enter your password" value="<?php echo $row['password'] ?>">
            </div>
            <input type="hidden" name="id" value="<?php echo $row['id'] ?>">
            <button class="button" type="submit" name="submit">Update</button>
        </form>
    </main>
</body>

</html>