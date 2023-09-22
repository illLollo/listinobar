<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
    if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
        $data = file_get_contents("php://input", true);

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

            mysqli_query($con, "DELETE FROM products WHERE productid = {$data} LIMIT 1");

            echo json_encode(true);

            mysqli_close($con);

        }
        catch (mysqli_sql_exception)
        {
            echo json_encode(false);
        }
    }


?>