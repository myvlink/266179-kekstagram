'use strict';

(function () {
  window.utils = {
    // Генерация случайного числа
    generateInteger: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },
    // Скрытие элементов
    hideElement: function (element) {
      document.querySelector(element).classList.add('visually-hidden');
    },
    // Возврат массива без повторений
    generateUniqueArray: function (array) {
      var obj = {};
      for (var i = 0; i < array.length; i++) {
        var str = array[i];
        obj[str] = true;
      }
      return Object.keys(obj);
    }
  };
})();
