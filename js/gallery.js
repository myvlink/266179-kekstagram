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

  var removeElementsAndClass = function (elements, buttons) {
    elements.forEach(function (element) {
      element.remove();
    });
    buttons.forEach(function (button) {
      button.classList.remove('img-filters__button--active');
    });
  };

  // Фильтрация галереи
  var imgFilters = document.querySelector('.img-filters');
  var imgFiltersForm = document.querySelector('.img-filters__form');
  var imgFiltersbuttons = document.querySelectorAll('.img-filters__button');
  var showFiltersButtons = function () {
    imgFilters.classList.remove('img-filters--inactive');
  };
  var filterChangeHandler = function () {
    imgFiltersForm.addEventListener('click', window.utils.debounce(function (evt) {
      var picturesImages = document.querySelectorAll('.picture__link');
      removeElementsAndClass(picturesImages, imgFiltersbuttons);
      switch (evt.target.id) {
        case 'filter-popular':
          evt.target.classList.add('img-filters__button--active');
          createGallery(createPopularData());
          break;
        case 'filter-new':
          evt.target.classList.add('img-filters__button--active');
          createGallery(createNewData());
          break;
        case 'filter-discussed':
          evt.target.classList.add('img-filters__button--active');
          createGallery(createDiscussedData());
          break;
      }
      window.bigPicture.bigPictureAssemblyData(window.photos.data);
    }));
  };

  var createPopularData = function () {
    var popularData = window.photos.data.slice();
    return popularData;
  };

  var createDiscussedData = function () {
    var discussedData = window.photos.data.slice();
    discussedData.sort(function (a, b) {
      return a.comments.length - b.comments.length;
    });
    return discussedData;
  };

  var createNewData = function () {
    var newData = [];
    window.utils.generateArrayRandomNumbers(1, 10).forEach(function (number, i) {
      newData[i] = window.photos.data[number];
    });
    return newData;
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
  window.backend.load('GET', '', processData, window.utils.errorHandler);
})();
