<?php
$host = 'localhost'; // MySQL 호스트
$user = 'root'; // MySQL 사용자명
$pw = ''; // MySQL 비밀번호
$dbName = 'wms'; // 사용할 데이터베이스명

// MySQL 접속
$con = new mysqli($host, $user, $pw, $dbName);

// DB 연결 확인
if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

// 테이블 저장 데이터 모두 조회
$sql = "SELECT ITEM_CODE, PRODUCT_NAME, QUANTITY, PRODUCT_LOCATION, RGSTR_DATE FROM wms"; //테이블명
$ret = mysqli_query($con, $sql);

$data = [];
if ($ret) {
    // 데이터를 배열로 변환
    while ($row = mysqli_fetch_assoc($ret)) {
        $data[] = $row;
    }
} else {
    echo "테이블 조회 실패!!";
    echo "오류 원인 : " . mysqli_error($con);
    exit();
}

mysqli_close($con);

// 데이터를 JSON으로 변환하여 반환
header('Content-Type: application/json');
echo json_encode($data);
?>
