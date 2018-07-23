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

  // Создание галерей
  var picturesContainer = document.querySelector('.pictures');
  var createGallery = function (photoParameters) {
    var fragment = document.createDocumentFragment();
    photoParameters.forEach(function (photoParameter) {
      fragment.appendChild(renderPicture(photoParameter));
    });
    picturesContainer.appendChild(fragment);
  };
  var createNewGallery = function (photoParameters) {
    var fragment = document.createDocumentFragment();
    window.utils.generateArrayRandomNumbers(1, 10).forEach(function (index) {
      fragment.appendChild(renderPicture(photoParameters[index]));
    });
    picturesContainer.appendChild(fragment);
  };
  var createDiscussedGallery = function (photoParameters) {
    var sortedPhotoParameters = photoParameters.slice();
    sortedPhotoParameters.sort(function (a, b) {
      return a.comments.length - b.comments.length;
    });
    var fragment = document.createDocumentFragment();
    sortedPhotoParameters.forEach(function (sortedPhotoParameter) {
      fragment.appendChild(renderPicture(sortedPhotoParameter));
    });
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

  var filterChangeHandler = function () {
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
      window.bigPicture.bigPictureAssemblyData(window.photos.data);
    }));
  };

  // Создание галереи и рендер большой картинки из скачанных данных
  var processData = function (data) {
    createGallery(data);
    window.bigPicture.bigPictureAssemblyData(data);
    showFiltersButtons();
    window.photos = {
      data: data
    };
    filterChangeHandler();
  };
  window.backend.load(processData, window.utils.errorHandler);

})();
