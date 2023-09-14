<?php
include_once "../../config/Config.php";


class Employees
{
    // DB STUFF HERE 

    private $conn;
    private $table = 'employees';

    // UserClass properties
    public $id;
    public $fname;
    public $lname;
    public $idnumber;
    public $phonenumber;
    public $age;
    public $salary;
    public $gender;
    public $siteId;
    public $role;
    public $startdate;
    public $dob;
    public $emfname;
    public $emlname;
    public $emphone;
    public $emrelation;
    public $doclink;
    public $username;
    public $password;


    // initialize a constructor to map with connection 

    public function __construct($db)
    {
        $this->conn = $db;
    }
    public function login($username, $password)
    {
        try {
            // Set the PDO error mode to exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // SQL query to retrieve user data based on username and password
            $query = "SELECT employees.*, sites.name AS site_name, sites.location AS site_location, sites.description AS site_description
            FROM " . $this->table . "
            LEFT JOIN sites ON employees.siteId = sites.id
            WHERE employees.role != 'employee'
                      AND username = :username AND password = :password";

            // Prepare the query
            $stmt = $this->conn->prepare($query);

            // Bind parameters
            $stmt->bindParam(':username', $username);
            $stmt->bindParam(':password', $password);

            // Execute the query
            $stmt->execute();

            // Fetch and return the result
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            // Handle any database errors here.
            return null; // Return null if an error occurred.
        }
    }

    public function create($data)
    {
        try {
            // set the PDO error mode to exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Check if a record with the same name already exists
            $stmt = $this->conn->prepare("SELECT COUNT(*) FROM $this->table WHERE idnumber = :idnumber");
            $stmt->bindParam(':idnumber', $data["idnumber"]);
            $stmt->execute();
            $count = $stmt->fetchColumn();

            if ($count > 0) {
                // A record with the same name already exists, return false
                return false;
            }

            // No record with the same name exists, proceed with insertion
            $insertStmt = $this->conn->prepare("INSERT INTO $this->table (fname, lname, idnumber, phonenumber, age, salary, gender, siteId, role, startdate, dob, emfname, emlname, emphone, emrelation, doclink,username) 
                            VALUES (:fname, :lname, :idnumber, :phonenumber, :age, :salary, :gender, :siteId, :role, :startdate, :dob, :emfname, :emlname, :emphone, :emrelation, :doclink,:username)");

            $insertSuccess = $insertStmt->execute([
                "fname" => $data["fname"],
                "lname" => $data["lname"],
                "idnumber" => $data["idnumber"],
                "phonenumber" => $data["phonenumber"],
                "age" => $data["age"],
                "salary" => $data["salary"],
                "gender" => $data["gender"],
                "siteId" => $data["siteId"],
                "role" => $data["role"],
                "startdate" => $data["startdate"],
                "dob" => $data["dob"],
                "emfname" => $data["emfname"],
                "emlname" => $data["emlname"],
                "emphone" => $data["emphone"],
                "emrelation" => $data["emrelation"],
                "doclink" => $data["doclink"],
                "username" => $data["username"],
            ]);

            if ($insertSuccess) {
                // INSERT query executed successfully, send the SMS
                $username = $data['username'];
                $phone = $data["phonenumber"];
                $name = $data["fname"];
                $message = "Hello $name  please  use $username as your username and your password is 12345";

                $curl = curl_init();

                curl_setopt_array($curl, array(
                    CURLOPT_URL => 'https://api.mista.io/sms',
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_ENCODING => '',
                    CURLOPT_MAXREDIRS => 10,
                    CURLOPT_TIMEOUT => 0,
                    CURLOPT_FOLLOWLOCATION => true,
                    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                    CURLOPT_CUSTOMREQUEST => 'POST',
                    CURLOPT_POSTFIELDS => array('to' => '+25' . $phone, 'from' => 'NPD', 'unicode' => '0', 'sms' => $message, 'action' => 'send-sms'),
                    CURLOPT_HTTPHEADER => array(
                        'x-api-key: 343|RfDs6xOVy1XwL7Effx2sUB4cE6XSpIlXeQLRI9kA'
                    ),
                ));

                $response = curl_exec($curl);
                $err = curl_error($curl);
                curl_close($curl);

                if ($err) {
                    $response = array(
                        "status" => "error",
                        "error" => true,
                        "success" => false,
                        "message" => "$phone is not registered, or network issue?"
                    );
                    echo json_encode($response);
                }

                return true; // Return a success indicator if the insert and SMS send were successful.
            } else {
                return false; // Return a failure indicator if the insert query failed.
            }
        } catch (PDOException $e) {
            // Handle any database errors here.
            return false; // Return a failure indicator if an error occurred.
        }
    }

    // Update function in Employees class
    public function update($data)
    {
        try {
            // Set the PDO error mode to exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Check if the record to be updated exists
            $checkStmt = $this->conn->prepare("SELECT COUNT(*) FROM " . $this->table . " WHERE id = :id");
            $checkStmt->bindParam(':id', $data["id"]);
            $checkStmt->execute();
            $count = $checkStmt->fetchColumn();

            if ($count === 0) {
                // The record with the specified ID does not exist, return false
                return false;
            }

            // Proceed with the update
            $updateStmt = $this->conn->prepare("UPDATE " . $this->table . " SET
            fname = :fname,
            lname = :lname,
            idnumber = :idnumber,
            phonenumber = :phonenumber,
            age = :age,
            salary = :salary,
            gender = :gender,
            siteId = :siteId,
            role = :role,
            startdate = :startdate,
            dob = :dob,
            emfname = :emfname,
            emlname = :emlname,
            emphone = :emphone,
            emrelation = :emrelation,
            doclink = :doclink,
            username=:username,
            password=:password
            WHERE id = :id");

            $updateStmt->execute([
                "fname" => $data["fname"],
                "lname" => $data["lname"],
                "idnumber" => $data["idnumber"],
                "phonenumber" => $data["phonenumber"],
                "age" => $data["age"],
                "salary" => $data["salary"],
                "gender" => $data["gender"],
                "siteId" => $data["siteId"],
                "role" => $data["role"],
                "startdate" => $data["startdate"],
                "dob" => $data["dob"],
                "emfname" => $data["emfname"],
                "emlname" => $data["emlname"],
                "emphone" => $data["emphone"],
                "emrelation" => $data["emrelation"],
                "doclink" => $data["doclink"],
                "id" => $data["id"],
                "username" => $data["username"],
                "password" => $data["password"]
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
            // Set the PDO error mode to exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Define the SQL query with a JOIN statement
            $query = "SELECT employees.*, sites.name AS site_name, sites.location AS site_location, sites.description AS site_description
            FROM " . $this->table . "
            LEFT JOIN sites ON employees.siteId = sites.id
            WHERE employees.role != 'super'";


            // Prepare and execute the query
            $stmt = $this->conn->prepare($query);
            $stmt->execute();

            return $stmt;
        } catch (PDOException $e) {
            // Handle any database errors here.
            return false;
        }
    }

    public function readByOther()
    {
        try {
            // Set the PDO error mode to exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // SQL query to retrieve user data based on username and password
            $query = "SELECT employees.*, sites.name AS site_name, sites.location AS site_location, sites.description AS site_description
                      FROM " . $this->table . "
                      LEFT JOIN sites ON employees.siteId = sites.id
                      WHERE employees.role IN ('employee', 'capita', 'sitemanager')";

            // Prepare the query
            $stmt = $this->conn->prepare($query);

            // Execute the query
            $stmt->execute();

            // Fetch and return all results as an array
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            // Handle any database errors here.
            return null; // Return null if an error occurred.
        }
    }


    // Delete function in Employees class
    public function delete($id)
    {
        try {
            // Set the PDO error mode to exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Check if the record to be deleted exists
            $checkStmt = $this->conn->prepare("SELECT COUNT(*) FROM " . $this->table . " WHERE id = :id");
            $checkStmt->bindParam(':id', $id);
            $checkStmt->execute();
            $count = $checkStmt->fetchColumn();

            if ($count === 0) {
                // The record with the specified ID does not exist, return false
                return false;
            }

            // Proceed with the delete
            $deleteStmt = $this->conn->prepare("DELETE FROM " . $this->table . " WHERE id = :id");
            $deleteStmt->bindParam(':id', $id);
            $deleteStmt->execute();

            return true; // Return a success indicator if the delete was successful.
        } catch (PDOException $e) {
            // Handle any database errors here.
            return false; // Return a failure indicator if an error occurred.
        }
    }

    // Read employees by role function in Employees class
    public function readByRole($role)
    {
        try {
            // Set the PDO error mode to exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Prepare SQL statement to retrieve employees by role
            $stmt = $this->conn->prepare("SELECT * FROM " . $this->table . " WHERE role = :role");
            $stmt->bindParam(':role', $role);
            $stmt->execute();

            return $stmt; // Return the result set
        } catch (PDOException $e) {
            // Handle any database errors here.
            return null; // Return null if an error occurred.
        }
    }
}
