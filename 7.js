/*Задание 7.
Написать код приложения, интерфейс которого состоит из поля ввода и кнопки «Получить список задач». При нажатии на кнопку нужно отправить запрос с помощью fetch на URL https://jsonplaceholder.typicode.com/users/3/todos. Число 3 представляет собой id пользователя, вместо него нужно подставить число, введенное в поле. Если пользователь с таким id существует, вернется список задач для этого пользователя, каждая задача представлена объектом вида:
{
    "userId": 3,
    "id": 43,
    "title": "tempore ut sint quis recusandae",
    "completed": true
}
Где title — описание задачи, а completed — флаг, отображающий, выполнена задача или нет. Вывести данный список на страницу, оформив соответствующим образом: в виде списка (ul или ol), выполненные задачи должны быть написаны зачеркнутым текстом. Если пользователь с введенным id не существует, вывести сообщение:

«Пользователь с указанным id не найден».
*/

const btn = document.querySelector('.j-btn');
const resultContent = document.querySelector('.result');

btn.addEventListener('click', () => {
    const input = document.querySelector('.j-input').value;
    fetch(`https://jsonplaceholder.typicode.com/users/${input}/todos`)
    .then((response) => {
        console.log('response', response);

        const result = response.json();
        console.log('result', result);
        return result;
    })
    .then((data) => {
        if (data.length !== 0) {
            console.log(data); 
            resultContent.innerHTML = '';
            data.forEach(item => {
                let resultValue = `<ul class="result-ul">
                    <li><b>id пользователя:</b><br> <span>${item.userId}</span></li>
                    <li class="completed"><b>выполнение задачи:</b><br> <span>${item.completed}</span></li>
                    <li class="line-trought"><b>Описание задачи:</b><br> <span>${item.title}</span></li>
                    <li><b>id задачи:</b><br> <span>${item.id}</span></li>
                </ul>`;
                resultContent.innerHTML += resultValue;
            });
        } 
        else {
            resultContent.innerHTML = 'Пользователь с указанным id не найден';
        }
    })
    .catch(() => {
        console.log('error');
    })
})


