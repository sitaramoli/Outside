<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Assignment 1</title>
</head>

<body>
    <?php
    $myFile = fopen('input.txt', 'r');
    $text = fread($myFile, filesize("input.txt"));
    $calory_by_group = explode("\n\n", $text);
    foreach ($calory_by_group as $calory) {
        $sum_calory[] = array_sum(explode("\n", $calory));
    }
    $max = max($sum_calory);
    echo ("max calory is: $max \n");

    rsort($sum_calory);
    echo ("top 3 calories are: ");
    for ($i = 0; $i < 3; $i++) {
        echo ("$sum_calory[$i] \n");
    }
    ?>
</body>

</html>