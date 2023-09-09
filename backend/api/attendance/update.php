<?php
require_once "../../config/Connection.php";
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header('Access-Control-Allow-Methods: PUT');
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With");
include_once "../../models/attendance/index.php";

// Now you can directly use $conn
$db = $conn;
$attendance = new Attendance($db);

// Get the data from the request body as JSON
$data = json_decode(file_get_contents("php://input"), true);

if (is_array($data)) {
    // Call the update function to update multiple attendance records
    $successCount = 0;
    $errorCount = 0;

    foreach ($data as $record) {
        if (!empty($record['id']) && !empty($record['status'])) {
            if ($attendance->update($record)) {
                $successCount++;
            } else {
                $errorCount++;
            }
        }
    }

    // Check if any updates were successful
    if ($successCount > 0) {
        // Some records were successfully updated
        $response = array(
            "status" => "success",
            "error" => false,
            "success" => true,
            "message" => "$successCount attendance records updated successfully."
        );
        echo json_encode($response);
    } else {
        // No records were successfully updated, or there were no valid records to update
        $response = array(
            "status" => "error",
            "error" => true,
            "success" => false,
            "message" => "No valid attendance records found for updating."
        );
        echo json_encode($response);
    }
} else {
    // Handle the case where the request body is not an array
    $response = array(
        "status" => "error",
        "error" => true,
        "success" => false,
        "message" => "Invalid data format. Expecting an array of attendance records."
    );
    echo json_encode($response);
}
?>
