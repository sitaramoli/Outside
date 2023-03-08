<?php
include("conn.php");
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="stylesheet" href="styles/style.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
</head>

<body>
    <main class="home">
        <div> <a class="button button-add" href="form.php">Add Students</a></div>
        <table class="student-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <?php
                $sql = "select id,name,email,password from students";
                $result = mysqli_query($conn, $sql);
                if ($result) {
                    while ($row = mysqli_fetch_assoc($result)) {
                        $id = $row['id'];
                        $name = $row['name'];
                        $email = $row['email'];
                        $password = $row['password'];
                        echo '<tr>
                            <td>' . $id . '</td>
                            <td>' . $name . '</td>
                            <td>' . $email . '</td>
                            <td>' . $password . '</td>
                            <td><a class="button button-edit" href="edit.php?id=' . $id . '">Edit</a></td>
                            <td><a class="button button-delete" href="delete.php?id=' . $id . '">Delete</a></td>
                        </tr>';
                    }
                }
                ?>
            </tbody>
        </table>
    </main>
</body>

</html>