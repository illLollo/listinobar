<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
    if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
        $data = json_decode(file_get_contents("php://input"), true);

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

            mysqli_query($con, "UPDATE orders SET status = 'done' WHERE orderid = {$data}");

            echo json_encode(["success"=>'true']);

        }
        catch (mysqli_sql_exception)
        {
            echo json_encode(["success"=>'false']);
        }

    }

?>