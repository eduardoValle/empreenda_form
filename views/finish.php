<?php

$json = file_get_contents('php://input');
print_r( json_decode($json, true) );