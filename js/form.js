'use strict';

(function () {
  var RESIZE_STEP = 25;
  var MIN_SIZE = 25;
  var MAX_SIZE = 100;
  var MAX_HASHTAGS = 5;
  var MIN_HASHTAG_LENGTH = 2;
  var MAX_HASHTAG_LENGTH = 20;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  // Превью загрузки изображения и кнопки управления размером
  var uploadPreviewWindow = document.querySelector('.img-upload__preview');
  var imageUploadPreview = document.querySelector('.img-upload__preview img');

  // Окно настроек при загрузке файла
  var resizeButtonMinus = document.querySelector('.resize__control--minus');
  var resizeButtonPlus = document.querySelector('.resize__control--plus');
  var uploadButton = document.querySelector('.img-upload__input');
  var uploadCloseButton = document.querySelector('.img-upload__cancel');
  var uploadSetupWindows = document.querySelector('.img-upload__overlay');
  var openUploadSetupHandler = function () {
    uploadSetupWindows.classList.remove('hidden');
    effectNoneButton.addEventListener('click', radioChangeApplyEffectHandler);
    effectChromeButton.addEventListener('click', radioChangeApplyEffectHandler);
    effectSepiaButton.addEventListener('click', radioChangeApplyEffectHandler);
    effectMarvinButton.addEventListener('click', radioChangeApplyEffectHandler);
    effectPhobosButton.addEventListener('click', radioChangeApplyEffectHandler);
    effectHeatButton.addEventListener('click', radioChangeApplyEffectHandler);
    resizeButtonMinus.addEventListener('click', buttonClickReduceImageHandler);
    resizeButtonPlus.addEventListener('click', buttonClickIncreaseImageHandler);
    uploadCloseButton.addEventListener('click', closeUploadSetupHandler);
    document.addEventListener('keydown', uploadSetupEscPressHandler);
    sliderMoveChangeFilter();
    resetResizeValue();
  };
  var closeUploadSetupHandler = function () {
    uploadSetupWindows.classList.add('hidden');
    removeEffects();
    uploadPreviewWindow.style.transform = 'scale(1)';
    effectNoneButton.removeEventListener('click', radioChangeApplyEffectHandler);
    effectChromeButton.removeEventListener('click', radioChangeApplyEffectHandler);
    effectSepiaButton.removeEventListener('click', radioChangeApplyEffectHandler);
    effectMarvinButton.removeEventListener('click', radioChangeApplyEffectHandler);
    effectPhobosButton.removeEventListener('click', radioChangeApplyEffectHandler);
    effectHeatButton.removeEventListener('click', radioChangeApplyEffectHandler);
    resizeButtonMinus.removeEventListener('click', buttonClickReduceImageHandler);
    resizeButtonPlus.removeEventListener('click', buttonClickIncreaseImageHandler);
    uploadCloseButton.removeEventListener('click', closeUploadSetupHandler);
    document.removeEventListener('keydown', uploadSetupEscPressHandler);
    uploadButton.value = '';
    clearForm();
    resetResizeValue();
    resetScaleValue();
  };
  var uploadSetupEscPressHandler = function (evt) {
    if ((evt.keyCode === window.utils.ESC_KEYCODE) && (hashtagsInputField !== document.activeElement) && (textDescriptionField !== document.activeElement)) {
      closeUploadSetupHandler();
    }
  };

  // Управление размером
  var resizeValue = document.querySelector('.resize__control--value');
  var resetResizeValue = function () {
    resizeValue.value = '100%';
  };
  var buttonClickReduceImageHandler = function () {
    if (+resizeValue.value.slice(0, -1) > MIN_SIZE) {
      resizeValue.value = +resizeValue.value.slice(0, -1) - RESIZE_STEP + '%';
      uploadPreviewWindow.style.transform = 'scale(' + resizeValue.value.slice(0, -1) / 100 + ')';
    }
  };
  var buttonClickIncreaseImageHandler = function () {
    if (+resizeValue.value.slice(0, -1) < MAX_SIZE) {
      resizeValue.value = +resizeValue.value.slice(0, -1) + RESIZE_STEP + '%';
      uploadPreviewWindow.style.transform = 'scale(' + resizeValue.value.slice(0, -1) / 100 + ')';
    }
  };

  // Применение эффекта на изображение
  // Тут нужно переделать под делегирование
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

  // Применение эффекта
  var currentFilter;
  var applyEffect = function () {
    // var currentFilter = document.querySelector('.effects__radio:checked').value;
    switch (currentFilter) {
      case 'none':
        removeEffects();
        break;
      case 'chrome':
        addChromeEffect();
        break;
      case 'sepia':
        addSepiaEffect();
        break;
      case 'marvin':
        addMarvinEffect();
        break;
      case 'phobos':
        addPhobosEffect();
        break;
      case 'heat':
        addHeatEffect();
        break;
    }
    if (currentFilter === 'none') {
      hideScale();
    } else {
      showScale();
    }
  };

  var effectsRadioButtons = document.querySelectorAll('.effects__radio');
  var effectsList = document.querySelector('.effects__list');
  var radioChangeApplyEffectHandler = function () {
    resetScaleValue();
    effectsList.addEventListener('click', function (evt) {
      effectsRadioButtons.forEach(function (button) {
        if (evt.target === button) {
          currentFilter = evt.target.value;
        }
      });
      applyEffect();
    });
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
  var sliderMoveChangeFilter = function () {
    scalePin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      startCoordX = evt.clientX;
      var mouseMoveHandler = function (moveEvt) {
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
      var mouseUpHandler = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
        applyEffect();
      };
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    });
    applyEffect();
  };

  uploadButton.addEventListener('change', openUploadSetupHandler);

  // Валидация хэш-тегов
  var hashtagsInputField = document.querySelector('.text__hashtags');
  var checkValidity = function () {
    var hashtags = hashtagsInputField.value.toLowerCase().split(' ');
    hashtags = hashtags.filter(function (hashtag) {
      return hashtag !== '';
    });
    hashtagsInputField.setCustomValidity('');
    if (!hashtagsInputField.value) {
      hashtagsInputField.setCustomValidity('');
      return;
    }
    if (hashtags.length > MAX_HASHTAGS) {
      hashtagsInputField.setCustomValidity('Задайте не более пяти хэш-тегов.');
      return;
    }
    hashtags.forEach(function (hashtag) {
      if (hashtag.charAt(0) !== '#') {
        hashtagsInputField.setCustomValidity('Хэш-тег начинается с символа #');
        return;
      }
      if (hashtag.length < MIN_HASHTAG_LENGTH) {
        hashtagsInputField.setCustomValidity('Хэш-тег не может состоять только из одной решётки');
        return;
      }
      if (hashtag.length > MAX_HASHTAG_LENGTH) {
        hashtagsInputField.setCustomValidity('Хэш-тег не может быть длиннее 20 символов');
        return;
      }
      if (hashtags.length !== window.utils.generateUniqueArray(hashtags).length) {
        hashtagsInputField.setCustomValidity('Хэш-теги не должны повторяться');
        return;
      }
    });
  };

  hashtagsInputField.addEventListener('keyup', checkValidity);

  // Предпросмотр пользовательской фотографии
  uploadButton.addEventListener('change', function () {
    var file = uploadButton.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        imageUploadPreview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });

  // Очистка полей формы
  var textDescriptionField = document.querySelector('.text__description');
  var clearForm = function () {
    uploadButton.value = '';
    hashtagsInputField.value = '';
    textDescriptionField.value = '';
  };

  // Отправка формы и отмена действия по умолчанию
  var form = document.querySelector('.img-upload__form');
  form.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(form), function () {
      uploadSetupWindows.classList.add('hidden');
    }, window.utils.errorHandler);
    evt.preventDefault();
    clearForm();
    resetScaleValue();
  });
})();
