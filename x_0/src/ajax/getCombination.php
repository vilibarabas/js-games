<?php

$combs = file_get_contents("../store/combs.json");
$combs = json_decode($combs);
$comb_key = $_POST['comb_key'];
$player_index = $_POST['player_index'];


if(!$comb_key) {

  $gata = 1;
  $round = 0;
  while(1)  {
    $round++;
    $rand = rand(1, count((array)$combs));

    $i = 1;
    foreach($combs as $key => $val) {
      if($i == $rand) {
        $comb = $val;
        if($round > 10) $gata = 1;
        break;
      }
      $i++;
    }

    if($comb->{'winner'} == $player_index) {
      $gata = 1;
    }

    if($gata) {
      print_r(json_encode($comb));
      return;
    }
  }
}




foreach($combs as $key => $val) {
  if(preg_match("~^(" . str_replace(['_', '|'], ['\\_', '\\|'], $comb_key). ")~ims", $key, $mat)) {
    print_r(json_encode($val));
    break;
  }
}

