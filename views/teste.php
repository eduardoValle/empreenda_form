<?php
/**
 * Created by PhpStorm.
 * User: Luiz Eduardo
 * Date: 24/04/2017
 * Time: 18:18
 */

$signupForm =  json_decode($_POST['signupForm'], true);
$file = $_FILES['termAppointment'];
print_r( $signupForm  );
print_r( $file );
die("OK");