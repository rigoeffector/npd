<?php
include_once "../../config/Config.php";


class Assign
{
    // DB STUFF HERE 

    private $conn;
    private $table = 'assign';

    // UserClass properties
    public $id;
    public $employeeId;
    public $projectId;



    // initialize a constructor to map with connection 

    public function __construct($db)
    {
        $this->conn = $db;
    }


    public function createAssign($data)
    {
        try {
            // set the PDO error mode to exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
            foreach ($data as $record) {
                $employeeId = $record["employeeId"];
                $projectId = $record["projectId"];
    
                // Check if a record with the same employeeId and projectId already exists
                if (!$this->assignExists($employeeId, $projectId)) {
                    // No record with the same employeeId and projectId exists, proceed with insertion
                    $insertStmt = $this->conn->prepare("INSERT INTO $this->table (employeeId, projectId) 
                            VALUES (:employeeId, :projectId)");
                    $insertStmt->bindParam(':employeeId', $employeeId);
                    $insertStmt->bindParam(':projectId', $projectId);
                    $insertStmt->execute();
                } else {
                    // A record with the same employeeId and projectId already exists, throw an error
                    throw new Exception("Assignment record for employeeId $employeeId and projectId $projectId already exists.");
                }
            }
    
            return true; // Return a success indicator if all insertions were successful.
        } catch (PDOException $e) {
            // Handle any database errors here.
            return false; // Return a failure indicator if an error occurred.
        }
    }
    
    // Function to check if an assignment record already exists
    private function assignExists($employeeId, $projectId)
    {
        $stmt = $this->conn->prepare("SELECT COUNT(*) FROM $this->table WHERE employeeId = :employeeId AND projectId = :projectId");
        $stmt->bindParam(':employeeId', $employeeId);
        $stmt->bindParam(':projectId', $projectId);
        $stmt->execute();
        $count = $stmt->fetchColumn();
    
        return ($count !== false && $count > 0);
    }
    
    public function update($id, $data)
    {
        try {
            // set the PDO error mode to exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Proceed with the update
            $updateStmt = $this->conn->prepare("UPDATE $this->table SET name = :name, location = :location, description = :description WHERE id = :id");
            $updateStmt->execute([
                "id" => $id,
                "name" => $data["name"],
                "location" => $data["location"],
                "description" => $data["description"]
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
                a.id AS assignmentId,
                e.id AS employeeId,
                e.fname AS employeeFirstName,
                e.lname AS employeeLastName,
                e.idnumber AS employeeIdNumber,
                e.phonenumber AS employeePhoneNumber,
                e.age AS employeeAge,
                e.salary AS employeeSalary,
                e.gender AS employeeGender,
                e.siteId AS employeeSiteId,
                e.role AS employeeRole,
                e.startdate AS employeeStartDate,
                e.dob AS employeeDob,
                e.emfname AS emergencyFirstName,
                e.emlname AS emergencyLastName,
                e.emphone AS emergencyPhoneNumber,
                e.emrelation AS emergencyRelation,
                e.doclink AS documentLink,
                p.id AS projectId,
                p.name AS projectName,
                p.status AS projectStatus,
                p.managerId AS projectManagerId,
                p.siteId AS projectSiteId,
                p.startdate AS projectStartDate,
                p.enddate AS projectEndDate,
                p.description AS projectDescription,
                CONCAT(pm.fname, ' ', pm.lname) AS projectManagerName
                FROM assign a
                JOIN employees e ON a.employeeId = e.id
                JOIN projects p ON a.projectId = p.id
                JOIN employees pm ON p.managerId = pm.id"; // Join the employees table again to get the project manager's name
        
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
    
            return $stmt;
        } catch (PDOException $e) {
            return false; // Return a failure indicator if an error occurred.
        }
    }
    
    

    public function delete($id)
    {
        try {
            // Set the PDO error mode to exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
            // Check if the assignment record with the given ID exists
            if (!$this->assignmentExists($id)) {
                throw new Exception("Assignment record with ID $id does not exist.");
            }
    
            // Delete the assignment record
            $deleteStmt = $this->conn->prepare("DELETE FROM $this->table WHERE id = :id");
            $deleteStmt->bindParam(':id', $id);
            $deleteStmt->execute();
    
            return true; // Return a success indicator if the deletion was successful.
        } catch (PDOException $e) {
            // Handle any database errors here.
            return false; // Return a failure indicator if an error occurred.
        }
    }
    
    // Function to check if an assignment record exists
    private function assignmentExists($id)
    {
        $stmt = $this->conn->prepare("SELECT COUNT(*) FROM $this->table WHERE id = :id");
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $count = $stmt->fetchColumn();
    
        return ($count !== false && $count > 0);
    }
    

}
