<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    session_start();
    $data = json_decode(file_get_contents('php://input'), true);

    if (!empty($data["username"]) && !empty($data["password"]))
    {
        $db_settings = 
        [
            "address"=>"localhost",
            "username"=>"root",
            "password"=>"",
            "name"=>"bar",
        ];

        $ciao = "ciao";
        
        try 
        {
            error_reporting(E_ERROR | E_PARSE);
            $con = mysqli_connect($db_settings["address"], $db_settings["username"], $db_settings["password"], $db_settings["name"]);

            $query = "SELECT * FROM users WHERE username = '" . $data["username"] . "'";

            if (!$con)
            {
                echo json_encode(["status"=>"server"]);
                return;
            }

            $result = mysqli_query($con, $query);

            $n_rows = mysqli_num_rows($result);

            if ($n_rows > 0)
            {
                for ($i = 0; $i < $n_rows; $i++)
                {
                    $row = mysqli_fetch_assoc($result);
                    if (checkIdentity($row, $data)) 
                    {
                        if ($row["ownership"] == "sell") echo json_encode(["status"=>"sell", "token"=>$row["authtoken"], "loggedas"=>$row["loggedas"], "uid"=>$row["uid"]]);
                        // header("Location: ../venditore");
                        else echo json_encode(["status"=>"buy", "token"=>$row["authtoken"], "loggedas"=>$row["loggedas"], "uid"=>$row["uid"]]);

                        return;
                        //  header("Location: ../menu");
                    }
                }

                echo json_encode(["status"=>null]);
            }
            else echo json_encode(["status"=>null]);

            mysqli_close($con);

        } 
        catch (mysqli_sql_exception) { echo json_encode(["status"=>"server"]); }
    }
    else echo json_encode(["status"=>"fields"]);

}

function checkIdentity(array $row, array $credentials): bool
{
    return $row["username"] == $credentials["username"] && password_verify($credentials["password"], $row["password"]);
}
?>