/* Задание 8.
Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.

        Заголовок первого input — «номер страницы».
        Заголовок второго input — «лимит».
        Заголовок кнопки — «запрос».

При клике на кнопку происходит следующее:

        Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
        Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Лимит вне диапазона от 1 до 10»;
        Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
        Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input. 

Пример: если пользователь ввёл 5 и 7, то запрос будет вида https://picsum.photos/v2/list?page=5&limit=7.

После получения данных вывести список картинок на экран.

Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного запроса (использовать localStorage).
*/

const btn = document.querySelector('.j-btn');
const resultContent = document.querySelector('.result');

btn.addEventListener('click', () => {
    const myResult = localStorage.getItem('myKey');
    const inputNumber = document.querySelector('.j-input-number').value;
    const inputLimit = document.querySelector('.j-input-limit').value;

    if (inputNumber < 1 || inputNumber > 10 || isNaN(inputNumber)) {
        resultContent.innerHTML = 'Номер страницы вне диапазона от 1 до 10';
    } else if (inputLimit < 1 || inputLimit > 10 || isNaN(inputLimit)) {
        resultContent.innerHTML = 'Лимит вне диапазона от 1 до 10';
    } else if ((inputNumber < 1 || inputNumber > 10) || isNaN(inputNumber) && (inputLimit < 1 || inputLimit > 10) || isNaN(inputLimit)) {
        resultContent.innerHTML = 'Номер страницы и лимит вне диапазона от 1 до 10';
    } else {
        fetch(`https://picsum.photos/v2/list?page=${inputNumber}&limit=${inputLimit}`)
        .then((response) => {
            console.log('response', response);
            const result = response.json();
            return result;
            localStorage.setItem('myKey', result);
        })
        .then((data) => {
            if (data.length !== 0) {
                console.log(data); 
                resultContent.innerHTML = '';
                data.forEach(item => {
                    let resultValue = `
                    <div>
                        <div class="result-img">Автор картинки: ${item.author}</div>
                        <a class="result-link" target="_blank" href="${item.download_url}">${item.download_url}</a>
                    </div>
                    `;
                    resultContent.innerHTML += resultValue;
                });
            } 
        })
        .catch(() => {
            console.log('error');
        })
    }
})


// по ключам localStorage не сделал подзадачу.