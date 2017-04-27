<?php
/**
 * Created by PhpStorm.
 * User: Luiz Eduardo
 * Date: 24/04/2017
 * Time: 16:43
 */


//print var_dump(filter_input(INPUT_GET, 'teste', FILTER_DEFAULT));
print var_dump($_GET);
print var_dump($_POST);

//echo 'VEIO NO PHP';
//
//$uploaddir = ABSPATH.'/wp-content/eea_files/';
//$uploadfile = $uploaddir . basename($_FILES['term_appointment']['name']);
//
//echo '<pre>';
//if (move_uploaded_file($_FILES['term_appointment']['tmp_name'], $uploadfile)) {
//    echo "Arquivo válido e enviado com sucesso.\n";
//} else {
//    echo "Possível ataque de upload de arquivo!\n";
//}
//
//echo 'Aqui está mais informações de debug:';
//print_r($_FILES);
//
//print "</pre>";


