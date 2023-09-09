<?php
require_once "../../config/Connection.php";
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once "../../models/assign/index.php";

// Now you can directly use $conn
$db = $conn;
$assign = new Assign($db);

// Call the readAll function to retrieve assignment records with employee and project details
$result = $assign->readAll();

if ($result) {
    $assign_arr = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $assignment_item = array(
            "assignmentId" => $assignmentId,
            "employeeId" => $employeeId,
            "employeeFirstName" => $employeeFirstName,
            "employeeLastName" => $employeeLastName,
            "employeeIdNumber" => $employeeIdNumber,
            "employeePhoneNumber" => $employeePhoneNumber,
            "employeeAge" => $employeeAge,
            "employeeSalary" => $employeeSalary,
            "employeeGender" => $employeeGender,
            "employeeSiteId" => $employeeSiteId,
            "employeeRole" => $employeeRole,
            "employeeStartDate" => $employeeStartDate,
            "employeeDob" => $employeeDob,
            "emergencyFirstName" => $emergencyFirstName,
            "emergencyLastName" => $emergencyLastName,
            "emergencyPhoneNumber" => $emergencyPhoneNumber,
            "emergencyRelation" => $emergencyRelation,
            "documentLink" => $documentLink,
            "projectId" => $projectId,
            "projectName" => $projectName,
            "projectManagerId" => $projectManagerId,
            "projectSiteId" => $projectSiteId,
            "projectStartDate" => $projectStartDate,
            "projectEndDate" => $projectEndDate,
            "projectDescription" => $projectDescription
        );

        array_push($assign_arr, $assignment_item);
    }

    // Send the JSON response
    echo json_encode(array(
        "status" => "success",
        "error" => false,
        "success" => true,
        "message" => "Assignment records are fetched successfully",
        "data" => $assign_arr
    ));
} else {
    // No assignment records found or an error occurred
    echo json_encode(array(
        "status" => "success",
        "error" => false,
        "success" => true,
        "message" => "No assignment records found",
        "data" => array()
    ));
}
?>
