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
    generateArrayRandomNumber: function (min, max) {
      var totalNumbers = max - min + 1;
      var arrayTotalNumbers = [];
      var arrayRandomNumbers = [];
      var tempRandomNumber;
      while (totalNumbers--) {
        arrayTotalNumbers.push(totalNumbers + min);
      }
      while (arrayTotalNumbers.length) {
        tempRandomNumber = Math.round(Math.random() * (arrayTotalNumbers.length - 1));
        arrayRandomNumbers.push(arrayTotalNumbers[tempRandomNumber]);
        arrayTotalNumbers.splice(tempRandomNumber, 1);
      }
      return arrayRandomNumbers;
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
      for (var i = 0; i < array.length; i++) {
        var str = array[i];
        obj[str] = true;
      }
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
      while (document.querySelector(className).firstChild) {
        document.querySelector(className).removeChild(document.querySelector(className).firstChild);
      }
    }
  };
})();
