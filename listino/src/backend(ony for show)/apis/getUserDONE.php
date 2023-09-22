<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

    if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data))
        {
            echo json_encode(null);
            return;
        }

        $db_settings = 
        [
            "address"=>"localhost",
            "username"=>"root",
            "password"=>"",
            "name"=>"bar",
        ];

        try 
        {
            error_reporting(E_ERROR | E_PARSE);
            $con = mysqli_connect($db_settings["address"], $db_settings["username"], $db_settings["password"], $db_settings["name"]);

            if (!$con)
            {
                echo json_encode(null);
                return;
            }

            $query = "SELECT * FROM orders WHERE ownerid = {$data} AND status = 'done'";

            $result = mysqli_query($con, $query);

            if (mysqli_num_rows($result) === 0)
            {
                echo json_encode([]);
                return;
            }

            $result_array_assoc = [];

            while ($row = mysqli_fetch_assoc($result)) $result_array_assoc[] = $row;

            echo json_encode($result_array_assoc);

            mysqli_close($con);

        }
        catch (mysqli_sql_exception)
        {
            echo json_encode(null);
            return;
        }
    }   

?>