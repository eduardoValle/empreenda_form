<?php
/**
 * Created by PhpStorm.
 * User: Luiz Eduardo
 * Date: 10/05/2017
 * Time: 19:32
 */

require_once('../../../../../wp-config.php');

$host = DB_HOST;
$dataBase = DB_NAME;

$array = json_decode(filter_input(INPUT_POST, 'log_error', FILTER_DEFAULT));
//print_r($array);

$response = new stdClass;
$response->type = 'insert database';

try {
    $dbh = new PDO("mysql:dbname=$dataBase;host=$host", DB_USER, DB_PASSWORD, array(PDO::ATTR_PERSISTENT => true));
    //echo "Connected\n";
} catch (Exception $e) {
    $response->type = 'error database';
    $response->message = $e->getMessage();
    print_r(json_encode($response));
    return;
}

try {
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sth = $dbh->prepare('insert into eea_log (nome_coordenador, error_type, error_message)
                                    values (:nome_coordenador, :error_type, :error_message)');

    $sth->bindParam(':nome_coordenador', $array->coordenador, PDO::PARAM_STR);
//    $sth->bindParam(':dados', json_encode($array->dados), PDO::PARAM_STR);
    $sth->bindParam(':error_type', $array->error->type, PDO::PARAM_STR);
    $sth->bindParam(':error_message', $array->error->message, PDO::PARAM_STR);
    $sth->execute();

    $response->type = 'success';
    print_r(json_encode($response));

} catch (Exception $e) {
    $response->message = $e->getMessage();
    print_r(json_encode($response));
}