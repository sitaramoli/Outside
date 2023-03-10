<?php
class MyClass
{
    public $a;

    public function __construct($a)
    {
        $this->a = $a;
        echo "__construct() is called at the creation of object <br>";
    }
    public function __invoke($x)
    {
        echo "__invoke() function is called when object is called as a function. Parameter is " . $x . "<br>";
    }
    public function __debugInfo()
    {
        echo "__debugInfo() function is called by var_dump() when dumping an object to get the properties that should be shown <br>";
        return ['member' => $this->a];
    }
    public function __toString()
    {
        return "__toString() is called when object is treated as a String <br>";
    }
}

$obj = new MyClass(10);
$obj("Hello");
echo var_dump($obj) . "<br>";
echo $obj;