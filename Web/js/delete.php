<?php
$host = 'localhost'; // MySQL 호스트
$user = 'root'; // MySQL 사용자명
$pw = ''; // MySQL 비밀번호
$dbName = 'wms'; // 사용할 데이터베이스명

header('Content-Type: application/json');

// 오류 보고를 켜서 PHP 오류 메시지를 확인합니다.
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$response = array('success' => false);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (isset($input['ITEM_CODE'])) {
        $item_code = $input['ITEM_CODE'];

        // 데이터베이스 연결
        $conn = new mysqli($host, $user, $pw, $dbName);
        if ($conn->connect_error) {
            $response['error'] = "Connection failed: " . $conn->connect_error;
            echo json_encode($response);
            exit();
        }

        $sql = "DELETE FROM wms WHERE ITEM_CODE = ?";
        $stmt = $conn->prepare($sql);
        if ($stmt === false) {
            $response['error'] = "Prepare failed: " . $conn->error;
            echo json_encode($response);
            exit();
        }

        $stmt->bind_param("s", $item_code);
        if ($stmt->execute()) {
            $response['success'] = true;
        } else {
            $response['error'] = "Execute failed: " . $stmt->error;
        }

        $stmt->close();
        $conn->close();
    } else {
        $response['error'] = "ITEM_CODE is missing";
    }
} else {
    $response['error'] = "Invalid request method";
}

echo json_encode($response);
?>
