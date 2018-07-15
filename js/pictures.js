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
  effectNoneButton.addEventListener('click', applyEffect);
  effectChromeButton.addEventListener('click', applyEffect);
  effectSepiaButton.addEventListener('click', applyEffect);
  effectMarvinButton.addEventListener('click', applyEffect);
  effectPhobosButton.addEventListener('click', applyEffect);
  effectHeatButton.addEventListener('click', applyEffect);
  resizeButtonMinus.addEventListener('click', reduceImage);
  resizeButtonPlus.addEventListener('click', increaseImage);
  uploadCloseButton.addEventListener('click', closeUploadSetup);
  moveSliderChangeFilter();
};
var closeUploadSetup = function () {
  uploadSetupWindows.classList.add('hidden');
  removeEffects();
  uploadPreviewWindow.style.transform = 'scale(1)';
  effectNoneButton.removeEventListener('click', applyEffect);
  effectChromeButton.removeEventListener('click', applyEffect);
  effectSepiaButton.removeEventListener('click', applyEffect);
  effectMarvinButton.removeEventListener('click', applyEffect);
  effectPhobosButton.removeEventListener('click', applyEffect);
  effectHeatButton.removeEventListener('click', applyEffect);
  resizeButtonMinus.removeEventListener('click', reduceImage);
  resizeButtonPlus.removeEventListener('click', increaseImage);
  uploadCloseButton.removeEventListener('click', closeUploadSetup);
  resetScaleValue();
  uploadButton.value = '';
};


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

// Применение эффекта на изображение
var effectNoneButton = document.getElementById('effect-none');
var effectChromeButton = document.getElementById('effect-chrome');
var effectSepiaButton = document.getElementById('effect-sepia');
var effectMarvinButton = document.getElementById('effect-marvin');
var effectPhobosButton = document.getElementById('effect-phobos');
var effectHeatButton = document.getElementById('effect-heat');
var scale = document.querySelector('.scale');
var hideScale = function () {
  scale.classList.add('hidden');
};
var showScale = function () {
  scale.classList.remove('hidden');
};

var applyEffect = function () {
  var currentFilter = document.querySelector('.effects__radio:checked').value;
  switch (currentFilter) {
    case 'none':
      removeEffects();
      hideScale();
      break;
    case 'chrome':
      addChromeEffect();
      showScale();
      break;
    case 'sepia':
      addSepiaEffect();
      showScale();
      break;
    case 'marvin':
      addMarvinEffect();
      showScale();
      break;
    case 'phobos':
      addPhobosEffect();
      showScale();
      break;
    case 'heat':
      addHeatEffect();
      showScale();
      break;
  }
};
var removeEffects = function () {
  imageUploadPreview.removeAttribute('class');
  imageUploadPreview.style.filter = '';
};
var addChromeEffect = function () {
  removeEffects();
  imageUploadPreview.classList.add('effects__preview--chrome');
  imageUploadPreview.style.filter = 'grayscale(' + scaleValue.value / 100 + ')';
};
var addSepiaEffect = function () {
  removeEffects();
  imageUploadPreview.classList.add('effects__preview--sepia');
  imageUploadPreview.style.filter = 'sepia(' + scaleValue.value / 100 + ')';
};
var addMarvinEffect = function () {
  removeEffects();
  imageUploadPreview.classList.add('effects__preview--marvin');
  imageUploadPreview.style.filter = 'invert(' + scaleValue.value + '%)';
};
var addPhobosEffect = function () {
  removeEffects();
  imageUploadPreview.classList.add('effects__preview--phobos');
  imageUploadPreview.style.filter = 'blur(' + scaleValue.value / 100 * 3 + 'px)';
};
var addHeatEffect = function () {
  removeEffects();
  imageUploadPreview.classList.add('effects__preview--heat');
  imageUploadPreview.style.filter = 'brightness(' + (1 + ((scaleValue.value / 100) * 2)) + ')';
};

// Перетаскивание пина и изменение эффекта
var scaleValue = document.querySelector('.scale__value');
var scaleLine = document.querySelector('.scale__line');
var scaleLevel = document.querySelector('.scale__level');
var scalePin = document.querySelector('.scale__pin');
var startCoordX = 0;
var resetScaleValue = function () {
  scaleValue.value = 100;
  scaleLevel.style.width = scaleValue.value + '%';
  scalePin.style.left = scaleValue.value + '%';
};
scalePin.style.left = scaleValue.value + '%';
var moveSliderChangeFilter = function () {
  scalePin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    startCoordX = evt.clientX;
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = moveEvt.clientX - startCoordX;
      if (scalePin.offsetLeft + shift < 0 || scalePin.offsetLeft + shift > scaleLine.offsetWidth) {
        scalePin.style.left = scalePin.offsetLeft + 'px';
      } else {
        scalePin.style.left = scalePin.offsetLeft + shift + 'px';
      }
      startCoordX = moveEvt.clientX;
      scaleValue.value = Math.round(100 * scalePin.offsetLeft / scaleLine.offsetWidth);
      scaleLevel.style.width = scaleValue.value + '%';
      applyEffect();
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      applyEffect();
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  applyEffect();
};

uploadButton.addEventListener('change', openUploadSetup);

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
var MIN_HASHTAG_LENGTH = 2;
var MAX_HASHTAG_LENGTH = 20;
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
    } else if (hashtagsArray[i].length < MIN_HASHTAG_LENGTH) {
      hashtagsInputField.setCustomValidity('хеш-тег не может состоять только из одной решётки');
    } else if (hashtagsArray[i].length > MAX_HASHTAG_LENGTH) {
      hashtagsInputField.setCustomValidity('Хэш-тег не может быть длиннее 20 символов.');
    } else if (hashtagsArray.length !== generateUniqueArray(hashtagsArray).length) {
      hashtagsInputField.setCustomValidity('Хэш-теги не должнгы повторияться');
    } return;
  }
};

hashtagsInputField.addEventListener('keyup', checkValidity);
