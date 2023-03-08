<?php
class Routes
{
    private $connection;
    function __construct()
    {
        $this->connection = new mysqli('localhost', 'root', '2055', 'library_management_system');
    }

    public function get()
    {
        $query = "select * from students";
        $result = mysqli_query($this->connection, $query);
        return $result;
    }
    public function post($name, $email, $password)
    {
        $query = "insert into students(name,email,password) values('$name','$email','$password')";
        $result = mysqli_query($this->connection, $query);
        if ($result) {
            return 'Added successfully';
        } else {
            return 'Failed';
        }
    }
    public function put($id, $name, $password)
    {
        $query = "update students set name = '$name', password= '$password' where id = $id ";
        $result = mysqli_query($this->connection, $query);
        if ($result) {
            return 'Updated successfully';
        } else {
            return 'Failed';
        }
    }
    public function delete($id)
    {
        $query = "delete from students where id = $id";
        $result = mysqli_query($this->connection, $query);
        if ($result) {
            return 'Deleted Successfully';
        } else {
            return 'Failed';
        }
    }
}

$obj = new Routes();
$result = $obj->get();
$row =  mysqli_fetch_assoc($result);
echo $row['name'];

echo $obj->post('Hari','hari@gmail.com','23355');
echo $obj->put(1,'Gita','new');
echo $obj->delete(1);

?>