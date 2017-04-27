<?php
/**
 * Created by PhpStorm.
 * User: Luiz Eduardo
 * Date: 25/04/2017
 * Time: 10:16
 */

require_once('../../../../wp-load.php');

global $wpdb;

print var_dump($_GET);
//print var_dump($_POST);

//print_r($_FILES);

$array = json_decode(filter_input(INPUT_POST, 'signupForm', FILTER_DEFAULT));
//print_r($array);



// TABLEA eea_coordinator

$wpdb->insert('eea_coordinator',
    array(
        'name' => $array->coordenador->name,
        'cpf' => $array->coordenador->cpf,
        'address' => $array->coordenador->address,
        'email' => $array->coordenador->email,
        'phone' => $array->coordenador->phone,
        'mobile' => $array->coordenador->mobile,
        'responsible' => $array->coordenador->responsible,
        'lattes' => $array->coordenador->lattes,
        'experience' => $array->coordenador->experience,
        'external_participation' => $array->coordenador->external_participation,
        'motivation' => $array->coordenador->motivation
    )
//    array('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')
);

$id_coordinator = $wpdb->insert_id;


// TABLEA eea_members

foreach ($array->members as $value) {
    $wpdb->insert('eea_members',
        array(
            "name" => $value->name,
            "cpf" => $value->cpf,
            "email" => $value->email,
            "mobile" => $value->mobile,
            "functions" => $value->functions,
            "lattes" => $value->lattes,
            "id_coordenador" => $id_coordinator
        )
//        array('%s', '%s', '%s', '%s', '%s', '%s', '&i')
    );
}

// TABLEA eea_participation

$wpdb->insert('eea_participation',
    array(
        "dissemination_plan" => $array->coordenador->disseminationPlan,
        "id_coordenador" => $id_coordinator
    )
//    array('%s', '&i')
);

$id_participation = $wpdb->insert_id;

// TABLEA eea_financial_resources

foreach ($array->financial_resources as $value) {
    $wpdb->insert('eea_financial_resources',
        array(
            "own_resource" => $value->own_resource,
            "name" => $value->name,
            "partner_features" => $value->partner_features,
            "address" => $value->address,
            "cnpj" => $value->cnpj,
            "contact_person" => $value->contact_person,
            "detailing" => $value->detailing,
            "id_participation" => $id_participation
        )
//        array('%s', '%s', '%s', '%s', '%s', '%s', '%s', '&i')
    );
}

// TABLEA eea_host_institutions

$wpdb->insert('eea_host_institutions',
    array(
        "name" => $array->host_institutions->name,
        "address" => $array->host_institutions->address,
        "identification" => $array->host_institutions->identification,
        "maximum_capacity" => $array->host_institutions->maximum_capacity,
        "optional_features" => $array->host_institutions->optional_features,
        "id_participation" => $id_participation
    )
//    array('%s', '%s', '%s', '%s', '%s', '&i')
);

$id_host_institutions = $wpdb->insert_id;

// TABLEA eea_others_features

foreach ($array->others_features as $value) {
    $wpdb->insert('eea_others_features',
        array(
            "name" => $value->name,
            "id_host_institutions" => $id_host_institutions
        )
//            array('%s', '&i')
    );
}

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
echo "DEU!!";