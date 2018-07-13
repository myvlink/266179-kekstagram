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

// Шаг изменения размера
var RESIZE_STEP = 25;

// Макс и мин размер изображения, текущее значение размера
var MIN_SIZE = 25;
var MAX_SIZE = 100;
var resizeValue = document.querySelector('.resize__control--value');

// Превью загрузки изображения и кнопки управления размером
var uploadPreviewWindow = document.querySelector('.img-upload__preview');
var imageUploadPreview = document.querySelector('.img-upload__preview img');
var resizeButtonMinus = document.querySelector('.resize__control--minus');
var resizeButtonPlus = document.querySelector('.resize__control--plus');

// Генерация комментов
var generateComments = function () {
  return generateInteger(1, 2) > 1 ? [PHOTO_COMMENTS[generateInteger(0, PHOTO_COMMENTS.length - 1)], PHOTO_COMMENTS[generateInteger(0, PHOTO_COMMENTS.length - 1)]] : [PHOTO_COMMENTS[generateInteger(0, PHOTO_COMMENTS.length - 1)]];
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
var createGallery = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 1; i <= PHOTO_QUANTITY; i++) {
    fragment.appendChild(renderPicture(photoParameters[i]));
  }
  picturesContainer.appendChild(fragment);
};
createGallery();

// Окно настроек при загрузке файла
var uploadButton = document.getElementById('upload-file');
var uploadCloseButton = document.getElementById('upload-cancel');
var uploadSetupWindows = document.querySelector('.img-upload__overlay');
var openUploadSetup = function () {
  uploadSetupWindows.classList.remove('hidden');
};
var closeUploadSetup = function () {
  uploadSetupWindows.classList.add('hidden');
  removeEffects();
  uploadPreviewWindow.style.transform = 'scale(1)';
};
uploadButton.addEventListener('change', openUploadSetup);
uploadCloseButton.addEventListener('click', closeUploadSetup);

// Управление размером
var reduceImage = function () {
  if (+resizeValue.value.slice(0, -1) > MIN_SIZE) {
    resizeValue.value = +resizeValue.value.slice(0, -1) - RESIZE_STEP + '%';
    uploadPreviewWindow.style.transform = 'scale(' + resizeValue.value.slice(0, -1) / 100 + ')';
  }
};
var increaseImage = function () {
  if (+resizeValue.value.slice(0, -1) < MAX_SIZE) {
    resizeValue.value = +resizeValue.value.slice(0, -1) + RESIZE_STEP + '%';
    uploadPreviewWindow.style.transform = 'scale(' + resizeValue.value.slice(0, -1) / 100 + ')';
  }
};
resizeButtonMinus.addEventListener('click', reduceImage);
resizeButtonPlus.addEventListener('click', increaseImage);


// Применение эффекта на изображение
var effectNoneButton = document.getElementById('effect-none');
var effectChromeButton = document.getElementById('effect-chrome');
var effectSepiaButton = document.getElementById('effect-sepia');
var effectMarvinButton = document.getElementById('effect-marvin');
var effectPhobosButton = document.getElementById('effect-phobos');
var effectHeatButton = document.getElementById('effect-heat');

var removeEffects = function () {
  imageUploadPreview.removeAttribute('class');
};
var addChromeEffect = function () {
  removeEffects();
  imageUploadPreview.classList.add('effects__preview--chrome');
};
var addSepiaEffect = function () {
  removeEffects();
  imageUploadPreview.classList.add('effects__preview--sepia');
};
var addMarvinEffect = function () {
  removeEffects();
  imageUploadPreview.classList.add('effects__preview--marvin');
};
var addPhobosEffect = function () {
  removeEffects();
  imageUploadPreview.classList.add('effects__preview--phobos');
};
var addHeatEffect = function () {
  removeEffects();
  imageUploadPreview.classList.add('effects__preview--heat');
};
effectNoneButton.addEventListener('click', removeEffects);
effectChromeButton.addEventListener('click', addChromeEffect);
effectSepiaButton.addEventListener('click', addSepiaEffect);
effectMarvinButton.addEventListener('click', addMarvinEffect);
effectPhobosButton.addEventListener('click', addPhobosEffect);
effectHeatButton.addEventListener('click', addHeatEffect);

// Заполнение большой картинки
var renderBigPicture = function (picture) {
  document.querySelector('.big-picture__img img').src = picture.url;
  document.querySelector('.likes-count').textContent = picture.likes;
  document.querySelector('.comments-count').textContent = picture.comments.length;
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < picture.comments.length; i++) {
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

// Отображение окна картинки
var bigPicture = document.querySelector('.big-picture');
var openBigPicture = function () {
  bigPicture.classList.remove('hidden');
};
var closeBigPicture = function () {
  bigPicture.classList.add('hidden');
};
var closeButtonBigPicture = document.querySelector('.big-picture__cancel');
var galery = document.querySelector('.pictures');
var openBigPictureHandler = function () {
  var userImages = document.querySelectorAll('.picture__img');
  galery.addEventListener('click', function (evt) {
    var target = evt.target;
    for (var img = 0; img < userImages.length; img++) {
      if (userImages[img] === target) {
        openBigPicture();
        closeButtonBigPicture.addEventListener('click', closeBigPicture);
      }
    }
  });
};
openBigPictureHandler();

// Скрытие элементов
var hideElement = function (element) {
  document.querySelector(element).classList.add('visually-hidden');
};

hideElement('.social__comment-count');
hideElement('.social__loadmore');

// Возврат массива без повторений
var generateUniqueArray = function (array) {
  var obj = {};
  for (var i = 0; i < array.length; i++) {
    var str = array[i];
    obj[str] = true;
  }
  return Object.keys(obj);
};

// Валидация хэш-тегов
var hashtagsInputField = document.querySelector('.text__hashtags');
var checkValidity = function () {
  var hashtagsArray = hashtagsInputField.value.split(' ');
  hashtagsInputField.setCustomValidity('');
  if (hashtagsArray.length > 5) {
    hashtagsInputField.setCustomValidity('Задайте не более пяти хэш-тегов.');
    return;
  }
  for (var i = 0; i < hashtagsArray.length; i++) {
    if (hashtagsArray[i].charAt(0) !== '#') {
      hashtagsInputField.setCustomValidity('хэш-тег начинается с символа #');
    } else if (hashtagsArray[i].length < 2) {
      hashtagsInputField.setCustomValidity('хеш-тег не может состоять только из одной решётки');
    } else if (hashtagsArray[i].length > 20) {
      hashtagsInputField.setCustomValidity('Хэш-тег не может быть длиннее 20 символов.');
    } else if (hashtagsArray.length !== generateUniqueArray(hashtagsArray).length) {
      hashtagsInputField.setCustomValidity('Хэш-теги не должнгы повторияться');
    } return;
  }
};

hashtagsInputField.addEventListener('keyup', checkValidity);
