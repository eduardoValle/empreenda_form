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


/** DADDOS PARA O UPLOAD DO ARQUIVO */

$uploaddir = ABSPATH.'wp-content/plugins/empreenda_form/eea_files/';
$uploaddir = str_replace('\\', '/', $uploaddir);

$namefile = strtolower(basename($_FILES['term_appointment']['name']));
$namefile = str_replace(' ', '-', $namefile);



/** CONECTANDO COM O BANCO DE DADOS */

$host = DB_HOST;
$dataBase = DB_NAME;
$array = json_decode(filter_input(INPUT_POST, 'signupForm', FILTER_DEFAULT));
//print_r($array);

try {
    $dbh = new PDO("mysql:dbname=$dataBase;host=$host", DB_USER, DB_PASSWORD, array(PDO::ATTR_PERSISTENT => true));
    //echo "Connected\n";
} catch (Exception $e) {
    echo "error database\n";
    die("Não foi possível conectar ao banco de dados: " . $e->getMessage());
}


/** EFETUANDO O CADASTRO NO BANCO DE DADOS E FAZENDO O UPLOAD DO ARQUIVO */

try {
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $dbh->beginTransaction();


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

    /** DADOS PARA FAZER O UPLOAD MAIS TARDE */
    $namefile = $id_coordinator . '-' . $namefile;
    $uploadfile = $uploaddir . $namefile;


    // TABLEA eea_members

    foreach ($array->members as $value) {
        $sth = $dbh->prepare('insert into eea_members
            (name, cpf, email, mobile, lattes, id_coordenador)
            values (:name, :cpf, :email, :mobile, :lattes, :id_coordenador)');
        $sth->bindParam(':name', $value->name, PDO::PARAM_STR);
        $sth->bindParam(':cpf', $value->cpf, PDO::PARAM_STR);
        $sth->bindParam(':email', $value->email, PDO::PARAM_STR);
        $sth->bindParam(':mobile', $value->mobile, PDO::PARAM_STR);
        $sth->bindParam(':lattes', $value->lattes, PDO::PARAM_STR);
        $sth->bindParam(':id_coordenador', intval($id_coordinator), PDO::PARAM_INT);
        $sth->execute();

        $id_member = $dbh->lastInsertId();

        // TABLEA eea_function

        foreach ($value->functions as $val) {

            $sth = $dbh->prepare('insert into eea_functions (function, id_member) values (:function, :id_member)');

            $sth->bindParam(':function', $val->function, PDO::PARAM_STR);
            $sth->bindParam(':id_member', $id_member, PDO::PARAM_INT);
            $sth->execute();
        }
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


    /** INSTITUIÇÕES */


    // TABLEA eea_institution

    foreach ($array->instituicao as $value) {
        $sth = $dbh->prepare('insert into eea_institution
            (name, cnpj, address, email, phone, responsible, phone_responsible, past_participations,
                term_appointment, proposal, partnerships_historic, partnerships_between_institutions,
                partnerships_between_campus, partnerships_for_pea, id_coordinator)
            values (:name, :cnpj, :address, :email, :phone, :responsible, :phone_responsible, :past_participations,
                :term_appointment, :proposal, :partnerships_historic, :partnerships_between_institutions,
                :partnerships_between_campus, :partnerships_for_pea, :id_coordinator)');

        $sth->bindParam(':name', $value->name, PDO::PARAM_STR);
        $sth->bindParam(':cnpj', $value->cnpj, PDO::PARAM_STR);
        $sth->bindParam(':address', $value->address, PDO::PARAM_STR);
        $sth->bindParam(':email', $value->email, PDO::PARAM_STR);
        $sth->bindParam(':phone', $value->phone, PDO::PARAM_STR);
        $sth->bindParam(':responsible', $value->responsible, PDO::PARAM_STR);
        $sth->bindParam(':phone_responsible', $value->phone_responsible, PDO::PARAM_STR);
        $sth->bindParam(':past_participations', $value->past_participations, PDO::PARAM_STR);
        $sth->bindParam(':term_appointment', $uploadfile, PDO::PARAM_STR);
        $sth->bindParam(':proposal', $value->proposal, PDO::PARAM_STR);
        $sth->bindParam(':partnerships_historic', $value->partnerships_historic, PDO::PARAM_STR);
        $sth->bindParam(':partnerships_between_institutions', $value->partnerships_between_institutions, PDO::PARAM_STR);
        $sth->bindParam(':partnerships_between_campus', $value->partnerships_between_campus, PDO::PARAM_STR);
        $sth->bindParam(':partnerships_for_pea', $value->partnerships_for_pea, PDO::PARAM_INT);
        $sth->bindParam(':id_coordinator', $id_coordinator, PDO::PARAM_INT);
        $sth->execute();

        $id_institution = $dbh->lastInsertId();


        // TABLEA eea_discipline

        foreach ($value->discipline as $val) {
            $sth = $dbh->prepare('insert into eea_discipline
                (name, optional, code_discipline, teacher, n_students, id_institution)
                values (:name, :optional, :code_discipline, :teacher, :n_students, :id_institution)');

            $sth->bindParam(':name', $val->name, PDO::PARAM_STR);
            $sth->bindParam(':optional', $val->optional, PDO::PARAM_STR);
            $sth->bindParam(':code_discipline', $val->code_discipline, PDO::PARAM_STR);
            $sth->bindParam(':teacher', $val->teacher, PDO::PARAM_STR);
            $sth->bindParam(':n_students', $val->n_students, PDO::PARAM_STR);
            $sth->bindParam(':id_institution', $id_institution, PDO::PARAM_INT);
            $sth->execute();
        }
    }


    /** UPLOAD DO ARQUIVO */

    if($_FILES['term_appointment']['size'] > 32000000){ // Se o arquivo for maior que 32Mb
        //erro de tamanho de arquivo
        echo "upload size error";
        throw new Exception("Arquivo grande demais para fazer upload!\n");
//        die("upload size error" . $e->getMessage());
    }

    if(!file_exists($uploaddir)){
        mkdir($uploaddir, 0777, true);
    }

    if(!move_uploaded_file($_FILES['term_appointment']['tmp_name'], $uploadfile)) {
        echo "upload error";
        throw new Exception("Não foi possível realizar o upload desse arquivo!\n");
    }


    $dbh->commit();

    echo 'success';

} catch (Exception $e) {
    $dbh->rollBack();
    echo "insert database";
    //echo "Failed: " . $e->getMessage();
}