'use strict';

(function () {
  window.utils = {

    ESC_KEYCODE: 27,
    DEBOUNCE_INTERVAL: 500,
    // Устранение дребезга
    debounce: function (fun) {
      var lastTimeout = null;

      return function () {
        var args = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          fun.apply(null, args);
        }, window.utils.DEBOUNCE_INTERVAL);
      };
    },

    // Возврат только чисел из строки
    convertStringToNumber: function (string) {
      return string.replace(/\D+/g, '');
    },

    // Генерация массива рандомных чисел
    generateArrayRandomNumbers: function (min, max) {
      var totalNumber = max - min + 1;
      var totalNumbers = [];
      var randomNumbers = [];
      var tempRandomNumber;
      while (totalNumber--) {
        totalNumbers.push(totalNumber + min);
      }
      while (totalNumbers.length) {
        tempRandomNumber = Math.round(Math.random() * (totalNumbers.length - 1));
        randomNumbers.push(totalNumbers[tempRandomNumber]);
        totalNumbers.splice(tempRandomNumber, 1);
      }
      return randomNumbers;
    },

    // Генерация случайного числа
    generateInteger: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },

    // Визуальное скрытие элементов
    visuallyHideElement: function (element) {
      document.querySelector(element).classList.add('visually-hidden');
    },

    // Cкрытие элементов
    hideElement: function (element) {
      document.querySelector(element).classList.add('hidden');
    },

    // Возврат массива без повторений
    generateUniqueArray: function (array) {
      var obj = {};
      array.forEach(function (item) {
        var str = item;
        obj[str] = true;
      });
      return Object.keys(obj);
    },

    // Вывод ошибки
    errorHandler: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; padding: 10px; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.top = 0;
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    },

    // Удаление элементов родителя
    removeElements: function (className) {
      var element = document.querySelector(className);
      element.innerHTML = '';
    }
  };
})();
