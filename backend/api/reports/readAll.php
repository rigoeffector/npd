<?php
require_once "../../config/Connection.php";
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header('Access-Control-Allow-Methods: GET');
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With");
include_once "../../models/reports/index.php";

// Now you can directly use $conn
$db = $conn;
$report = new Reports($db);

// ... Other headers and includes ...

// Call the readAll function to retrieve all reports with createdBy and updatedBy details
$result = $report->readAll();

if ($result) {
    $report_arr = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        // Extract data and build the report item
        extract($row);

        $report_item = array(
            "reportId" => $reportId,
            "reportName" => $reportName,
            "reportStatus" => $reportStatus,
            "reportLink" => $reportLink,
            "reportCreatedAt" => $reportCreatedAt,
            "reportDescription" => $reportDescription,
            "createdBy" => array(
                "employeeId" => $createdByEmployeeId,
                "firstName" => $createdByFirstName,
                "lastName" => $createdByLastName
            ),
            "updatedBy" => array(
                "employeeId" => $updatedByEmployeeId,
                "firstName" => $updatedByFirstName,
                "lastName" => $updatedByLastName
            )
        );

        array_push($report_arr, $report_item);
    }

    // Send the JSON response
    echo json_encode($report_arr);
} else {
    // No reports found or an error occurred
    $response = array(
        "status" => "error",
        "error" => true,
        "success" => false,
        "message" => "No reports found or an error occurred.",
        "data" => array() // Add an empty data array
    );
    echo json_encode($response);
}
