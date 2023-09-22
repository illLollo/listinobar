<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
        $data = json_decode(file_get_contents("php://input", true), true);
        
        if (!isset($data))
        {
            echo json_encode(false);
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

            mysqli_query($con, "UPDATE products SET name = '" . $data["name"] . "', cost = " . $data["cost"] . " WHERE productid = " . $data["productid"]);

            echo json_encode(true);

            mysqli_close($con);

        }
        catch (mysqli_sql_exception)
        {
            echo json_encode(false);
        }

    }

?>