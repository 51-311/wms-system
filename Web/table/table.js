
document.addEventListener('DOMContentLoaded', function() {
    const searchBox = document.getElementById('search-box');
    const tableBody = document.getElementById('table').getElementsByTagName('tbody')[0];
    const originalRows = Array.from(tableBody.querySelectorAll('tr'));

    let filteredRows = originalRows;
    let currentPage = 1;
    const rowsPerPage = 10;


    function renderTable() {
        tableBody.innerHTML = ''; // 테이블 내용을 비움
        const pageRows = paginate(filteredRows); // 현재 페이지에 맞는 데이터 가져오기
        pageRows.forEach(row => tableBody.appendChild(row.cloneNode(true))); // 테이블에 행 추가
    }

    function paginate(items) {
        let start = (currentPage - 1) * rowsPerPage; // 페이지 시작 인덱스
        let end = start + rowsPerPage; // 페이지 끝 인덱스
        return items.slice(start, end); // 현재 페이지의 데이터만 잘라서 반환
    }


    function updatePagination() {
        const totalPages = Math.ceil(filteredRows.length / rowsPerPage); // 총 페이지 수 계산
        document.getElementById('page-number').textContent = currentPage; // 현재 페이지 번호 표시
        document.getElementById('total-pages').textContent = totalPages; // 총 페이지 수 표시
        renderTable(); // 테이블 렌더링
    }


    function changePage(step) {
        const totalPages = Math.ceil(filteredRows.length / rowsPerPage); // 총 페이지 수 계산
        const newPage = currentPage + step; // 새 페이지 번호 계산
     
        if (newPage > 0 && newPage <= totalPages) {
            currentPage = newPage; // 페이지 번호 업데이트
            updatePagination(); // 페이지네이션 업데이트
        }
    }


    function filterTable() {
        const searchText = searchBox.value.toLowerCase(); 
        if (searchText) {
         
            filteredRows = originalRows.filter(row => row.textContent.toLowerCase().includes(searchText));
        } else {
      
            filteredRows = originalRows;
        }
        currentPage = 1; // 검색 결과에 대해 첫 페이지로 리셋
        updatePagination(); // 페이지네이션 업데이트
    }

    searchBox.addEventListener('keyup', filterTable);

   
    document.getElementById('pagination').addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON') {
            const direction = event.target.textContent.includes('다음') ? 1 : -1; 
            changePage(direction); 
        }
    });

    updatePagination();
});
 