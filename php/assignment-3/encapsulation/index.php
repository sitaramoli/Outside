<?php
echo "Yes php supports encapsulation.Encapsulation is a protection mechanism for the data members and methods present 
inside the class. In the encapsulation technique, we are restricting the data members from 
access to outside world end-user.Using encapsulation, we are hiding the real implementation of 
data from the user and also does not allow anyone to manipulate data members except by calling the desired 
operation. <br> In this example count is private. we can't access count from outside the class.<br>";

class Counter
{
    private $count;

    function __construct($count)
    {
        $this->count = $count;
    }

    function increment()
    {
        $this->count++;
    }
    function getCount()
    {
        return $this->count;
    }
}

$obj = new Counter(5);
$obj->increment();
echo 'Count: ' . $obj->getCount().' is read using getCount() function' ;
