<?php
$host = 'localhost';
$user = 'root';
$pw = '';
$dbName = 'wms';
$conn = new mysqli($host, $user, $pw, $dbName);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 사용자 입력 처리
$item_code = $_POST['item_code'];
$product_name = $_POST['product_name'];
$quantity = $_POST['quantity'];
$product_location = $_POST['product_location'];
$rgstr_date = $_POST['rgstr_date'];

// 데이터베이스에 입력
$sql = "INSERT INTO wms (ITEM_CODE, PRODUCT_NAME, QUANTITY, PRODUCT_LOCATION, RGSTR_DATE) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

// 형식 문자열을 수정: "sisis" (문자열, 문자열, 정수, 문자열, 문자열)
$stmt->bind_param("ssiss", $item_code, $product_name, $quantity, $product_location, $rgstr_date);

if ($stmt->execute()) {
    echo "새로운 상품 정보가 성공적으로 입력되었습니다.";
    echo '<script>
        setTimeout(function() {
            window.history.back();
        }, 2000);
    </script>';
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>