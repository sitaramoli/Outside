<?php
class MyNumber{
    public $value;

    function __construct($value)
    {
        $this->value = $value;
    }

    function __invoke()
    {
        $this->value -=1 ;
        return $this->value;
    }
}
$number = new MyNumber(5);
echo $number();
?>