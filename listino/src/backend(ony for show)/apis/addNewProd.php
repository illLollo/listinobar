<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
    if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
        $data = json_decode(file_get_contents("php://input", true), true);

        if (!isset($data))
        {
            echo json_encode(null);
            return;
        }

        try
        {
            $db_settings = 
            [
                "address"=>"localhost",
                "username"=>"root",
                "password"=>"",
                "name"=>"bar",
            ];

            $con = mysqli_connect($db_settings["address"], $db_settings["username"], $db_settings["password"], $db_settings["name"]);

            $result = mysqli_query($con, "SELECT * FROM products WHERE name = '" . $data["name"] . "'");

            if (mysqli_num_rows($result) > 0)
            {
                echo json_encode(false);
                mysqli_close($con);
                return;
            }

            mysqli_query($con, "INSERT INTO products (name, cost) VALUES ('" . $data["name"] . "', " . $data["cost"] . ")");

            echo json_encode(true);

            mysqli_close($con);

        }
        catch (mysqli_sql_exception)
        {
            echo json_encode(null);
        }
    }


?>