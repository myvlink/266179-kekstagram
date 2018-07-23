'use strict';

(function () {
  window.data = {

    // Список описаний
    PHOTO_DISCRIPTION: [
      'Тестим новую камеру!',
      'Затусили с друзьями на море',
      'Как же круто тут кормят',
      'Отдыхаем...',
      'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
      'Вот это тачка!'
    ],

    // Параметры фотографии
    photoParameters: [],

    // Генерация описания
    generateDescription: function () {
      return window.data.PHOTO_DISCRIPTION[window.utils.generateInteger(0, window.data.PHOTO_DISCRIPTION.length - 1)];
    }
  };
})();
