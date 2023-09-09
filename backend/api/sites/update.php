<?php
require_once "../../config/Connection.php";
header("Access-Control-Allow-Origin:*");
header("Content-Type:application/json");
header('Access-Control-Allow-Methods:PUT'); // Change the method to PUT for updates
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With");
include_once "../../models/sites/index.php";

// Now you can directly use $conn
$db = $conn;
$site = new Sites($db);

$data = json_decode(file_get_contents("php://input"), true); // Decode JSON as an array

// Check if "id," "name," and "location" are set and not empty
if (isset($data['id']) && isset($data['name']) && isset($data['location']) && !empty($data['id']) && !empty($data['name']) && !empty($data['location'])) {
    // prepare data to be sent
    $site->name = $data['name'];
    $site->location = $data['location'];
    $site->description = isset($data['description']) ? $data['description'] : '';

    // Update the record based on the provided ID
    if ($site->update($data['id'], $data)) { // Use the update function
        $response = array(
            "status" => "success",
            "error" => false,
            "success" => true,
            "message" => " Site is updated successfully"
        );
        echo json_encode($response);
    } else {
        $response = array(
            "status" => "error",
            "error" => true,
            "success" => false,
            "message" => "Site is not updated successfully. Record not found or other error."
        );
        echo json_encode($response);
    }
} else {
    // Handle the case where "id," "name," and/or "location" are missing or empty
    $response = array(
        "status" => "error",
        "error" => true,
        "success" => false,
        "message" => "ID, name, and location are required fields."
    );
    echo json_encode($response);
}
?>
