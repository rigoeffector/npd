<?php
include_once "../../config/Config.php";


class Projects
{
    // DB STUFF HERE 

    private $conn;
    private $table = 'projects';

    // UserClass properties
    public $id;
    public $name;
    public $managerId;
    public $siteId;
    public $startdate;
    public $enddate;
    public $description;
    public $status;


    // initialize a constructor to map with connection 

    public function __construct($db)
    {
        $this->conn = $db;
    }


    // Create function in Projects class with name existence check
    public function create($data)
    {
        try {
            // Set the PDO error mode to exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Check if a record with the same name already exists
            $stmt = $this->conn->prepare("SELECT COUNT(*) FROM " . $this->table . " WHERE name = :name");
            $stmt->bindParam(':name', $data["name"]);
            $stmt->execute();
            $count = $stmt->fetchColumn();

            if ($count > 0) {
                // A record with the same name already exists, return false
                return false;
            }

            // No record with the same name exists, proceed with insertion
            $insertStmt = $this->conn->prepare("INSERT INTO " . $this->table . " (name, managerId, siteId, startdate, enddate, description, status) 
                            VALUES (:name, :managerId, :siteId, :startdate, :enddate, :description, :status)");
            $insertStmt->execute([
                "name" => $data["name"],
                "managerId" => $data["managerId"],
                "siteId" => $data["siteId"],
                "startdate" => $data["startdate"],
                "enddate" => $data["enddate"],
                "description" => $data["description"],
                "status" => $data["status"],
            ]);

            return true; // Return a success indicator if the insert was successful.
        } catch (PDOException $e) {
            // Handle any database errors here.
            return false; // Return a failure indicator if an error occurred.
        }
    }

    // Modify the update function in the Projects class
    public function update($data)
    {
        try {
            // set the PDO error mode to exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Check if the project with the given ID exists
            $checkQuery = "SELECT COUNT(*) FROM " . $this->table . " WHERE id = :id";
            $checkStmt = $this->conn->prepare($checkQuery);
            $checkStmt->bindParam(':id', $data["id"]);
            $checkStmt->execute();
            $count = $checkStmt->fetchColumn();

            if ($count === 0) {
                // Project with the given ID does not exist, return false
                return false;
            }

            // Update the project information
            $updateQuery = "UPDATE " . $this->table . " SET name = :name, managerId = :managerId, siteId = :siteId, startdate = :startdate, enddate = :enddate, description = :description, status=:status WHERE id = :id";
            $updateStmt = $this->conn->prepare($updateQuery);
            $updateStmt->bindParam(':id', $data["id"]);
            $updateStmt->bindParam(':name', $data["name"]);
            $updateStmt->bindParam(':managerId', $data["managerId"]);
            $updateStmt->bindParam(':siteId', $data["siteId"]);
            $updateStmt->bindParam(':startdate', $data["startdate"]);
            $updateStmt->bindParam(':enddate', $data["enddate"]);
            $updateStmt->bindParam(':description', $data["description"]);
            $updateStmt->bindParam(':status', $data["status"]);

            if ($updateStmt->execute()) {
                return true; // Return true if the update was successful.
            } else {
                return false; // Return false if an error occurred during the update.
            }
        } catch (PDOException $e) {
            // Handle any database errors here.
            return false; // Return false if an error occurred.
        }
    }


    // Modify the readAll function in the Projects class
    public function readAll()
    {
        try {
            // Set the PDO error mode to exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // SQL query to join employees to manager info and sites to site info
            $query = "SELECT p.id, p.name, p.startdate, p.enddate, p.description, p.status,  e.id AS managerId,
                         e.fname AS manager_fname, e.lname AS manager_lname, s.id AS siteId,
                         s.name AS site_name, s.location AS site_location
                  FROM " . $this->table . " p
                  LEFT JOIN employees e ON p.managerId = e.id
                  LEFT JOIN sites s ON p.siteId = s.id";

            // Prepare and execute the query
            $stmt = $this->conn->prepare($query);
            $stmt->execute();

            return $stmt;
        } catch (PDOException $e) {
            // Handle any database errors here.
            return null; // Return null if an error occurred.
        }
    }


   


    // Modify the delete function in the Projects class
    public function delete($id)
    {
        try {
            // Set the PDO error mode to exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Prepare the delete query
            $query = "DELETE FROM " . $this->table . " WHERE id = :id";

            // Prepare and execute the query
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":id", $id, PDO::PARAM_INT);

            if ($stmt->execute()) {
                return true; // Return true if the deletion was successful.
            } else {
                return false; // Return false if an error occurred during deletion.
            }
        } catch (PDOException $e) {
            // Handle any database errors here.
            return false; // Return false if an error occurred.
        }
    }
}
