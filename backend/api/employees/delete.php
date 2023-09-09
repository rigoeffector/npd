<?php
require_once "../../config/Connection.php";
header("Access-Control-Allow-Origin:*");
header("Content-Type:application/json");
header('Access-Control-Allow-Methods:DELETE'); // Use DELETE for deletions
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With");
include_once "../../models/employees/index.php";

// Now you can directly use $conn
$db = $conn;
$employee = new Employees($db);

$data = json_decode(file_get_contents("php://input"), true); // Decode JSON as an array

if (!empty($data['id']) && $employee->delete($data['id'])) {
    // Employee data deleted successfully
    $response = array(
        "status" => "success",
        "error" => false,
        "success" => true,
        "message" => "Employee data deleted successfully"
    );
    echo json_encode($response);
} else {
    // Failed to delete or missing ID
    $response = array(
        "status" => "error",
        "error" => true,
        "success" => false,
        "message" => "Failed to delete employee data or missing ID"
    );
    echo json_encode($response);
}
?>
