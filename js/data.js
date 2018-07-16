'use strict';

(function () {
  window.data = {

    // Количество фотографий
    PHOTO_QUANTITY: 25,

    // Список комментариев
    PHOTO_COMMENTS: [
      'Всё отлично!',
      'В целом всё неплохо. Но не всё.',
      'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
      'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
      'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
      'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
    ],

    // Список описаний
    PHOTO_DISCRIPTION: [
      'Тестим новую камеру!',
      'Затусили с друзьями на море',
      'Как же круто тут кормят',
      'Отдыхаем...',
      'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
      'Вот это тачка!'
    ],

    // Параметры лайков
    LIKES: {
      MIN: 15,
      MAX: 200
    },
    // Параметры фотографии
    photoParameters: [],

    // Генерация комментов
    generateComments: function () {
      return window.utils.generateInteger(1, 2) > 1 ? [window.data.PHOTO_COMMENTS[window.utils.generateInteger(0, window.data.PHOTO_COMMENTS.length - 1)], window.data.PHOTO_COMMENTS[window.utils.generateInteger(0, window.data.PHOTO_COMMENTS.length - 1)]] : [window.data.PHOTO_COMMENTS[window.utils.generateInteger(0, window.data.PHOTO_COMMENTS.length - 1)]];
    },

    // Генерация описания
    generateDescription: function () {
      return window.data.PHOTO_DISCRIPTION[window.utils.generateInteger(0, window.data.PHOTO_DISCRIPTION.length - 1)];
    }
  };
})();
