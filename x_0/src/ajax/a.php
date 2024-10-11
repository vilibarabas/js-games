<?php

$combs = file_get_contents("../store/combs.json");
$combs = json_decode($combs);
$comb_key = '3_1|1_3|';
$player_index = 1;

foreach($combs as $key => $val) {
  if(preg_match("~^(" . str_replace(['_', '|'], ['\\_', '\\|'], $comb_key). ")~ims", $key, $mat) && $val->{'winner'} == $player_index) {
    print_r(json_encode($val));
    break;
  }
}

