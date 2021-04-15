<?php
class Model
{
    protected $conexion;

    public function __construct($db_name, $db_user, $db_password, $db_host)
    {

        try {
            $database = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_password);
            $database->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, TRUE);
            $database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conexion = $database;
        } catch (PDOException $e) {
            print "<p>Error: " . $e->getMessage();
        }
    }

    public function select($consulta, $parametro)
    {
        $resultado = $this->conexion->prepare($consulta);
        $resultado->execute($parametro);
        return $resultado;
    }

    public function select_no_param($consulta)
    {

        $resultado = $this->conexion->prepare($consulta);
        $resultado->execute();
        return $resultado;
    }

    public function lastInsertId()
    {
        return $this->conexion->lastInsertId();
    }
}
