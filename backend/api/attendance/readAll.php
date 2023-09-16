<?php
require_once "../../config/Connection.php";
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once "../../models/attendance/index.php";

// Now you can directly use $conn
$db = $conn;
$attendance = new Attendance($db);

// Call the readAll function to retrieve attendance records with employee, project, and site details
$result = $attendance->readAll();

if ($result) {
    $attendance_arr = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $attendance_item = array(
            "id" => $id,
            // "projectId" => $projectId,
            "employeeId" => $employeeId,
            "attendanceTime" => $attendanceTime,
            "attendanceStatus" => $attendanceStatus,
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
            // "projectName" => $projectName,
            "siteName" => $siteName,
            "siteLocation" => $siteLocation
        );

        array_push($attendance_arr, $attendance_item);
    }

    $response = array(
        "status" => "success",
        "error" => false,
        "success" => true,
        "message" => "Attendance records are fetched successfully",
        "data" => $attendance_arr
    );
    echo json_encode($response);
} else {
    // No attendance records found or an error occurred
    $response = array(
        "status" => "error",
        "error" => true,
        "success" => false,
        "message" => "No attendance records found or an error occurred.",
        "data" => array() // Add an empty data array
    );
    echo json_encode($response);
}
?>






