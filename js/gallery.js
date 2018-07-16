'use strict';

(function () {
  // Генерация объектов параметров фотографий
  var generatePhotoParameter = function () {
    for (var i = 1; i <= window.data.PHOTO_QUANTITY; i++) {
      window.data.photoParameters[i] = {
        url: 'photos/' + i + '.jpg',
        likes: window.utils.generateInteger(window.data.LIKES.MIN, window.data.LIKES.MAX),
        comments: window.data.generateComments(),
        description: window.data.generateDescription()
      };
    }
    return window.data.photoParameters;
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
    for (var i = 1; i <= window.data.PHOTO_QUANTITY; i++) {
      fragment.appendChild(renderPicture(window.data.photoParameters[i]));
    }
    picturesContainer.appendChild(fragment);
  };
  createGallery();
})();
