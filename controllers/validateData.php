<?php
/**
 * Created by PhpStorm.
 * User: Luiz Eduardo
 * Date: 25/04/2017
 * Time: 10:16
 */

require_once('../../../../wp-config.php');
require_once('../../../../wp-load.php');

global $wpdb;

$host = DB_HOST;
$dataBase = DB_NAME;
$array = json_decode(filter_input(INPUT_POST, 'signupForm', FILTER_DEFAULT));

try {
    $dbh = new PDO("mysql:dbname=$dataBase;host=$host", DB_USER, DB_PASSWORD, array(PDO::ATTR_PERSISTENT => true));
    echo "Connected\n";
} catch (Exception $e) {
    echo "Disconnected\n";
    die("Unable to connect: " . $e->getMessage());
}


try {
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $dbh->beginTransaction();


//    $dbh->exec("insert into staff (id, first, last) values (23, 'Joe', 'Bloggs')");
//    $dbh->exec("insert into salarychange (id, amount, changedate)
//                          values (23, 50000, NOW())");


    // TABLEA eea_coordinator

    $sth = $dbh->prepare('insert into eea_coordinator
        (name, cpf, address, email, phone, mobile, responsible, lattes, experience, external_participation, motivation)
        values (:name, :cpf, :address, :email, :phone, :mobile, :responsible, :lattes, :experience, :external_participation, :motivation)');

    $sth->bindParam(':name', $array->coordenador->name, PDO::PARAM_STR);
    $sth->bindParam(':cpf', $array->coordenador->cpf, PDO::PARAM_STR);
    $sth->bindParam(':address', $array->coordenador->address, PDO::PARAM_STR);
    $sth->bindParam(':email', $array->coordenador->email, PDO::PARAM_STR);
    $sth->bindParam(':phone', $array->coordenador->phone, PDO::PARAM_STR);
    $sth->bindParam(':mobile', $array->coordenador->mobile, PDO::PARAM_STR);
    $sth->bindParam(':responsible', $array->coordenador->responsible, PDO::PARAM_STR);
    $sth->bindParam(':lattes', $array->coordenador->lattes, PDO::PARAM_STR);
    $sth->bindParam(':experience', $array->coordenador->experience, PDO::PARAM_STR);
    $sth->bindParam(':external_participation', $array->coordenador->external_participation, PDO::PARAM_STR);
    $sth->bindParam(':motivation', $array->coordenador->motivation, PDO::PARAM_STR);
    $sth->execute();

    $id_coordinator = $dbh->lastInsertId();
    print $id_coordinator;


    // TABLEA eea_members

    foreach ($array->members as $value) {
        $sth = $dbh->prepare('insert into eea_members
            (name, cpf, email, mobile, functions, lattes, id_coordenador)
            values (:name, :cpf, :email, :mobile, :functions, :lattes, :id_coordenador)');
        $sth->bindParam(':name', $value->name, PDO::PARAM_STR);
        $sth->bindParam(':cpf', $value->cpf, PDO::PARAM_STR);
        $sth->bindParam(':email', $value->email, PDO::PARAM_STR);
        $sth->bindParam(':mobile', $value->mobile, PDO::PARAM_STR);
        $sth->bindParam(':functions', $value->functions, PDO::PARAM_STR);
        $sth->bindParam(':lattes', $value->lattes, PDO::PARAM_STR);
        $sth->bindParam(':id_coordenador', intval($id_coordinator), PDO::PARAM_INT);
        $sth->execute();
    }


    // TABLEA eea_participation

    $sth = $dbh->prepare('insert into eea_participation (dissemination_plan, id_coordenador)
        values (:dissemination_plan, :id_coordenador)');

    $sth->bindParam(':dissemination_plan', $array->coordenador->disseminationPlan, PDO::PARAM_STR);
    $sth->bindParam(':id_coordenador', $id_coordinator, PDO::PARAM_INT);
    $sth->execute();

    $id_participation = $dbh->lastInsertId();


    // TABLEA eea_financial_resources

    foreach ($array->financial_resources as $value) {
        $sth = $dbh->prepare('insert into eea_financial_resources
            (own_resource, name, partner_features, address, cnpj, contact_person, detailing, id_participation)
            values (:own_resource, :name, :partner_features, :address, :cnpj, :contact_person, :detailing, :id_participation)');

        $sth->bindParam(':own_resource', $value->own_resource, PDO::PARAM_STR);
        $sth->bindParam(':name', $value->name, PDO::PARAM_STR);
        $sth->bindParam(':partner_features', $value->partner_features, PDO::PARAM_STR);
        $sth->bindParam(':address', $value->address, PDO::PARAM_STR);
        $sth->bindParam(':cnpj', $value->cnpj, PDO::PARAM_STR);
        $sth->bindParam(':contact_person', $value->contact_person, PDO::PARAM_STR);
        $sth->bindParam(':detailing', $value->detailing, PDO::PARAM_STR);
        $sth->bindParam(':id_participation', intval($id_participation), PDO::PARAM_INT);
        $sth->execute();
    }


    // TABLEA eea_host_institutions

    $sth = $dbh->prepare('insert into eea_host_institutions
        (name, address, identification, maximum_capacity, optional_features, id_participation)
        values (:name, :address, :identification, :maximum_capacity, :optional_features, :id_participation)');

    $sth->bindParam(':name', $array->host_institutions->name, PDO::PARAM_STR);
    $sth->bindParam(':address', $array->host_institutions->address, PDO::PARAM_STR);
    $sth->bindParam(':identification', $array->host_institutions->identification, PDO::PARAM_STR);
    $sth->bindParam(':maximum_capacity', $array->host_institutions->maximum_capacity, PDO::PARAM_STR);
    $sth->bindParam(':optional_features', $array->host_institutions->optional_features, PDO::PARAM_STR);
    $sth->bindParam(':id_participation', $id_participation, PDO::PARAM_INT);
    $sth->execute();

    $id_host_institutions = $dbh->lastInsertId();


    // TABLEA eea_others_features

    foreach ($array->others_features as $value) {
        $sth = $dbh->prepare('insert into eea_others_features (name, id_host_institutions) values (:name, :id_host_institutions)');

        $sth->bindParam(':name', $value->name, PDO::PARAM_STR);
        $sth->bindParam(':id_host_institutions', $id_host_institutions, PDO::PARAM_INT);
        $sth->execute();
    }







    $dbh->commit();
    echo 'DEU!!';

} catch (Exception $e) {
    $dbh->rollBack();
    echo "Failed: " . $e->getMessage();
}


//print var_dump($_GET);
////print var_dump($_POST);
////print_r($_FILES);
//
//$array = json_decode(filter_input(INPUT_POST, 'signupForm', FILTER_DEFAULT));
////print_r($array);


//
//
//
//
//
//

// TABLEA eea_institution

//$wpdb->insert('eea_institution',
//    array(
//        "name" => $array->instituicao->name,
//        "cnpj" => $array->instituicao->cnpj,
//        "address" => $array->instituicao->address,
//        "email" => $array->instituicao->email,
//        "phone" => $array->instituicao->phone,
//        "responsible" => $array->instituicao->responsible,
//        "phone_responsible" => $array->instituicao->phone_responsible,
//        "past_participations" => $array->instituicao->past_participations,
//        "term_appointment" => $array->instituicao->term_appointment,
//        "proposal" => $array->instituicao->proposal,
//        "partnerships_historic" => $array->instituicao->partnerships_historic,
//        "partnerships_between_institutions" => $array->instituicao->partnerships_between_institutions,
//        "partnerships_between_campus" => $array->instituicao->partnerships_between_campus,
//        "partnerships_for_pea" => $array->instituicao->partnerships_for_pea
//    )
////    array('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s')
//);
//
//$id_institution = $wpdb->insert_id;
//
//// TABLEA eea_discipline
//
//foreach ($array->discipline as $value) {
//    $wpdb->insert('eea_discipline',
//        array(
//            "name" => $value->name,
//            "optional" => $value->optional,
//            "code_discipline" => $value->code_discipline,
//            "teacher" => $value->teacher,
//            "n_students" => $value->n_students,
//            "id_institution" => $id_institution
//        )
////        array('%s', '%s', '%s', '%s', '%s', '&i')
//    );
//}
//
//if ($eea_coordinator && $eea_members && $eea_participation && $eea_financial_resources && $eea_host_institutions && $eea_others_features){
//    mysql_query('COMMIT');
//    echo "DEU!!";
//} else {
//    mysql_query('ROLLBACK');
//}
