<?php
require_once "../../config/Connection.php";
header("Access-Control-Allow-Origin:*");
header("Content-Type:application/json");
header('Access-Control-Allow-Methods:PUT'); // Use PUT for updates
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With");
include_once "../../models/employees/index.php";

// Now you can directly use $conn
$db = $conn;
$employee = new Employees($db);

$data = json_decode(file_get_contents("php://input"), true); // Decode JSON as an array

if (!empty($data['id']) && $employee->update($data)) {
    // Employee data updated successfully
    $response = array(
        "status" => "success",
        "error" => false,
        "success" => true,
        "message" => "Employee data updated successfully"
    );
    echo json_encode($response);
} else {
    // Failed to update or missing ID
    $response = array(
        "status" => "error",
        "error" => true,
        "success" => false,
        "message" => "Failed to update employee data or missing ID"
    );
    echo json_encode($response);
}
?>
