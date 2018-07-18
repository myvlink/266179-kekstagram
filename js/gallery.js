'use strict';

(function () {
  // Создание шаблона
  var pictureTemplate = document.querySelector('#picture').content;
  var renderPicture = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__stat--likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__stat--comments').textContent = picture.comments.length;
    return pictureElement;
  };

  // Вставка фотографий на главную
  var picturesContainer = document.querySelector('.pictures');
  var createGallery = function (photoParameters) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.PHOTO_QUANTITY; i++) {
      fragment.appendChild(renderPicture(photoParameters[i]));
    }
    picturesContainer.appendChild(fragment);
    window.bigPicture.openBigPictureHandler();
  };

  // Создание галереи и рендер большой картинки из скачанных данных
  var processData = function (data) {
    createGallery(data);
    window.bigPicture.renderBigPicture(data);
  };
  window.backend.load(processData, window.utils.errorHandler);
})();
