<?php
include_once "../../models/sites/index.php";
include_once "../../config/Connection.php";
header("Access-Control-Allow-Origin:*");
header("Content-Type:application/json");
header('Access-Control-Allow-Methods:POST');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With");
// Now you can directly use $conn

$db = $conn;
$sites = new Sites($db);
$result = $sites->readAll();
// get Row Count 
$num = $result->rowCount();
if ($num > 0) {
    $sites = array();
    $sites['data'] = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $sites_item = array(
            "id" => $id,
            "name" => $name,
            "location" => $location,
            "description" => $description,
          
        );

        // Push to array  
        array_push($sites['data'], $sites_item);
        // turn it to json mode 
    }

    $response = array(
        "status" => "success",
        "success" => true,
        "error" => false,
        "message" => "Sites are fetched successfully", "data" =>$sites['data'],
    );
    echo  json_encode(
        $response
    );
} else {
    $response = array(
        "status" => "error",
        "data" => [],
        "error" => false,
        "message" => "Sites found yet  ",
        
    );
    echo  json_encode(
        $response
    );
}
