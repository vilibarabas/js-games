<?php

if(isset($_POST['comb']) && checkToken($_POST['token'])) {
  $combs = json_decode($_POST['comb']);
  file_put_contents ( '../store/combs.json', json_encode($combs));
}
else{
  echo 'token error';
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
