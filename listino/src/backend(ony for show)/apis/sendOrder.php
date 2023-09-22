<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

    if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
        $data_assoc_arr = json_decode(file_get_contents("php://input"), true);

        if (!isset($data_assoc_arr))
        {
            echo json_encode(["status"=>'false']);
            return;
        }
    
        $db_setting = 
        [
            "address"=>"localhost",
            "username"=>"root",
            "password"=>"",
            "name"=>"bar",
        ];
    
        try
        {
            error_reporting(E_ERROR | E_PARSE);
            $con = mysqli_connect($db_setting["address"], $db_setting["username"], $db_setting["password"], $db_setting["name"]);
            
            if (!$con)
            {
                echo json_encode(["status"=>"false"]);
                return;
            }
    
            $query = "INSERT INTO orders (details, subtot, ownerid, ownername, status, date) VALUES (" . $data_assoc_arr["details"] . ", " . $data_assoc_arr["subtot"] . ", " . $data_assoc_arr["uid"] . ", '" . $data_assoc_arr["loggedas"] . "', 'doing', '" . $data_assoc_arr["date"] . "')";
            
            mysqli_query($con, $query);
    
            mysqli_close($con);
    
            echo json_encode(["status"=>'true']);
    
        }
        catch (mysqli_sql_exception $e)
        {
            echo json_encode(["status"=>'false']);
        }
    }


?>