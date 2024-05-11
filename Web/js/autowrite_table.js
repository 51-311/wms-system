// 샘플 데이터 배열
const data = [
  { id: 1, name: "Jacob", amount: "0", location: "@fat", date: "@mdo" },
  { id: 2, name: "Larry the Bird",  amount: "1", location: "@twitter", date: "@mdo" },
  { id: 3, name: "apple the Bird",  amount: "2", location: "@twitter", date: "@mdo" },
  { id: 4, name: "pie the Bird",  amount: "3", location: "@twitter", date: "@mdo" },
  { id: 5, name: "Larry the Bird",  amount: "4", location: "@twitter", date: "@mdo" },
  { id: 6, name: "Larry the Bird",  amount: "5", location: "@twitter", date: "@mdo" },
  { id: 7, name: "Larry the Bird",  amount: "6", location: "@twitter", date: "@mdo" },
  { id: 8, name: "Larry the Bird",  amount: "7", location: "@twitter", date: "@mdo" },
  { id: 9, name: "Larry the Bird", amount: "8", location: "@twitter", date: "@mdo" },
  { id: 10, name: "Larry the Bird", amount: "9", location: "@twitter", date: "@mdo" },
  { id: 11, name: "Larry the Bird", amount: "10", location: "@twitter", date: "@mdo" },
  { id: 12, name: "Larry the Bird", amount: "11", location: "@twitter", date: "@mdo" },
  { id: 13, name: "Larry the Bird", amount: "12", location: "@twitter", date: "@mdo" },
  { id: 14, name: "Larry the Bird", amount: "13", location: "@twitter", date: "@mdo" },
  { id: 15, name: "Larry the Bird", amount: "14", location: "@twitter", date: "@mdo" },
  { id: 16, name: "Larry the Bird", amount: "15", location: "@twitter", date: "@mdo" },
  { id: 17, name: "Larry the Bird", amount: "16", location: "@twitter", date: "@mdo" },
  { id: 18, name: "Larry the Bird", amount: "17", location: "@twitter", date: "@mdo" },
  { id: 19, name: "Larry the Bird", amount: "18", location: "@twitter", date: "@mdo" },
  { id: 20, name: "Larry the Bird", amount: "19", location: "@twitter", date: "@mdo" },
  { id: 21, name: "Larry the Bird", amount: "20", location: "@twitter", date: "@mdo" },
  { id: 22, name: "Larry the Bird", amount: "21", location: "@twitter", date: "@mdo" },
  { id: 23, name: "Larry the Bird", amount: "22", location: "@twitter", date: "@mdo" },
  // 추가 데이터...
];

// 테이블에 행을 추가하는 함수
function populateTable(data) {
  const tableBody = document.getElementById('tableBody');
  data.forEach(item => {
    
    // 각 amount 값에 따라 옵션 태그를 생성하는 함수를 호출합니다.
    const optionsHtml = generateOptions(item.amount);

      const row = `<tr>
                      <th scope="row">${item.id}</th>
                      <td class="px-6 py-4 whitespace-nowrap">${item.name}</td>
                      <td class="px-6 py-4 whitespace-nowrap" stlye="text-align:centr";>${item.amount}</td>
                      <td class="px-6 py-4 whitespace-nowrap">${item.location}</td>
                      <td class="px-6 py-4 whitespace-nowrap">${item.date}</td>

                      <td class="px-6 py-4 whitespace-nowrap">
                      &nbsp; &nbsp;
                      <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-22 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="" required>
                        <option value="1">1</option>
    			              <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                      <button class="ml-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">신청</button>
                      </td>
                      
                      <td class="px-6 py-4 whitespace-nowrap"> <!--flex 개행금지 한줄정렬-->
                        &nbsp; &nbsp;
                        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-22 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="" required> <!--w너비-->
                        ${optionsHtml}
                        </select>
                        <button class="ml-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">신청</button> <!--m1-2 상자 버튼간 여백-->
                      </td>

                  </tr>`;
      tableBody.innerHTML += row;
  });
}

// 각 item.amount 값에 기반하여 <select> 내에 들어갈 <option> 태그들을 생성하는 함수
function generateOptions(amount) {
  let options = '<option value="" selected>수량</option>'; // 기본 옵션
  for (let i = 1; i <= amount; i++) {
    options += `<option value="${i}">${i}</option>`; // amount 만큼의 옵션 생성
  }
  return options;
}


// 데이터로 테이블 채우기
populateTable(data);
