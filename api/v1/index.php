<?php
require '.././libs/Slim/Slim.php';
require_once 'dbHelper.php';

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app = \Slim\Slim::getInstance();
$db = new dbHelper();

/**
 * Database Helper Function templates
 */
/*
select(table name, where clause as associative array)
insert(table name, data as associative array, mandatory column names as array)
update(table name, column names as associative array, where clause as associative array, required columns as array)
delete(table name, where clause as array)
*/

// CALLS
$app->post('/call', function() use ($app) {
    $data = json_decode($app->request->getBody());
    global $db;
    //$cotas = array('cotaS'=>0.8,'cotaI'=>0.6);
    $indicadores["cinco"] = $db->call("cinco",$data->cinco);
    $indicadores["seis"] = $db->call("seis",$data->seis);
    $indicadores["siete"] = $db->call("siete",$data->siete);
    $indicadores["ocho"] = $db->call("ocho",$data->ocho);
    $indicadores["nueve"] = $db->call("nueve",$data->nueve);
    $indicadores["once"] = $db->call("once",$data->once);
    $indicadores["doce"] = $db->call("doce",$data->doce);
    $indicadores["trece"] = $db->call("trece",$data->trece);
    $indicadores["catorce"] = $db->call("catorce",$data->catorce);
    $indicadores["dieciseis"] = $db->call("dieciseis",$data->dieciseis);
    $indicadores["diecisiete"] = $db->call("diecisiete",$data->diecisiete);
    $indicadores["diecinueve"] = $db->call("diecinueve",$data->diecinueve);
    $indicadores["veinte"] = $db->call("veinte",$data->veinte);
    $indicadores["veintiuno"] = $db->call("veintiuno",$data->veintiuno);
    $indicadores["veintidos"] = $db->call("veintidos",$data->veintidos);
    $indicadores["veintitres"] = $db->call("veintitres",$data->veintitres);
    $indicadores["veinticuatro"] = $db->call("veinticuatro",$data->veinticuatro);
    $indicadores["veinticinco"] = $db->call("veinticinco",$data->veinticinco);
    $indicadores["veintisiete"] = $db->call("veintisiete",$data->veintisiete);
    $indicadores["treintayuno"] = $db->call("treintayuno",$data->treintayuno);
    $indicadores["treintaydos"] = $db->call("treintaydos",$data->treintaydos);
    $indicadores["treintaytres"] = $db->call("treintaytres",$data->treintaytres);
    $indicadores["treintaycuatro"] = $db->call("treintaycuatro",$data->treintaycuatro);
    $indicadores["treintayocho"] = $db->call("treintayocho",$data->treintayocho);
    $indicadores["treintaynueve"] = $db->call("treintaynueve",$data->treintaynueve);
    $indicadores["cuarenta"] = $db->call("cuarenta",$data->cuarenta);
    $indicadores["cuarentayuno"] = $db->call("cuarentayuno",$data->cuarentayuno);
    $indicadores["cuarentaydos"] = $db->call("cuarentaydos",$data->cuarentaydos);
    $indicadores["cuarentaycuatro"] = $db->call("cuarentaycuatro",$data->cuarentaycuatro);
    $indicadores["cuarentaycinco"] = $db->call("cuarentaycinco",$data->cuarentaycinco);
    echoResponse(200, $indicadores);
});

$app->get('/secundaria', function() {
    global $db;
    $rows = $db->select("secundaria");
    echoResponse(200, $rows);
});

$app->get('/respuestas', function() {
    global $db;
    $rows = $db->respuestas();
    echoResponse(200, $rows);
});

function echoResponse($status_code, $response) {
    global $app;
    $app->status($status_code);
    $app->contentType('application/json');
    echo json_encode($response,JSON_NUMERIC_CHECK);
}

$app->run();
?>
