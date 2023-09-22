<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
    session_start();

    $data_assoc_arr = json_decode(file_get_contents("php://input"), true);

    $_SESSION["uid"] = '2';
    $_SESSION["loggedas"] = "Lollo";


    $db_setting = 
    [
        "address"=>"localhost",
        "username"=>"root",
        "password"=>"",
        "name"=>"bar",
    ];

    try
    {
        $con = mysqli_connect($db_setting["address"], $db_setting["username"], $db_setting["password"], $db_setting["name"]);

        $query = "INSERT INTO orders (details, subtot, ownerid, ownername, status) VALUES (" . $data_assoc_arr["details"] . ", " . $data_assoc_arr["subtot"] . ", " . $_SESSION["uid"] . ", '" . $_SESSION["loggedas"] . "', 'doing')";

        mysqli_query($con, $query);

        mysqli_close($con);

        echo json_encode(["status"=>"true"]);

    }
    catch (mysqli_sql_exception $e)
    {
        echo json_encode(["status"=>"false"]);
    }

?>