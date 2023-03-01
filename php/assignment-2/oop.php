<?php

abstract class Student
{
    protected $name;

    function __construct($name)
    {
        $this->name = $name;
    }

    function getName()
    {
        echo "Name: " . $this->name . "<br>";
    }

    abstract function averageMarks();
}

class ComputerScienceStudent extends Student
{
    private $computer;
    private $english;
    private $computer_network;

    function __construct($name, $computer, $english, $computer_network)
    {
        parent::__construct($name);
        $this->computer = $computer;
        $this->english = $english;
        $this->computer_network = $computer_network;
    }

    function getName()
    {
        parent::getName();
    }

    function averageMarks()
    {
        $total = $this->computer + $this->english + $this->computer_network;
        echo "Computer: " . $this->computer . "<br>";
        echo "English: " . $this->english . "<br>";
        echo "Computer Network: " . $this->computer_network . "<br>";
        echo "Total Marks: " . $total . "<br>";
        echo "Average Marks: " . $total / 3 . "<br>";
    }
}

class MathematicsStudent extends Student
{
    private $calculus;
    private $algebra;
    private $vector;

    function __construct($name, $calculus, $algebra, $vector)
    {
        parent::__construct($name);
        $this->calculus = $calculus;
        $this->algebra = $algebra;
        $this->vector = $vector;
    }

    function getName()
    {
        parent::getName();
    }

    function averageMarks()
    {
        $total = $this->calculus + $this->algebra + $this->vector;
        echo "Calculus: " . $this->calculus . "<br>";
        echo "Algebra: " . $this->algebra . "<br>";
        echo "Vector: " . $this->vector . "<br>";
        echo "Total Marks: " . $total . "<br>";
        echo "Average Marks: " . $total / 3 . "<br>";
    }
}

echo "***********Computer Science Student*********** <br>";
$computerStudent = new ComputerScienceStudent("Sita", 70, 80, 90);
$computerStudent->getName();
$computerStudent->averageMarks();

echo "***********Mathematics Student*********** <br>";
$mathsStudent = new MathematicsStudent("Ram", 85, 95, 90);
$mathsStudent->getName();
$mathsStudent->averageMarks();
?>