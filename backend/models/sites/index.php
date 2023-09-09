<?php
include_once "../../config/Config.php";


class Sites
{
    // DB STUFF HERE 

    private $conn;
    private $table = 'sites';

    // UserClass properties
    public $id;
    public $name;
    public $location;
    public $description;


    // initialize a constructor to map with connection 

    public function __construct($db)
    {
        $this->conn = $db;
    }


    public function create($data)
    {
        try {
            // set the PDO error mode to exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Check if a record with the same name already exists
            $stmt = $this->conn->prepare("SELECT COUNT(*) FROM $this->table WHERE name = :name");
            $stmt->bindParam(':name', $data["name"]);
            $stmt->execute();
            $count = $stmt->fetchColumn();

            if ($count > 0) {
                // A record with the same name already exists, return false
                return false;
            }

            // No record with the same name exists, proceed with insertion
            $insertStmt = $this->conn->prepare("INSERT INTO $this->table (name, location, description) 
                            VALUES (:name, :location, :description)");
            $insertStmt->execute([
                "name" => $data["name"],
                "location" => $data["location"],
                "description" => $data["description"]
            ]);

            return true; // Return a success indicator if the insert was successful.
        } catch (PDOException $e) {
            // Handle any database errors here.
            return false; // Return a failure indicator if an error occurred.
        }
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
        $query = "SELECT  id, name,location, description FROM {$this->table}";
        //    prepare statements 
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }
    public function delete($id)
{
    try {
        // set the PDO error mode to exception
        $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Delete the record based on the provided id
        $deleteStmt = $this->conn->prepare("DELETE FROM $this->table WHERE id = :id");
        $deleteStmt->bindParam(':id', $id, PDO::PARAM_INT);
        $deleteStmt->execute();

        // Check if any rows were affected by the delete operation
        if ($deleteStmt->rowCount() > 0) {
            return true; // Return true if the delete was successful.
        } else {
            return false; // Return false if no rows were affected (record not found).
        }
    } catch (PDOException $e) {
        // Handle any database errors here.
        return false; // Return false if an error occurred.
    }
}

}
