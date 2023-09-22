<?php
header("Access-Control-Allow-Origin: *");

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

    $result = mysqli_query($con, "SELECT * FROM products");

    if (mysqli_num_rows($result) == 0)
    {
        echo json_encode([]);
        return;
    }

    $data = [];

    while ($product = mysqli_fetch_assoc($result)) $data[] = $product;

    echo json_encode($data);

    mysqli_close($con);
}
catch (mysqli_sql_exception)
{
    echo json_encode(null);
}

?>