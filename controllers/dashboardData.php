<?php
/**
 * Created by PhpStorm.
 * User: Luiz Eduardo
 * Date: 02/05/2017
 * Time: 11:24
 */

require_once('../../../../wp-config.php');
require_once('../../../../wp-load.php');

$host = DB_HOST;
$dataBase = DB_NAME;

try {
    $dbh = new PDO("mysql:dbname=$dataBase;host=$host", DB_USER, DB_PASSWORD, array(PDO::ATTR_PERSISTENT => true));
    //echo "Connected\n";
} catch (Exception $e) {
    echo "error database\n";
    die("Não foi possível conectar ao banco de dados: " . $e->getMessage());
}

try {
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $statement = $dbh->prepare("SELECT name, mobile, email FROM eea_coordinator");
    $statement->execute();
    $results=$statement->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($results);
    echo $json;
}catch (Exception $e) {
    echo "error database\n";
    die("Não foi possível recuperar os dados: " . $e->getMessage());
}