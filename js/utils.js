'use strict';

(function () {
  window.utils = {
    // Генерация случайного числа
    generateInteger: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },
    // Визуальное скрытие элементов
    visuallyHideElement: function (element) {
      document.querySelector(element).classList.add('visually-hidden');
    },
    // Визуальное скрытие элементов
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
    }
  };
})();
