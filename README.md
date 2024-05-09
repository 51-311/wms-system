# WMS 창고재고관리 시스템

## 프로젝트 개요
WMS 창고재고관리 시스템([바로가기](https://51-311.github.io/wms-system/Web/%EC%9E%AC%EA%B3%A0%EC%A1%B0%ED%9A%8C.html))은 프론트엔드와 백엔드를 포함하는 통합 창고 관리 솔루션입니다.

## 개발 현황

### 저장소 생성, 작업자 초대
- **2024-05-02**: 프론트엔드 및 백엔드의 GitHub 저장소를 생성하고, 다음 참여자들이 프로젝트에 합류했습니다.

  | 참여자 | link |
  | ------ | ------ |
  | 51-311 | [https://github.com/51-311]|
  | beombeom1 | [https://github.com/beombeom1] |
  | GTRUENO | [https://github.com/GTRUENO] |
  | Yang-ByeongHo | [https://github.com/Yang-ByeongHo] |
  
<br/>

### 데이터베이스 설정
- **2024-05-05**: [DB 연결 파일 생성](https://github.com/51-311/wms-system/tree/main/DB) - XAMPP를 사용하여 MySQL 설정 및 DB 연결 테스트를 완료했습니다.

<br/>

### 인터페이스 개발
- **2024-05-06**: [WMS 페이지 메뉴 생성](https://github.com/51-311/wms-system/commit/67587354a2d3c2302e6c17ccf2b86dfc998e8ac3)
- **2024-05-09**: [페이지 일부 수정 및 기능 추가](https://github.com/51-311/wms-system/commit/75a795ef045044e97c7b925dca3452dd726cc79e) - 기존의 CSS 파일을 통합하고, Tailwind CSS를 활용하여 디자인을 개선했습니다. 또한 데이터 조회 기능을 추가하여 사용자 경험을 개선했습니다.

<br/>

## XAMPP 설치 및 설정
- XAMPP [링크](https://www.apachefriends.org/download.html)에서 받으실 수 있습니다. 설치 버전은 8.0.30 권장
- MySQL 실행 오류가 발생할 경우, `xampp/mysql` 경로에서 `backup` 폴더의 내용을 `data` 폴더에 복사하고, Apache와 MySQL을 재시작하세요.

