<?php
require_once "../../config/Connection.php";
header("Access-Control-Allow-Origin:*");
header("Content-Type:application/json");
header('Access-Control-Allow-Methods:GET');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With");
include_once "../../models/projects/index.php";

// Now you can directly use $conn
$db = $conn;
$project = new Projects($db);

// Call the readAll function to retrieve all projects with joined data
$result = $project->readAll();

if ($result) {
    $projects_arr = array(
        "status" => "success",
        "error" => false,
        "success" => true,
        "data" => array()
    );

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $project_item = array(
            "id" => $id,
            "name" => $name,
            "startdate" => $startdate,
            "enddate" => $enddate,
            "description" => $description,
            "status" => $status,
            "manager" => array(
                "id" => $managerId,
                "fname" => $manager_fname,
                "lname" => $manager_lname
            ),
            "site" => array(
                "id" => $siteId,
                "name" => $site_name,
                "location" => $site_location
            )
        );

        $projects_arr["data"][] = $project_item;
    }

    // Return the projects data as JSON
    echo json_encode($projects_arr);
} else {
    // No projects found or an error occurred
    $response = array(
        "status" => "error",
        "error" => true,
        "success" => false,
        "message" => "No projects found.",
        "data" => array() 
    );

    echo json_encode($response);
}
?>
