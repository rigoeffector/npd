<?php
require_once "../../config/Connection.php";
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header('Access-Control-Allow-Methods: PUT');
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With");
include_once "../../models/reports/index.php";

// Now you can directly use $conn
$db = $conn;
$reports = new Reports($db);

// Get the data from the request body as JSON
$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['id'])) {
    // Call the update function to update the report
    if ($reports->update($data)) {
        // Successfully updated the report
        $response = array(
            "status" => "success",
            "error" => false,
            "success" => true,
            "message" => "Report is updated successfully."
        );
        echo json_encode($response);
    } else {
        // Error occurred during report update
        $response = array(
            "status" => "error",
            "error" => true,
            "success" => false,
            "message" => "Report is not updated successfully. The report with the specified ID was not found."
        );
        echo json_encode($response);
    }
} else {
    // Handle the case where the request body is empty or missing the ID
    $response = array(
        "status" => "error",
        "error" => true,
        "success" => false,
        "message" => "Invalid data format. Expecting JSON data with an 'id' field."
    );
    echo json_encode($response);
}
?>
