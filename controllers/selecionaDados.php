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

try {
    $dbh = new PDO("mysql:dbname=$dataBase;host=$host", DB_USER, DB_PASSWORD, array(PDO::ATTR_PERSISTENT => true));
    //echo "Connected\n";
} catch (Exception $e) {
    echo "error database\n";
    die("Não foi possível conectar ao banco de dados: " . $e->getMessage());
}

try {
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $select = $dbh->query('SELECT eea_coordinator.id_coordenador, eea_coordinator.`name`, eea_coordinator.mobile,
                                    eea_coordinator.email, eea_institution.`name` as institution FROM eea_coordinator
                                    INNER JOIN eea_institution ON eea_coordinator.id_coordenador = eea_institution.id_coordinator');
    $result = $select->fetchAll(PDO::FETCH_ASSOC);
    print_r(json_encode($result));

} catch (Exception $e) {
    echo 'Problemas ao recuperar dados: ' . $e->getMessage();
}