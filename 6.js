// Задание 6.

/* Создать Promise, в котором c задержкой в 3 секунды сгенерировать случайное целое число от 1 до 100. 
Для создания задержки использовать setTimeout. Если сгенерированное число — четное, Promise выполнится успешно (resolve), 
если нечетное — выполнится с ошибкой (reject). 
После разрешения Promise обработать результат его выполнения и вывести сообщение в консоль:
«Завершено успешно. Сгенерированное число — number», если Promise завершился успешно. Вместо number подставить сгенерированное число
«Завершено с ошибкой. Сгенерированное число — number», если Promise завершился с ошибкой. Вместо number подставить сгенерированное число */

function usePromise() {
    // Создаем promise
    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        let randomInt = Math.floor(Math.random() * 100 - 1);
        if (randomInt % 2 == 0) {
            resolve(`Сгенерированное число — ${randomInt}`);
        } else {
            reject(`Сгенерированное число — ${randomInt}`);
        }
        
        console.log(randomInt);
      }, 3000);
    });
    // Выполняем promise
    myPromise
      .then((result) => {
        console.log('Завершено успешно.', result);
      })
      .catch((error) => {
        console.log('Завершено с ошибкой.', error);
      })
  };
  
  console.log('Запускаем функцию с promise');
  usePromise();
  