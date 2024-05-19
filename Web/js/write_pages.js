document.addEventListener('DOMContentLoaded', function () {
      let currentPage = 1;
      const rowsPerPage = 10;
      let totalRows;
      let totalPages;

      fetch('js/db_to_json.php')
        .then(response => response.json())
        .then(data => {
          totalRows = data.length;
          totalPages = Math.ceil(totalRows / rowsPerPage);
          document.getElementById('total-pages').textContent = totalPages;
          populateTable(data, currentPage);
        })
        .catch(error => console.error('Error fetching data:', error));

      // 테이블에 행을 추가하는 함수
      function populateTable(data, page) {
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = ''; // 이전 내용 초기화
        const start = (page - 1) * rowsPerPage;
        const end = Math.min(start + rowsPerPage, data.length);

        for (let i = start; i < end; i++) {
          const item = data[i];
          const row = `<tr>
            <td class="px-6 py-4 whitespace-nowrap">${item.ITEM_CODE}</td>
            <td class="px-6 py-4 whitespace-nowrap">${item.PRODUCT_NAME}</td>
            <td class="px-6 py-4 whitespace-nowrap" style="text-align:center;">${item.QUANTITY}</td>
            <td class="px-6 py-4 whitespace-nowrap">${item.PRODUCT_LOCATION}</td>
            <td class="px-6 py-4 whitespace-nowrap">${item.RGSTR_DATE}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-22 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="" required>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
              <option value="60">60</option>
              <option value="70">70</option>
              <option value="80">80</option>
              <option value="90">90</option>
              <option value="100">100</option>
              </select>
              <button class="ml-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">요청</button>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-22 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="" required>
                ${generateOptions(item.QUANTITY)}
              </select>
              <button class="ml-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">요청</button>
            </td>
          </tr>`;
          tableBody.insertAdjacentHTML('beforeend', row);
        }

        document.getElementById('page-number').textContent = currentPage;
        document.getElementById('prev-button').disabled = currentPage === 1;
        document.getElementById('next-button').disabled = currentPage === totalPages;
      }

      function generateOptions(quantity) {
        let options = '';
        for (let i = 1; i <= quantity; i++) {
          options += `<option value="${i}">${i}</option>`;
        }
        return options;
      }

      window.changePage = function (direction) {
        currentPage += direction;
        if (currentPage < 1) {
          currentPage = 1;
        } else if (currentPage > totalPages) {
          currentPage = totalPages;
        }
        fetch('js/db_to_json.php')
          .then(response => response.json())
          .then(data => {
            populateTable(data, currentPage);
          })
          .catch(error => console.error('Error fetching data:', error));
      };
    });