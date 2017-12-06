<?php

echo json_encode(getWords());

function getWords()
{
    $words = [
        "ana",
        "are",
        "mere",
        "mereaa",
        "ovi",
        "buzi",
        "mady",
        "love",
        "lov2e",
        "lov2dfe",
    ];

    $words = custom_shuffle($words, 2);

    $letters = getLetters($words);

    $words_data = [
        "cuv_list" => $words,
        "letters" => $letters
    ];

    $settings = [
        "page" => [
            1
        ]
    ];

    return array('words' => $words_data, 'settings' => $settings);
}

function getLetters(&$words) {
    $letters = [];
    foreach($words as &$word) {
        $word = strtoupper($word);
        for($i = 0; $i < strlen($word); $i++) {
            $letters[strtoupper($word[$i])] = 1;
        }
    }

    $letters = array_keys($letters);

    return $letters;
}

function custom_shuffle($my_array, $min) {
  $copy = array();
  $elements_number = rand($min, count($my_array));
  $random_keys = array_rand($my_array,$elements_number);

  for($i = 0; $i < count($random_keys); $i++) {
    $copy[$i] = $my_array[$random_keys[$i]];
    //delete the element from source array
    unset($my_array[$random_keys[$i]]);
  }

  return $copy;
}
