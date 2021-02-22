// Задание 3.

/*Дан JSON-файл с информацией о выручке фирмы по кварталам за период с 2017 по 2019 год. Файл доступен по этой ссылке.
https://my.api.mockaroo.com/revenue_2017-2019.json?key=fd36b440
Вам нужно написать код приложения, интерфейс которого состоит из:
выпадающего списка (использовать тег select, подробная документация здесь), в котором можно выбрать год с 2017 по 2018;
кнопки «Загрузить отчет».
Пользователь выбирает год в списке и нажимает кнопку «Загрузить отчет». Если год не выбран, вывести сообщение «Выберите, пожалуйста, год». 
Если год выбран, отправить XHR-запрос к JSON-файлу, используя URL, указанный выше, обработать его содержимое и вывести информацию о выручке 
в выбранном году в виде таблицы.*/

function useRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    
    xhr.onload = function() {
      if (xhr.status != 200) {
        console.log('Статус ответа: ', xhr.status);
      } else {
        const result = JSON.parse(xhr.response);
        if (callback) {
          callback(result);
        }
      }
    };
    
    xhr.onerror = function() {
      console.log('Ошибка! Статус ответа: ', xhr.status);
    };
    
    xhr.send();
  };
  
  // Ищем ноду для вставки результата запроса
  const resultNode = document.querySelector('.j-result');
  // Ищем кнопку, по нажатии на которую будет запрос
  const btnNode = document.querySelector('.j-btn-request');

  const value = document.querySelector('#select').value;
  
  /**
    * Функция обработки полученного результата
    * apiData - объект с результатом запроса
    */
  function displayResult(apiData) {
    let cards = '';
    console.log('start cards', cards);

    console.log(apiData);
    
    apiData.forEach(item => {
        if (item.year == value) {
            const cardBlock = `
            <table>
                <tr>
                    <th>кв. 1</th>
                    <th>кв. 2</th>
                    <th>кв. 3</th>
                    <th>кв. 4</th>
                </tr>
                <tr>
                    <td>${item.sales.q1}</td>
                    <td>${item.sales.q2}</td>
                    <td>${item.sales.q3}</td>
                    <td>${item.sales.q4}</td>
                </tr>
            </table>
          `;
          cards = cards + cardBlock;
        }
    });
    
    console.log('end cards', cards);
      
    resultNode.innerHTML = cards;
  }
  
  // Вешаем обработчик на кнопку для запроса
  btnNode.addEventListener('click', () => {
    useRequest('https://my.api.mockaroo.com/revenue_2017-2019.json?key=fd36b440', displayResult);
  })