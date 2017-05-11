<?php
/**
 * Created by PhpStorm.
 * User: Luiz Eduardo
 * Date: 09/05/2017
 * Time: 13:04
 */

require_once('../../../../wp-config.php');

$host = DB_HOST;
$dataBase = DB_NAME;

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

    $select = $dbh->query('SELECT eea_coordinator.id_coordenador, eea_coordinator.`name`, eea_coordinator.mobile,
                                    eea_coordinator.email, eea_institution.`name` as institution FROM eea_coordinator
                                    INNER JOIN eea_institution ON eea_coordinator.id_coordenador = eea_institution.id_coordinator');
    $result = $select->fetchAll(PDO::FETCH_ASSOC);
    print_r(json_encode($result));

} catch (Exception $e) {
    $response->type = 'Problemas ao recuperar dados do coordenador!!';
    $response->message = $e->getMessage();
    print_r(json_encode($response));
//    die("Não foi possível recuperar os dados: " . $e->getMessage());
    return;
}