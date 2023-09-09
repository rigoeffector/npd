<?php
require_once "../../config/Connection.php";
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header('Access-Control-Allow-Methods: POST');
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With");
include_once "../../models/reports/index.php";

// Now you can directly use $conn
$db = $conn;
$reports = new Reports($db);

// Get the data from the request body as JSON
$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data)) {
    // Call the create function to insert a new report
    if ($reports->create($data)) {
        // Successfully created the report
        $response = array(
            "status" => "success",
            "error" => false,
            "success" => true,
            "message" => "Report is created successfully."
        );
        echo json_encode($response);
    } else {
        // Error occurred during report creation
        $response = array(
            "status" => "error",
            "error" => true,
            "success" => false,
            "message" => "Report is not created successfully. A report with the same name already exists."
        );
        echo json_encode($response);
    }
} else {
    // Handle the case where the request body is empty or not valid JSON
    $response = array(
        "status" => "error",
        "error" => true,
        "success" => false,
        "message" => "Invalid data format. Expecting JSON data."
    );
    echo json_encode($response);
}
?>
