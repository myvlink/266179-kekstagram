'use strict';

(function () {
  // Превью загрузки изображения и кнопки управления размером
  var uploadPreviewWindow = document.querySelector('.img-upload__preview');
  var imageUploadPreview = document.querySelector('.img-upload__preview img');

  // Окно настроек при загрузке файла
  var resizeButtonMinus = document.querySelector('.resize__control--minus');
  var resizeButtonPlus = document.querySelector('.resize__control--plus');
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
  var RESIZE_STEP = 25;
  var MIN_SIZE = 25;
  var MAX_SIZE = 100;
  var resizeValue = document.querySelector('.resize__control--value');
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
        hashtagsInputField.setCustomValidity('Хэш-тег начинается с символа #');
      } else if (hashtagsArray[i].length < MIN_HASHTAG_LENGTH) {
        hashtagsInputField.setCustomValidity('Хэш-тег не может состоять только из одной решётки');
      } else if (hashtagsArray[i].length > MAX_HASHTAG_LENGTH) {
        hashtagsInputField.setCustomValidity('Хэш-тег не может быть длиннее 20 символов');
      } else if (hashtagsArray.length !== window.utils.generateUniqueArray(hashtagsArray).length) {
        hashtagsInputField.setCustomValidity('Хэш-теги не должны повторяться');
      } return;
    }
  };

  hashtagsInputField.addEventListener('keyup', checkValidity);
})();
