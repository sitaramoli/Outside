<?php

class StudentController
{
    private $request_method;
    private $connection;
    private $response;
    function __construct($connection)
    {
        $this->connection = $connection;
        $this->request_method = $_SERVER["REQUEST_METHOD"];
    }

    public function processRequest()
    {
        switch ($this->request_method) {
            case 'GET':
                $this->response = $this->getStudents();
                return $this->response;

            case 'POST':
                $this->response = $this->addStudent();
                return $this->response;

            case 'DELETE':
                $this->response = $this->deleteStudent();
                return $this->response;

            case 'PUT':
                $this->response = $this->updateStudent();
                return $this->response;

            default:
                $this->response = $this->noRequestFound();
                return $this->response;

        }

    }

    private function noRequestFound()
    {
        $result = array("message" => "No Request Found");
        return json_encode($result);
    }

    private function getStudents()
    {
        $query = "Select * from students order by id asc";
        $result = mysqli_query($this->connection, $query);
        if (mysqli_num_rows($result) > 0) {
            $result_array = array();
            while ($row = mysqli_fetch_assoc($result)) {
                array_push($result_array, $row);
            }
            $response = [
                'status' => 200,
                'message' => 'Student list fetched successfully',
                'data' => $result_array
            ];
            header('HTTP/1.0 200 Success');
        } else {
            $response = [
                'status' => 404,
                'message' => 'No students found'
            ];
        }

        return json_encode($response);
    }

    private function addStudent()
    {
        $response = array("message" => "Student Added Successfully");
        return json_encode($response);
    }

    private function deleteStudent()
    {
        $response = array("message" => "Student deleted Successfully");
        return json_encode($response);
    }
    private function updateStudent()
    {
        $response = array("message" => "Student updated Successfully");
        return json_encode($response);
    }
}
?>