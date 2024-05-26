<?php
$host = 'localhost'; // MySQL 호스트
$user = 'root'; // MySQL 사용자명
$pw = ''; // MySQL 비밀번호
$dbName = 'wms'; // 사용할 데이터베이스명
header('Content-Type: application/json');

$response = array('success' => false);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (isset($input['OLD_ITEM_CODE']) && isset($input['NEW_ITEM_CODE']) && isset($input['PRODUCT_NAME']) && isset($input['QUANTITY']) && isset($input['PRODUCT_LOCATION']) && isset($input['RGSTR_DATE'])) {
        $old_item_code = $input['OLD_ITEM_CODE'];
        $new_item_code = $input['NEW_ITEM_CODE'];
        $product_name = $input['PRODUCT_NAME'];
        $quantity = $input['QUANTITY'];
        $product_location = $input['PRODUCT_LOCATION'];
        $rgstr_date = $input['RGSTR_DATE'];

        $conn = new mysqli($host, $user, $pw, $dbName);
        if ($conn->connect_error) {
            $response['error'] = "Connection failed: " . $conn->connect_error;
            echo json_encode($response);
            exit();
        }

        $sql = "UPDATE wms SET ITEM_CODE = ?, PRODUCT_NAME = ?, QUANTITY = ?, PRODUCT_LOCATION = ?, RGSTR_DATE = ? WHERE ITEM_CODE = ?";  /*wms테이블명 중요*/
        $stmt = $conn->prepare($sql);
        if ($stmt === false) {
            $response['error'] = "Prepare failed: " . $conn->error;
            echo json_encode($response);
            exit();
        }

        $stmt->bind_param("ssisss", $new_item_code, $product_name, $quantity, $product_location, $rgstr_date, $old_item_code);
        if ($stmt->execute()) {
            $response['success'] = true;
        } else {
            $response['error'] = "Execute failed: " . $stmt->error;
        }

        $stmt->close();
        $conn->close();
    } else {
        $response['error'] = "Missing parameters";
    }
} else {
    $response['error'] = "Invalid request method";
}

echo json_encode($response);
?>
