<?php
header('Access-Control-Allow-Origin: *');
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


            $query = "SELECT * FROM users WHERE authtoken = '" . $data["token"] . "' LIMIT 1";

        
            $result = mysqli_query($con, $query);
        
            if (mysqli_num_rows($result) > 0)
            {
                $row = mysqli_fetch_assoc($result);
        
                if ($row["authtoken"] == $data["token"] && $row["ownership"] == $data["perms"]) echo json_encode(["status"=>"true"]);
                else echo json_encode(["status"=>"false"]);
            }
            else echo json_encode(["status"=>null]);
        
        
            mysqli_close($con);

        }
        catch (mysqli_sql_exception)
        {
            echo json_encode(["status"=>"err"]);
        }

    }

?>