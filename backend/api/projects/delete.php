<?php
require_once "../../config/Connection.php";
header("Access-Control-Allow-Origin:*");
header("Content-Type:application/json");
header('Access-Control-Allow-Methods:DELETE');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With");
include_once "../../models/projects/index.php";

// Now you can directly use $conn
$db = $conn;
$project = new Projects($db);

// Get the data from the request body
$data = json_decode(file_get_contents("php://input"));

// Check if the "id" property is provided in the request body
if (isset($data->id)) {
    $id = $data->id;

    // Call the delete function to delete the project
    if ($project->delete($id)) {
        // Project was successfully deleted
        $response = array(
            "status" => "success",
            "error" => false,
            "success" => true,
            "message" => "Project with ID $id has been deleted."
        );
        echo json_encode($response);
    } else {
        // Error occurred during deletion
        $response = array(
            "status" => "error",
            "error" => true,
            "success" => false,
            "message" => "Project with ID $id was not deleted. An error occurred."
        );
        echo json_encode($response);
    }
} else {
    // "id" property is missing in the request body
    $response = array(
        "status" => "error",
        "error" => true,
        "success" => false,
        "message" => "Project ID is missing in the request body."
    );
    echo json_encode($response);
}
?>
