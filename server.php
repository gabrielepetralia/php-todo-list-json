<?php 
  $json_string = file_get_contents('lists.json');

  $lists = json_decode($json_string);

  header('Content-Type: application/json');

  echo json_encode($lists);
?>