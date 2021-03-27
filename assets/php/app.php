<?php
$data = json_decode(file_get_contents("php://input"));

if (isset($data)) {
    $name = filter_var(trim($data->name), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($data->email), FILTER_SANITIZE_EMAIL);
    $password = filter_var(trim($data->password), FILTER_SANITIZE_STRING);
    $gender = filter_var(trim($data->gender), FILTER_SANITIZE_STRING);

    echo json_encode(array("code" => true, "message" => "Tu cuenta se ha creado correctamente."));
} else {
    echo json_encode(array("code" => false, "message" => "Ha ocurido un problema al crear tu cuenta."));
}
