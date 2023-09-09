<?php
require_once "../../config/Connection.php";
header("Access-Control-Allow-Origin:*");
header("Content-Type:application/json");
header('Access-Control-Allow-Methods:DELETE'); // Use DELETE method for deletion
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With");
include_once "../../models/sites/index.php";

// Now you can directly use $conn
$db = $conn;
$site = new Sites($db);

$data = json_decode(file_get_contents("php://input"), true); // Decode JSON as an array

// Check if "id" is set and not empty
if (isset($data['id']) && !empty($data['id'])) {
    // Delete the record based on the provided ID
    if ($site->delete($data['id'])) { // Use the delete function
        $response = array(
            "status" => "success",
            "error" => false,
            "success" => true,
            "message" => "Site is deleted successfully"
        );
        echo json_encode($response);
    } else {
        $response = array(
            "status" => "error",
            "error" => true,
            "success" => false,
            "message" => "Site is not deleted successfully. Record not found or other error."
        );
        echo json_encode($response);
    }
} else {
    // Handle the case where "id" is missing or empty
    $response = array(
        "status" => "error",
        "error" => true,
        "success" => false,
        "message" => "ID is required for deletion."
    );
    echo json_encode($response);
}
?>
