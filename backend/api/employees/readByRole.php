<?php
require_once "../../config/Connection.php";
header("Access-Control-Allow-Origin:*");
header("Content-Type:application/json");
header('Access-Control-Allow-Methods:GET');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With");
include_once "../../models/employees/index.php";

// Now you can directly use $conn
$db = $conn;
$employee = new Employees($db);

$role = isset($_GET['role']) ? $_GET['role'] : '';

if (!empty($role)) {
    // Call the readByRole function to retrieve employees by role
    $result = $employee->readByRole($role);

    if ($result !== null && $result->rowCount() > 0) {
        // Create an array to hold the records
        $employees_arr = array();
        $employees_arr["data"] = array();

        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            // Create an employee item
            $employee_item = array(
                "id" => $id,
                "fname" => $fname,
                "lname" => $lname,
                "idnumber" => $idnumber,
                "phonenumber" => $phonenumber,
                "age" => $age,
                "salary" => $salary,
                "gender" => $gender,
                "siteId" => $siteId,
                "role" => $role,
                "startdate" => $startdate,
                "dob" => $dob,
                "emfname" => $emfname,
                "emlname" => $emlname,
                "emphone" => $emphone,
                "emrelation" => $emrelation,
                "doclink" => $doclink
            );

            // Push to the data array
            array_push($employees_arr["data"], $employee_item);
        }

        // Set response status and data
        $response = array(
            "status" => "success",
            "error" => false,
            "success" => true,
            "message" => "Employees by role retrieved successfully",
            "data" => $employees_arr["data"]
        );

        echo json_encode($response);
    } else {
        // No records found for the specified role
        $response = array(
            "status" => "error",
            "error" => false,
            "success" => false,
            "message" => "No employees found for the specified role"
        );

        echo json_encode($response);
    }
} else {
    // Missing or empty role parameter
    $response = array(
        "status" => "error",
        "error" => true,
        "success" => false,
        "message" => "Role parameter is missing or empty"
    );

    echo json_encode($response);
}
?>
