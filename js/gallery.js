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
  };

  // Создание галерей
  var createNewGallery = function (photoParameters) {
    var fragment = document.createDocumentFragment();
    window.utils.generateArrayRandomNumber(1, 10).forEach(function (index) {
      fragment.appendChild(renderPicture(photoParameters[index]));
    });
    picturesContainer.appendChild(fragment);
  };
  var compareCommentsLength = function (commentsA, commentsB) {
    return commentsA.comments.length - commentsB.comments.length;
  };
  var createDiscussedGallery = function (photoParameters) {
    var sortedArray = photoParameters.slice();
    sortedArray.sort(compareCommentsLength);
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.PHOTO_QUANTITY; i++) {
      fragment.appendChild(renderPicture(sortedArray[i]));
    }
    picturesContainer.appendChild(fragment);
  };

  // Фильтрация галереи
  var imgFilters = document.querySelector('.img-filters');
  var imgFiltersForm = document.querySelector('.img-filters__form');
  var imgFiltersPopular = document.getElementById('filter-popular');
  var imgFiltersNew = document.getElementById('filter-new');
  var imgFiltersDiscussed = document.getElementById('filter-discussed');

  var showFiltersButtons = function () {
    imgFilters.classList.remove('img-filters--inactive');
  };

  var onChangeFilter = function () {
    imgFiltersForm.addEventListener('click', window.utils.debounce(function (evt) {
      var picturesImage = document.querySelectorAll('.picture__link');
      var target = evt.target;
      if (target === imgFiltersPopular) {
        picturesImage.forEach(function (element) {
          element.remove();
        });
        imgFiltersPopular.classList.add('img-filters__button--active');
        imgFiltersNew.classList.remove('img-filters__button--active');
        imgFiltersDiscussed.classList.remove('img-filters__button--active');
        createGallery(window.photos.data);
      } else if (target === imgFiltersNew) {
        picturesImage.forEach(function (element) {
          element.remove();
        });
        imgFiltersPopular.classList.remove('img-filters__button--active');
        imgFiltersNew.classList.add('img-filters__button--active');
        imgFiltersDiscussed.classList.remove('img-filters__button--active');
        createNewGallery(window.photos.data);
      } else if (target === imgFiltersDiscussed) {
        picturesImage.forEach(function (element) {
          element.remove();
        });
        imgFiltersPopular.classList.remove('img-filters__button--active');
        imgFiltersNew.classList.remove('img-filters__button--active');
        imgFiltersDiscussed.classList.add('img-filters__button--active');
        createDiscussedGallery(window.photos.data);
      }
      window.bigPicture.openBigPictureHandler(window.photos.data);
    }));
  };

  // Создание галереи и рендер большой картинки из скачанных данных
  var processData = function (data) {
    createGallery(data);
    window.bigPicture.openBigPictureHandler(data);
    showFiltersButtons();
    window.photos = {
      data: data
    };
    onChangeFilter();
  };
  window.backend.load(processData, window.utils.errorHandler);

})();
