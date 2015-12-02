<?php
require_once 'config.php'; // Database setting constants [DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD]
class dbHelper {
    private $db;
    private $err;
    function __construct() {
        $dsn = 'mysql:host='.DB_HOST.';dbname='.DB_NAME.';charset=utf8';
        try {
            $this->db = new PDO($dsn, DB_USERNAME, DB_PASSWORD, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
        } catch (PDOException $e) {
            $response["status"] = "error";
            $response["message"] = 'Connection failed: ' . $e->getMessage();
            $response["clasificacion"] = null;
            //echoResponse(200, $response);
            exit;
        }
    }

    function call($procedure, $cotas){
        $c = "";
        foreach ($cotas as $key => $value) {
            $c .= $value. ",";
        }
        try{
            $this->db->exec('CALL '.$procedure .'('. $c . '@valor,@clasific)');
            $clasific=$this->db->query('select @clasific')->fetchAll();
            $response["clasificacion"] = $clasific[0][0];
            $valor=$this->db->query('select @valor')->fetchAll();
            $response["valor"] = $valor[0][0];
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = 'Call procedure Failed: ' .$e->getMessage();
            $response["clasificacion"] = null;
        }
        return $response;
    }

    function respuestas(){
        try{
            $this->db->exec('CALL respuestas(@proy,@sist,@usua,@part)');
            $respuestas=$this->db->query('select @proy AS proy,@sist AS sist,@usua AS usua,@part AS part')->fetchAll();
            $response["respuestas"] = $respuestas[0];
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = 'Call procedure Failed: ' .$e->getMessage();
            $response["clasificacion"] = null;
        }
        return $response;
    }

    function select($table){
        try{
            $stmt = $this->db->prepare("SELECT * FROM ".$table ." LIMIT 1");
            $stmt->execute();
            $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if(count($row)<=0){
                $response["status"] = "warning";
                $response["message"] = "No data found.";
            }else{
                $response["status"] = "success";
                $response["message"] = "Data selected from database";
            }
                $response["data"] = $row;
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = 'Select Failed: ' .$e->getMessage();
            $response["data"] = null;
        }
        return $response;
    }
}

?>
