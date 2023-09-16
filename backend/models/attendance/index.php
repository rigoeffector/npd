<?php
include_once "../../config/Config.php";


class Attendance
{
    // DB STUFF HERE 

    private $conn;
    private $table = 'attendance';

    // UserClass properties
    public $id;
    public $projectId;
    public $employeeId;
    public $time;



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
    
            foreach ($data as $record) {
                $siteId = $record["siteId"];
                $employeeId = $record["employeeId"];
                $status = $record["status"];
    
                // Check if 'time' is present in the $record, otherwise use the default timestamp
                $currentTime = isset($record["time"]) ? $record["time"] : date('Y-m-d H:i:s');
    
                // Check if attendance already exists for the same siteId, employeeId, and date
                if (!$this->attendanceExists($siteId, $employeeId, date('Y-m-d', strtotime($currentTime)))) {
                    // No record with the same siteId, employeeId, and date exists, proceed with insertion
                    $insertStmt = $this->conn->prepare("INSERT INTO $this->table (siteId, employeeId, status, time) 
                            VALUES (:siteId, :employeeId, :status, :time)");
                    $insertStmt->bindParam(':siteId', $siteId);
                    $insertStmt->bindParam(':employeeId', $employeeId);
                    $insertStmt->bindParam(':status', $status);
                    $insertStmt->bindParam(':time', $currentTime);
                    $insertStmt->execute();
                } else {
                    // A record with the same siteId, employeeId, and date already exists, throw an error
                    throw new Exception("Attendance record for employeeId $employeeId on site $siteId for the given date already exists.");
                }
            }
    
            return true; // Return a success indicator if all insertions were successful.
        } catch (PDOException $e) {
            // Handle any database errors here.
            return false; // Return a failure indicator if an error occurred.
        }
    }
    

    

    
    // Function to check if an attendance record already exists
    // Function to check if an attendance record already exists
// Function to check if an attendance record with the same siteId, employeeId, and timestamp already exists
// Function to check if an attendance record with the same siteId, employeeId, and date already exists
// Function to check if an attendance record with the same siteId, employeeId, and date already exists
private function attendanceExists($siteId, $employeeId, $date)
{
    // Extract the date part from the 'time' column in the database
    $stmt = $this->conn->prepare("SELECT COUNT(*) FROM $this->table WHERE siteId = :siteId AND employeeId = :employeeId AND DATE(time) = :date");
    $stmt->bindParam(':siteId', $siteId);
    $stmt->bindParam(':employeeId', $employeeId);
    $stmt->bindParam(':date', $date);
    $stmt->execute();
    $count = $stmt->fetchColumn();

    return ($count !== false && $count > 0);
}




    
    




    // Modify the update function in the Projects class
    public function update($data)
    {
        try {
            // Set the PDO error mode to exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $attendanceId = $data["id"];
            $status = $data["status"];

            // Format the date as a full date with time (e.g., "2023-09-09 14:30:00")
            $formattedDate = date('Y-m-d H:i:s'); // Use the current date and time

            // Check if the attendance record with the given ID exists
            if ($this->attendanceExistsById($attendanceId)) {
                // Update the attendance record with the specified ID
                $updateStmt = $this->conn->prepare("UPDATE $this->table SET 
                    time = :time,
                    status = :status
                    WHERE id = :id");

                $updateStmt->bindParam(':id', $attendanceId);
                $updateStmt->bindParam(':time', $formattedDate);
                $updateStmt->bindParam(':status', $status);
                $updateStmt->execute();

                return true; // Return a success indicator if the update was successful.
            } else {
                // The attendance record with the specified ID was not found, return false
                return false;
            }
        } catch (PDOException $e) {
            // Handle any database errors here.
            return false; // Return a failure indicator if an error occurred.
        }
    }

    // Function to check if an attendance record already exists by ID
    private function attendanceExistsById($attendanceId)
    {
        $stmt = $this->conn->prepare("SELECT COUNT(*) FROM $this->table WHERE id = :id");
        $stmt->bindParam(':id', $attendanceId);
        $stmt->execute();
        $count = $stmt->fetchColumn();

        return ($count !== false && $count > 0);
    }



    // Modify the readAll function in the Projects class
    public function readAll()
    {
        try {
            $query = "SELECT 
               a.id,
            
               a.employeeId AS employeeId,
               a.time AS attendanceTime,
               a.status AS attendanceStatus,
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
               s.name AS siteName,
               s.location AS siteLocation
               FROM $this->table a
               JOIN employees e ON a.employeeId = e.id
               JOIN sites s ON a.siteId = s.id";

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

            // Check if the attendance record with the given ID exists
            if (!$this->attendanceExistsTodel($id)) {
                // The attendance record with the specified ID does not exist, return false
                return false;
            }

            // Delete the attendance record
            $deleteStmt = $this->conn->prepare("DELETE FROM $this->table WHERE id = :id");
            $deleteStmt->bindParam(':id', $id);
            $deleteStmt->execute();

            return true; // Return a success indicator if the deletion was successful.
        } catch (PDOException $e) {
            // Handle any database errors here.
            return false; // Return a failure indicator if an error occurred.
        }
    }

    // Function to check if an attendance record exists based on ID



    private function attendanceExistsTodel($id)
    {
        $stmt = $this->conn->prepare("SELECT COUNT(*) FROM $this->table WHERE id = :id");
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $count = $stmt->fetchColumn();

        return ($count !== false && $count > 0);
    }
}
