<!DOCTYPE html>
<html>

<head>

</head>

<body>
    <?php
        $host = 'localhost'; // MySQL 호스트
        $username = 'root'; // MySQL 사용자명
        $password = ''; // MySQL 비밀번호
        $database = 'wms'; // 사용할 데이터베이스명

        $conn = mysqli_connect($host, $username, $password, $database);

        if (!$conn) {
            die('MySQL 연결 실패: ' . mysqli_connect_error());
        }
        else{
            echo "MYSQL 접속성공";
        }

        $query = "SELECT * FROM wms"; //테이블명 확인
        $result = mysqli_query($conn, $query);

        if ($result) {
            // 결과 처리
            while ($row = mysqli_fetch_assoc($result)) {
                echo $row['username'] . '<br>';
            }
        } else {
            echo '쿼리 실행 실패: ' . mysqli_error($conn);
        }

        // 결과 해제
        mysqli_free_result($result);

        // 연결 종료
        mysqli_close($conn);


        //SQL 인젝션 방지
        $username =mysqli_real_escape_string($conn, $_POST['username']);
        
        $password = mysqli_real_escape_string($conn, $_POST['password']);

        $query = "SELECT * FROM wms WHERE username='$username' AND password='$password'";     //테이블명 확인
    ?>

</body>

</html