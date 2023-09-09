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
                $projectId = $record["projectId"];
                $employeeId = $record["employeeId"];
                $status = $record["status"];

                // Assuming 'time' is a date column in the database
                $time = date('Y-m-d'); // Use the current date as 'time'
                $timestamp = time(); // Replace with your actual timestamp or date value

                // Format the date as a full date with time (e.g., "2023-09-09 14:30:00")
                $formattedDate = date('Y-m-d H:i:s', $timestamp); // Use the current date as 'time'

                if (!$this->attendanceExists($projectId, $employeeId, $time)) {
                    // No record with the same projectId, employeeId, and time exists, proceed with insertion
                    $insertStmt = $this->conn->prepare("INSERT INTO $this->table (projectId, employeeId, time, status) 
                            VALUES (:projectId, :employeeId, :time, :status)");
                    $insertStmt->bindParam(':projectId', $projectId);
                    $insertStmt->bindParam(':employeeId', $employeeId);
                    $insertStmt->bindParam(':time', $formattedDate);
                    $insertStmt->bindParam(':status', $status);
                    $insertStmt->execute();
                } else {
                    // A record with the same projectId, employeeId, and time already exists, throw an error
                    throw new Exception("Attendance record for employeeId $employeeId on projectId $projectId for date $time already exists.");
                }
            }

            return true; // Return a success indicator if all insertions were successful.
        } catch (PDOException $e) {
            // Handle any database errors here.
            return false; // Return a failure indicator if an error occurred.
        }
    }

    // Function to check if an attendance record already exists
    private function attendanceExists($projectId, $employeeId, $time)
    {
        $stmt = $this->conn->prepare("SELECT COUNT(*) FROM $this->table WHERE projectId = :projectId AND employeeId = :employeeId AND time = :time");
        $stmt->bindParam(':projectId', $projectId);
        $stmt->bindParam(':employeeId', $employeeId);
        $stmt->bindParam(':time', $time);
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
               a.id AS attendanceId,
               a.projectId AS projectId,
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
               p.name AS projectName,
               s.name AS siteName,
               s.location AS siteLocation
               FROM $this->table a
               JOIN employees e ON a.employeeId = e.id
               JOIN projects p ON a.projectId = p.id
               JOIN sites s ON p.siteId = s.id";

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
