<?php
require_once "../../config/Connection.php";
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header('Access-Control-Allow-Methods: POST');
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With");
include_once "../../models/assign/index.php";

// Now you can directly use $conn
$db = $conn;
$assign = new Assign($db);

// Get the data from the request body as JSON
$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data)) {
    // Call the createAssign function to create assignment records
    if ($assign->createAssign($data)) {
        // Successfully created the assignment records
        $response = array(
            "status" => "success",
            "error" => false,
            "success" => true,
            "message" => "Assignment records have been created successfully."
        );
        echo json_encode($response);
    } else {
        // Error occurred during insertion or the records already exist
        $response = array(
            "status" => "error",
            "error" => true,
            "success" => false,
            "message" => "Error occurred while creating assignment records or records already exist."
        );
        echo json_encode($response);
    }
} else {
    // Handle the case where the request body is empty
    $response = array(
        "status" => "error",
        "error" => true,
        "success" => false,
        "message" => "Invalid data format. Expecting JSON data."
    );
    echo json_encode($response);
}
?>
