<?php
include_once "../../config/Config.php";


class Reports
{
    // DB STUFF HERE 

    private $conn;
    private $table = 'reports';

    // UserClass properties
    public $id;
    public $name;
    public $description;
    public $createdBy;
    public $updatedBy;
    public $status;
    public $link;
    public $projectId;



    // initialize a constructor to map with connection 

    public function __construct($db)
    {
        $this->conn = $db;
    }


    // Create function in Projects class with name existence check
    // Modify the create function in the Attendance class
    // Refactored create function
    // Refactored create function
    public function create($data)
    {
        try {
            // set the PDO error mode to exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Proceed with insertion
            $insertStmt = $this->conn->prepare("INSERT INTO $this->table (name, createdBy, status, updatedBy, projectId,link, createdAt, description) 
                            VALUES (:name, :createdBy, :status, :updatedBy,:projectId, :link, NOW(), :description)");
            $insertStmt->execute([
                "name" => $data["name"],
                "createdBy" => $data["createdBy"],
                "status" => $data["status"],
                "updatedBy" => $data["updatedBy"],
                "projectId" => $data["projectId"],
                "link" => $data["link"],
                "description" => $data["description"]
            ]);

            return true; // Return a success indicator if the insert was successful.
        } catch (PDOException $e) {
            // Handle any database errors here.
            return false; // Return a failure indicator if an error occurred.
        }
    }







    public function update($data)
    {
        try {
            // Set the PDO error mode to exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Check if the report with the given ID exists
            $stmt = $this->conn->prepare("SELECT COUNT(*) FROM $this->table WHERE id = :id");
            $stmt->bindParam(':id', $data["id"]);
            $stmt->execute();
            $count = $stmt->fetchColumn();

            if ($count === false || $count === 0) {
                // The report with the specified ID does not exist, return false
                return false;
            }

            // Update the report
            $updateStmt = $this->conn->prepare("UPDATE $this->table SET 
                status = :status,
                updatedBy = :updatedBy
                WHERE id = :id");

            $updateStmt->execute([
                "id" => $data["id"],
                "status" => $data["status"],
                "updatedBy" => $data["updatedBy"]
            ]);

            return true; // Return a success indicator if the update was successful.
        } catch (PDOException $e) {
            // Handle any database errors here.
            return false; // Return a failure indicator if an error occurred.
        }
    }




    public function readAll()
    {
        try {
            $query = "SELECT 
            r.id AS reportId,
            r.id,
            r.name AS reportName,
            r.status AS reportStatus,
            r.link AS reportLink,
            r.createdAt AS reportCreatedAt,
            r.description AS reportDescription,
            e1.id AS createdByEmployeeId,
            e1.fname AS createdByFirstName,
            e1.lname AS createdByLastName,
            e2.id AS updatedByEmployeeId,
            e2.fname AS updatedByFirstName,
            e2.lname AS updatedByLastName,
            p.name AS projectName
            FROM $this->table r
            LEFT JOIN employees e1 ON r.createdBy = e1.id
            LEFT JOIN projects p ON r.projectId = p.id
            LEFT JOIN employees e2 ON r.updatedBy = e2.id";

            $stmt = $this->conn->prepare($query);
            $stmt->execute();

            return $stmt;
        } catch (PDOException $e) {
            return false; // Return a failure indicator if an error occurred.
        }
    }
}
