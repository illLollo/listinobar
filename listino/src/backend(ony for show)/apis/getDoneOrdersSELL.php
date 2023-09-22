<?php
header("Access-Control-Allow-Origin: *");
    if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
        $db_settings = 
        [
            "address"=>"localhost",
            "username"=>"root",
            "password"=>"",
            "name"=>"bar",
        ];
    
        try
        {
            $con = mysqli_connect($db_settings["address"], $db_settings["username"], $db_settings["password"], $db_settings["name"]);
    
            $result = mysqli_query($con, "SELECT * FROM orders WHERE status = 'done'");
    
            if (mysqli_num_rows($result) == 0)
            {
                echo json_encode([]);
                return;
            }
    
            $datas = [];
    
            while ($row = mysqli_fetch_assoc($result)) $datas[] = $row;
    
            echo json_encode($datas);
    
            mysqli_close($con);
    
        }
        catch (mysqli_sql_exception)
        {
            echo json_encode(null);
        } 
    }
?>