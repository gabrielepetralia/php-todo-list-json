<?php 
  $json_string = file_get_contents("assets/json/tasks.json");

  $tasks = json_decode($json_string);

  if(isset($_POST["taskID"])) {
    $newTasks = [
      "id" => $_POST["taskID"],
      "text" => $_POST["taskText"],
      "done" => false,
      "category" => $_POST["taskCategory"],
      "priority" => $_POST["taskPriority"]
    ];
    $tasks[] = $newTasks;
    filePut($tasks);
  };

  function filePut($tasks) {
    file_put_contents("assets/json/tasks.json", json_encode($tasks));
  };

  header('Content-Type: application/json');

  echo json_encode($tasks);
