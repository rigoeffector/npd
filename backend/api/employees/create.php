<?php
require_once "../../config/Connection.php";
header("Access-Control-Allow-Origin:*");
header("Content-Type:application/json");
header('Access-Control-Allow-Methods:POST');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With");
include_once "../../models/employees/index.php";

// Now you can directly use $conn
$db = $conn;
$employee = new Employees($db);

$data = json_decode(file_get_contents("php://input"), true); // Decode JSON as an array

// Check if required fields are set and not empty
if (
    isset($data['fname']) && !empty($data['fname']) &&
    isset($data['lname']) && !empty($data['lname']) &&
    isset($data['idnumber']) && strlen($data['idnumber']) === 16 && ctype_digit($data['idnumber']) && // Validate idnumber
    isset($data['phonenumber'])  && !empty($data['phonenumber']) &&  strlen($data['phonenumber'])  === 10 &&ctype_digit($data['phonenumber']) &&
    isset($data['emphone'])  && !empty($data['emphone']) &&  strlen($data['emphone'])  === 10 &&ctype_digit($data['emphone']) &&
    isset($data['siteId']) && !empty($data['siteId'])
) {
    // prepare data to be sent
    $employee->fname = $data['fname'];
    $employee->lname = $data['lname'];
    $employee->idnumber = $data['idnumber'];
    $employee->phonenumber = $data['phonenumber'];
    $employee->age = isset($data['age']) ? $data['age'] : '';
    $employee->salary = isset($data['salary']) ? $data['salary'] : '';
    $employee->gender = isset($data['gender']) ? $data['gender'] : '';
    $employee->role = isset($data['role']) ? $data['role'] : '';
    $employee->siteId = isset($data['siteId']) ? $data['siteId'] : '';
   // Format the startData and dob fields to "YYYY/MM/DD"
   $employee->startdate = isset($data['startData']) ? date('Y/m/d', strtotime($data['startdate'])) : '';
   $employee->dob = isset($data['dob']) ? date('Y/m/d', strtotime($data['dob'])) : '';
    $employee->emfname = isset($data['emFname']) ? $data['emfname'] : '';
    $employee->emlname = isset($data['emLname']) ? $data['emlname'] : '';
    $employee->emphone = isset($data['emPhone']) ? $data['emphone'] : '';
    $employee->emrelation = isset($data['emRelation']) ? $data['emrelation'] : '';
    $employee->doclink = isset($data['docLink']) ? $data['doclink'] : '';

    if ($employee->create($data)) {
        $response = array(
            "status" => "success",
            "error" => false,
            "success" => true,
            "message" => "Employee is created successfully"
        );
        echo json_encode($response);
    } else {
        $response = array(
            "status" => "error",
            "error" => true,
            "success" => false,
            "message" => "Employee is not created successfully. A record with the same ID number may already exist."
        );
        echo json_encode($response);
    }
} else {
    // Handle the case where required fields are missing, empty, or validation fails
    $response = array(
        "status" => "error",
        "error" => true,
        "success" => false,
        "message" => "First name, last name, Phone must be 10 digits, a 15-digit ID number containing only digits, phone number, and site ID are required fields."
    );
    echo json_encode($response);
}
