'use strict';

// Количество фотографий
var PHOTO_QUANTITY = 25;

// Список комментариев
var PHOTO_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// Список описаний
var PHOTO_DISCRIPTION = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

// Параметры лайков
var LIKES = {
  MIN: 15,
  MAX: 200
};

// Параметры фотографии
var photoParameters = [];

// Генерация случайного числа
var generateInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

// Генерация комментов
var generateComments = function () {
  if (generateInteger(1, 2) > 1) {
    return [PHOTO_COMMENTS[generateInteger(0, PHOTO_COMMENTS.length - 1)], PHOTO_COMMENTS[generateInteger(0, PHOTO_COMMENTS.length - 1)]];
  } else {
    return [PHOTO_COMMENTS[generateInteger(0, PHOTO_COMMENTS.length - 1)]];
  }
};

// Генерация описания
var generateDescription = function () {
  return PHOTO_DISCRIPTION[generateInteger(0, PHOTO_DISCRIPTION.length - 1)];
};

// Генерация объектов параметров фотографий
var generatePhotoParameter = function () {
  for (var i = 1; i <= PHOTO_QUANTITY; i++) {
    photoParameters[i] = {
      url: 'photos/' + i + '.jpg',
      likes: generateInteger(LIKES.MIN, LIKES.MAX),
      comments: generateComments(),
      description: generateDescription()
    };
  }
  return photoParameters;
};

generatePhotoParameter();

var picturesContainer = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content;

// Создание шаблона
var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__stat--likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__stat--comments').textContent = picture.comments.length;

  return pictureElement;
};

// Вставка фотографий на главную
var fragment = document.createDocumentFragment();
for (var i = 1; i <= PHOTO_QUANTITY; i++) {
  fragment.appendChild(renderPicture(photoParameters[i]));
}
picturesContainer.appendChild(fragment);

// Отображение окна картинки
var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

// Заполнение большой картинки
var renderBigPicture = function (picture) {
  document.querySelector('.big-picture__img img').src = picture.url;
  document.querySelector('.likes-count').textContent = picture.likes;
  document.querySelector('.comments-count').textContent = picture.comments.length;
  fragment = document.createDocumentFragment();
  for (i = 0; i < picture.comments.length; i++) {
    var comment = document.createElement('li');
    var avatar = document.createElement('img');
    var text = document.createElement('p');
    comment.classList.add('social__comment', 'social__comment--text');
    avatar.classList.add('social__picture');
    avatar.src = 'img/avatar-' + generateInteger(1, 6) + '.svg';
    avatar.alt = 'Аватар комментатора фотографии';
    avatar.width = '35';
    avatar.height = '35';
    text.classList.add('social__text');
    text.textContent = picture.comments[i];
    comment.appendChild(avatar);
    comment.appendChild(text);
    fragment.appendChild(comment);
    document.querySelector('.social__caption').textContent = picture.description;
  }
  document.querySelector('.social__comments').appendChild(fragment);
};

renderBigPicture(photoParameters[1]);

// Скрытие элементов
document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.social__loadmore').classList.add('visually-hidden');
