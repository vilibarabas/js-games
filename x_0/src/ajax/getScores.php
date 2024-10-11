<?php

$combs = file_get_contents("../store/combs.json");
$combs = json_decode($combs);

print_r(json_encode($combs));
