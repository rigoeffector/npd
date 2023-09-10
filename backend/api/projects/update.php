<?php
require_once "../../config/Connection.php";// Handle preflight OPTIONS request
header("Access-Control-Allow-Origin:*");
header("Content-Type:application/json");
header('Access-Control-Allow-Methods:PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With");

include_once "../../models/projects/index.php";

// Now you can directly use $conn
$db = $conn;
$project = new Projects($db);

// Get the data from the request body
$data = json_decode(file_get_contents("php://input"));

// Check if all required fields are provided
if (
    isset($data->id) &&
    isset($data->name) &&
    isset($data->managerId) &&
    isset($data->siteId) &&
    isset($data->startdate) &&
    isset($data->enddate) &&
    isset($data->status) &&
    isset($data->description)
) {
    // Call the update function to update the project
    if ($project->update((array)$data)) { // Cast $data to an array
        // Project was successfully updated
        $response = array(
            "status" => "success",
            "error" => false,
            "success" => true,
            "message" => "Project  has been updated."
        );
        echo json_encode($response);
    } else {
        // Error occurred during update or project with given ID does not exist
        $response = array(
            "status" => "error",
            "error" => true,
            "success" => false,
            "message" => "Project  was not updated. An error occurred or the project does not exist."
        );
        echo json_encode($response);
    }
} else {
    // Required fields are missing in the request body
    $response = array(
        "status" => "error",
        "error" => true,
        "success" => false,
        "message" => "All required fields (id, name, managerId, siteId, startdate, enddate, description) must be provided in the request body."
    );
    echo json_encode($response);
}
