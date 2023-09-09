<?php
require_once "../../config/Connection.php";
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header('Access-Control-Allow-Methods: DELETE');
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With");
include_once "../../models/attendance/index.php";

// Now you can directly use $conn
$db = $conn;
$attendance = new Attendance($db);

// Get the data from the request body as JSON
$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['id'])) {
    // Call the delete function to delete the attendance record
    if ($attendance->delete($data['id'])) {
        // Successfully deleted the attendance record
        $response = array(
            "status" => "success",
            "error" => false,
            "success" => true,
            "message" => "Attendance record with ID {$data['id']} has been deleted."
        );
        echo json_encode($response);
    } else {
        // Error occurred during deletion, or the record does not exist
        $response = array(
            "status" => "error",
            "error" => true,
            "success" => false,
            "message" => "Attendance record with ID {$data['id']} was not found or could not be deleted."
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
