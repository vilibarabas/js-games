<?php

if(isset($_POST['rez']) && checkToken($_POST['token'])) {
  $score = file_get_contents("../store/all_scores.json");
  $score = json_decode($score, true);
  $new_score = json_decode($_POST['rez']);

  foreach($new_score as $name =>  $sc) {
    if(strlen($name) > 6) {
      $name = 'anonim';
    }

    if(isset($score[$name]) && $score[$name] > $sc) {
      break;
    }

    $score[$name] = $sc;
  }

  file_put_contents ( '../store/all_scores.json', json_encode($score));
}

function checkToken($token) {
  $time = time();

  if(($time - decodeToken($token)) < 10 && ($time - decodeToken($token)) >= 0 ) {
    return true;
  }

  return false;
}

function decodeToken($token) {
  $settigns = [
    'F' => 0,
    'p' => 1,
    'G' => 2,
    'j1g' => 3,
    '9mc' => 4,
    'h' => 5,
    'K' => 6,
    'A' => 7,
    'x' => 8,
    'IDSQ' => 9,
  ];
  $key = '';
  $new_token = '';

  for($i = 0; $i < strlen($token); $i++) {
    $key .= $token[$i];
    if(isset($settigns[$key])) {
      $new_token .= $settigns[$key];
      $key = '';
    }
  }
  return (int) $new_token;
}
