document.addEventListener('DOMContentLoaded', function () {
    let currentPage = 1;
    const rowsPerPage = 10;
    let totalRows;
    let totalPages;
    let allData = []; // 모든 데이터를 저장할 변수

    const role = document.body.getAttribute('data-role'); // 현재 페이지의 역할을 가져옴

    fetch('js/db_to_json.php')
        .then(response => response.json())
        .then(data => {
            allData = data; // 모든 데이터를 저장
            totalRows = data.length;
            totalPages = Math.ceil(totalRows / rowsPerPage);
            document.getElementById('total-pages').textContent = totalPages;
            populateTable(data, currentPage);
        })
        .catch(error => console.error('Error fetching data:', error));
//페이지별 조건 데이터
    function populateTable(data, page) {
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = ''; // 이전 내용 초기화
        const start = (page - 1) * rowsPerPage;
        const end = Math.min(start + rowsPerPage, data.length);

        for (let i = start; i < end; i++) {
            const item = data[i];
            let DeleteButtons = '';
            let EditButtons = '';
            let requestButtons = '';

            if (role === 'admin_edit') {
                DeleteButtons = `
                    <button class="ml-2 text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onclick="deleteRow('${item.ITEM_CODE}')">삭제</button>
                `;
                EditButtons = `
                <button class="ml-2 text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onclick="editRow('${item.ITEM_CODE}')">수정</button>
                `;

            } else {
                requestButtons = `
                    <td class="px-6 py-4 whitespace-nowrap">
                        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-22 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-gray-500" name="" required>
                            ${generateOptions(item.QUANTITY)}
                        </select>
                        <button class="ml-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">요청</button>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-22 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-gray-500" name="" required>
                            ${generateOptions(item.QUANTITY)}
                        </select>
                        <button class="ml-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">요청</button>
                    </td>
                `;
            }
//조건별 출력
            const row = `
                <tr data-item-code="${item.ITEM_CODE}" data-editing="false">
                    <td class="px-6 py-4 whitespace-nowrap" id="item-code-${item.ITEM_CODE}">${item.ITEM_CODE}</td>
                    <td class="px-6 py-4 whitespace-nowrap" id="product-name-${item.ITEM_CODE}">${item.PRODUCT_NAME}</td>
                    <td class="px-6 py-4 whitespace-nowrap" id="quantity-${item.ITEM_CODE}" style="text-align:center;">${item.QUANTITY}</td>
                    <td class="px-6 py-4 whitespace-nowrap" id="product-location-${item.ITEM_CODE}">${item.PRODUCT_LOCATION}</td>
                    <td class="px-6 py-4 whitespace-nowrap" id="rgstr-date-${item.ITEM_CODE}">${item.RGSTR_DATE}</td>
                    ${role !== 'admin_edit' ? requestButtons : ''}       <!--html body의 role값이 admin_eidt이 아닐경우 requestButtons 변수 출력-->
                    ${role === 'admin_edit' ? `<td class="px-6 py-4 whitespace-nowrap">${DeleteButtons}</td>` : ''}
                    ${role === 'admin_edit' ? `<td class="px-6 py-4 whitespace-nowrap">${EditButtons}</td>` : ''}
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

    window.deleteRow = function (itemCode) {
        console.log("Deleting item with ITEM_CODE:", itemCode);
        fetch('js/delete.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ITEM_CODE: itemCode })
        })
        .then(response => response.text())
        .then(text => {
            try {
                const data = JSON.parse(text);
                console.log("Delete response:", data);
                if (data.success) {
                    alert('레코드가 성공적으로 삭제되었습니다.');
                    loadData();
                } else {
                    alert('레코드 삭제에 실패했습니다.');
                }
            } catch (error) {
                console.error('Error parsing JSON:', error);
                console.error('Response text:', text);
            }
        })
        .catch(error => console.error('Error:', error));
    };

    window.editRow = function (itemCode) {
        const row = document.querySelector(`tr[data-item-code="${itemCode}"]`);
        if (row.dataset.editing === 'true') {
            return; // 이미 수정 모드인 경우 아무 작업도 하지 않음
        }
        row.dataset.editing = 'true';

        const itemCodeCell = document.getElementById(`item-code-${itemCode}`);
        const productNameCell = document.getElementById(`product-name-${itemCode}`);
        const quantityCell = document.getElementById(`quantity-${itemCode}`);
        const productLocationCell = document.getElementById(`product-location-${itemCode}`);
        const rgstrDateCell = document.getElementById(`rgstr-date-${itemCode}`);
        
        itemCodeCell.innerHTML = `<input type="text" id="edit-item-code-${itemCode}" value="${itemCodeCell.textContent}" class="edit-input" />`;
        productNameCell.innerHTML = `<input type="text" id="edit-product-name-${itemCode}" value="${productNameCell.textContent}" class="edit-input" />`;
        quantityCell.innerHTML = `<input type="number" id="edit-quantity-${itemCode}" value="${quantityCell.textContent}" class="edit-input" />`;
        productLocationCell.innerHTML = `<input type="text" id="edit-product-location-${itemCode}" value="${productLocationCell.textContent}" class="edit-input" />`;
        rgstrDateCell.innerHTML = `<input type="date" id="edit-rgstr-date-${itemCode}" value="${rgstrDateCell.textContent}" class="edit-input" />`;

        let existingSaveButton = row.querySelector('.save-button');
        if (existingSaveButton) {
            existingSaveButton.remove();
        }

        const saveButton = document.createElement('button');
        saveButton.textContent = '저장';
        saveButton.className = 'save-button ml-2 text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2';
        saveButton.onclick = function() {
            saveEdit(itemCode);
        };
        const actionCell = row.querySelector('td:last-child');
        actionCell.appendChild(saveButton);
    };

    window.saveEdit = function (oldItemCode) {
        const newItemCode = document.getElementById(`edit-item-code-${oldItemCode}`).value;
        const productName = document.getElementById(`edit-product-name-${oldItemCode}`).value;
        const quantity = document.getElementById(`edit-quantity-${oldItemCode}`).value;
        const productLocation = document.getElementById(`edit-product-location-${oldItemCode}`).value;
        const rgstrDate = document.getElementById(`edit-rgstr-date-${oldItemCode}`).value;

        fetch('js/update.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ OLD_ITEM_CODE: oldItemCode, NEW_ITEM_CODE: newItemCode, PRODUCT_NAME: productName, QUANTITY: quantity, PRODUCT_LOCATION: productLocation, RGSTR_DATE: rgstrDate })
        })
        .then(response => response.text())
        .then(text => {
            try {
                const data = JSON.parse(text);
                console.log("Update response:", data);
                if (data.success) {
                    alert('레코드가 성공적으로 수정되었습니다.');
                    loadData();
                } else {
                    alert('레코드 수정에 실패했습니다.');
                }
            } catch (error) {
                console.error('Error parsing JSON:', error);
                console.error('Response text:', text);
            }
        })
        .catch(error => console.error('Error:', error));
    };

    function loadData() {
        fetch('js/db_to_json.php')
            .then(response => response.json())
            .then(data => populateTable(data, currentPage))
            .catch(error => console.error('Error fetching data:', error));
    }

    document.getElementById('search-box').addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        const filteredData = allData.filter(item => {
            return item.ITEM_CODE.toLowerCase().includes(searchTerm) ||
                   item.PRODUCT_NAME.toLowerCase().includes(searchTerm) ||
                   item.PRODUCT_LOCATION.toLowerCase().includes(searchTerm);
        });
        populateTable(filteredData, 1);
    });

    window.onload = loadData;
});
