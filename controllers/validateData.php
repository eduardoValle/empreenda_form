<?php
/**
 * Created by PhpStorm.
 * User: Luiz Eduardo
 * Date: 25/04/2017
 * Time: 10:16
 */

global $wpdb;

// TABLEA eea_coordinator


$wpdb->insert('eea_coordinator',
    array(
        'name' => 'Luiz',
        'cpf' => 'Luiz',
        'address' => 'Luiz',
        'email' => 'Luiz',
        'phone' => 'Luiz',
        'mobile' => 'Luiz',
        'responsible' => 'Luiz',
        'lattes' => 'Luiz',
        'experience' => 'Luiz',
        'external_participation' => 'Luiz',
        'motivation' => 'Luiz',
        'disseminationPlan' => ''
    ),
    array('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s')
);


// TABLEA eea_members

foreach ($array as $value) {
    $wpdb->insert('eea_members',
        array(
            "name" => "1",
            "cpf" => 1,
            "email" => "11@1",
            "mobile" => 1,
            "functions" => "1",
            "lattes" => "1",
            "id_coordenador" => 1
        ),
        array('%s', '%s', '%s', '%s', '%s', '%s', '&i')
    );
}

// TABLEA eea_participation

$wpdb->insert('eea_participation',
    array(
        "disseminationPlan" => "dissemination_plan",
        "id_coordenador" => 1
    ),
    array('%s', '&i')
);

// TABLEA eea_financial_resources

foreach ($array as $value) {
    $wpdb->insert('eea_financial_resources',
        array(
            "own_resource" => "1",
            "name" => "1",
            "partner_features" => 1,
            "address" => "1",
            "cnpj" => 1,
            "contact_person" => "1",
            "detailing" => "1",
            "id_participation" => 1
        ),
        array('%s', '%s', '%s', '%s', '%s', '%s', '%s', '&i')
    );
}
// TABLEA eea_host_institutions

$wpdb->insert('eea_host_institutions',
    array(
        "name" => "1",
        "address" => "1",
        "identification" => "1",
        "maximum_capacity" => 1,
        "optional_features" => "",
        "id_participation" => 1
    ),
    array('%s', '%s', '%s', '%s', '%s', '&i')
);

// TABLEA eea_others_features

foreach ($array as $value) {
    foreach ($others_features as $value) {
        $wpdb->insert('eea_others_features',
            array(
                "name" => "1",
                "id_host_institutions" => 1
            ),
            array('%s', '&i')
        );
    }
}
// TABLEA eea_institution

$wpdb->insert('eea_institution',
    array(
        "name" => "1",
        "cnpj" => 1,
        "address" => "1",
        "email" => "1@1",
        "phone" => 1,
        "responsible" => "1",
        "phone_responsible" => 1,
        "past_participations" => "1",
        "term_appointment" => "",
        "proposal" => "1",
        "partnerships_historic" => "1",
        "partnerships_between_institutions" => "1",
        "partnerships_between_campus" => "1",
        "partnerships_for_pea" => "1"
    ),
    array('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s')
);


// TABLEA eea_discipline

foreach ($array as $value) {
    $wpdb->insert('eea_discipline',
        array(
            "name" => "1",
            "optional" => "1",
            "code_discipline" => "1",
            "teacher" => "1",
            "n_students" => 1,
            "id_institution" => 1
        ),
        array('%s', '%s', '%s', '%s', '%s', '&i')
    );
}