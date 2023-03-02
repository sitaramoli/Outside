<?php
include("conn.php");
if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    $sql = "insert into students(name,email,password) values('$name','$email','$password')";
    $result = mysqli_query($conn, $sql);
    if ($result) {
        header('location:home.php');
    } else {
        echo "failed";
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles/style.css">
    <title>Student Form</title>
</head>

<body>
    <main class="signup">
        <form action="form.php" class="form" method="post">
            <div class="name">
                <label for="name">Name</label>
                <input type="text" name="name" id="name" placeholder="Enter your name">
            </div>
            <div class="email">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" placeholder="Enter your email">
            </div>
            <div class="password">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" placeholder="Enter your password">
            </div>
            <button class="button" type="submit" name="submit">Submit</button>
        </form>
    </main>
</body>

</html>