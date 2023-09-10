<?php
require_once "../../config/Connection.php";

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With");
    exit();
}

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header('Access-Control-Allow-Methods: POST');
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With");

// Include the Employees model and create a database connection
include_once "../../models/employees/index.php";
$db = $conn;
$employee = new Employees($db);

// Check if it's a POST request (you can change the method if needed)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Call the readByOther function to retrieve the data
        $result = $employee->readByOther();

        if ($result) {
            // Return the data as JSON response
            $response = array(
                "status" => "success",
                "error" => false,
                "success" => true,
                "message" => "Employees retrieved successfully",
                "data" => $result
            );
            echo json_encode($response);
        } else {
            // Handle the case where no data is found or an error occurs
            http_response_code(404); // Set HTTP status code to 404
            echo json_encode(array("message" => "No records found."));
        }
    } catch (PDOException $e) {
        // Handle any database errors here.
        http_response_code(500); // Set HTTP status code to 500 for internal server error
        echo json_encode(array("message" => "Internal server error."));
    }
} else {
    // Handle other HTTP methods if needed
    http_response_code(405); // Set HTTP status code to 405 for Method Not Allowed
    echo json_encode(array("message" => "Method Not Allowed."));
}
?>
