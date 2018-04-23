<?php

$score = file_get_contents("../store/all_scores.json");
$score = json_decode($score);
print_r(json_encode($score));
