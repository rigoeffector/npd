<?php
require_once "../../config/Connection.php";
header("Access-Control-Allow-Origin:*");
header("Content-Type:application/json");
header('Access-Control-Allow-Methods:POST');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With");
include_once "../../models/projects/index.php";

// Now you can directly use $conn
$db = $conn;
$project = new Projects($db);

$data = json_decode(file_get_contents("php://input"), true); // Decode JSON as an array

if (!empty($data['name']) && !empty($data['managerId']) && !empty($data['siteId']) && !empty($data['startdate']) && !empty($data['enddate'])) {
    // Validate date format (yyyy/mm/dd)
    $start_date = DateTime::createFromFormat('Y/m/d', $data['startdate']);
    $end_date = DateTime::createFromFormat('Y/m/d', $data['enddate']);

    if ($start_date !== false && $end_date !== false) {
        // Date format is valid, proceed with creating the project
        if ($project->create($data)) {
            // Project created successfully
            $response = array(
                "status" => "success",
                "error" => false,
                "success" => true,
                "message" => "Project created successfully"
            );

            echo json_encode($response);
        } else {
            // Failed to create project
            $response = array(
                "status" => "error",
                "error" => true,
                "success" => false,
                "message" => "Failed to create project"
            );

            echo json_encode($response);
        }
    } else {
        // Invalid date format
        $response = array(
            "status" => "error",
            "error" => true,
            "success" => false,
            "message" => "Invalid date format. Use yyyy/mm/dd."
        );

        echo json_encode($response);
    }
} else {
    // Missing or empty parameters
    $response = array(
        "status" => "error",
        "error" => true,
        "success" => false,
        "message" => "Missing or empty parameters"
    );

    echo json_encode($response);
}
?>
