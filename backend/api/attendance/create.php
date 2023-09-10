<?php
require_once "../../config/Connection.php";
header("Access-Control-Allow-Origin:*");
header("Content-Type:application/json");
header('Access-Control-Allow-Methods:POST');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With");
include_once "../../models/attendance/index.php";

// Now you can directly use $conn
$db = $conn;
$attendance = new Attendance($db);

// Get the data from the request body as an array of objects
$data = json_decode(file_get_contents("php://input"), true); // Add true to decode as an associative array

// Check if the data is an array
if (is_array($data)) {
    // Call the create function to insert multiple attendance records
    try {
        // Modified create function that checks for duplicates
        if ($attendance->create($data)) {
            // Successfully inserted attendance records
            $response = array(
                "status" => "success",
                "error" => false,
                "success" => true,
                "message" => "Attendance records have been created successfully."
            );
            echo json_encode($response);
        } else {
            // Error occurred during insertion
            $response = array(
                "status" => "error",
                "error" => true,
                "success" => false,
                "message" => "Error occurred while creating attendance records."
            );
            echo json_encode($response);
        }
    } catch (Exception $e) {
        // Handle the exception by returning an error response
        $response = array(
            "status" => "error",
            "error" => true,
            "success" => false,
            "message" => "Attendance record for this employee(s) on this project for date " . date("Y-m-d") . " already exists."
        );
        echo json_encode($response);
    }
} else {
    // Data in the request body is not an array
    $response = array(
        "status" => "error",
        "error" => true,
        "success" => false,
        "message" => "Invalid data format. Expecting an array."
    );
    echo json_encode($response);
}
?>
