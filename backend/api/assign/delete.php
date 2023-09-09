<?php
require_once "../../config/Connection.php";
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header('Access-Control-Allow-Methods: DELETE');
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With");
include_once "../../models/assign/index.php";

// Now you can directly use $conn
$db = $conn;
$assign = new Assign($db);

// Get the data from the request body as JSON
$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['id'])) {
    // Call the delete function to delete the assignment record
    if ($assign->delete($data['id'])) {
        // Successfully deleted the assignment record
        $response = array(
            "status" => "success",
            "error" => false,
            "success" => true,
            "message" => "Assignment record with ID {$data['id']} has been deleted."
        );
        echo json_encode($response);
    } else {
        // Error occurred during assignment record deletion
        $response = array(
            "status" => "error",
            "error" => true,
            "success" => false,
            "message" => "Error occurred while deleting the assignment record with ID {$data['id']}."
        );
        echo json_encode($response);
    }
} else {
    // Handle the case where the 'id' field is missing or empty in the request body
    $response = array(
        "status" => "error",
        "error" => true,
        "success" => false,
        "message" => "Invalid data format. Expecting JSON data with an 'id' field."
    );
    echo json_encode($response);
}
?>
