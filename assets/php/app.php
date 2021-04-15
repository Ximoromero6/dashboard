<?php
include("Model.php");

try {
    $data = json_decode(base64_decode(file_get_contents("php://input")));
    $model = new Model("dashboard", "root", "", "localhost");

    if (isset($data)) {
        $name = filter_var(trim($data->name), FILTER_SANITIZE_STRING);
        $email = filter_var(trim($data->email), FILTER_SANITIZE_EMAIL);
        $password = filter_var(trim($data->password), FILTER_SANITIZE_STRING);
        $gender = filter_var(trim($data->gender), FILTER_SANITIZE_STRING);
        $encrypted_password = crypt($password, "tnH97]AgU;>^f[>Ar=#.2AG@mJ2j7S}S6j");

        $resultado = $model->select_no_param("SELECT * FROM users WHERE email = '$email'")->rowCount();

        if ($resultado > 0) {
            echo json_encode(array("code" => false, "message" => "El email introducido ya pertenece a una cuenta."));
        } else {
            $now = date('Y-m-d H:i:s');

            $resultado = $model->select_no_param("INSERT INTO users (name, email, password, gender, date_creation) VALUES ('$name', '$email', '$encrypted_password', '$gender', '$now')");
            if ($resultado->rowCount() > 0) {
                $cuerpo = "El equipo de Dashboard te da la bienvenida😎";
                $to = $email;
                $subject = "👋Bienvenid@👋";
                $message = $cuerpo;
                $headers = "From: Dashboard Admin <admin@dashboard.com>" . PHP_EOL;
                $headers .= "Reply-To: Dashboard Admin <admin@dashboard.com>" . PHP_EOL;
                $headers .= "MIME-Version: 1.0\n";
                $headers .= "Content-Type: text/html; charset=\"iso-8859-1\"\n";
                $headers .= "X-Priority: 1 (Highest)\n";
                $headers .= "X-MSMail-Priority: High\n";
                $headers .= "Importance: High\n";

                if (!mail($to, $subject, $message, $headers)) {
                    echo json_encode(array("code" => false, "message" => "Error al envíar mail"));
                } else {
                    echo json_encode(array("code" => true, "message" => "Tu cuenta se ha creado correctamente.", "last_id" => $model->lastInsertId()));
                }
            } else {
                echo json_encode(array("code" => false, "message" => "Ha ocurrido un problema al crear tu cuenta cuenta."));
            }
        }
    }
} catch (Exception $e) {
    echo $e->getMessage();
}
