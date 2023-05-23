<?php 
  $json_string = file_get_contents("assets/json/categories.json");

  $categories = json_decode($json_string);

  header('Content-Type: application/json');

  echo json_encode($categories);
