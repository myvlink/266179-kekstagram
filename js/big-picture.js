'use strict';

(function () {


  // Отображение окна картинки
  var bigPicture = document.querySelector('.big-picture');
  var openBigPicture = function () {
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onBigPictureEscPress);
  };
  var closeBigPictureHandler = function () {
    bigPicture.classList.add('hidden');
    window.utils.removeElements('.social__comments');
    document.removeEventListener('keydown', onBigPictureEscPress);
    closeButtonBigPicture.removeEventListener('click', closeBigPictureHandler);
  };

  var onBigPictureEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      closeBigPictureHandler();
    }
  };
  var closeButtonBigPicture = document.querySelector('.big-picture__cancel');
  var gallery = document.querySelector('.pictures');

  window.bigPicture = {
    // Заполнение большой картинки
    renderBigPicture: function (picture, index) {
      document.querySelector('.big-picture__img img').src = picture[index].url;
      document.querySelector('.likes-count').textContent = picture[index].likes;
      document.querySelector('.comments-count').textContent = picture[index].comments.length;
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < picture[index].comments.length; i++) {
        var comment = document.createElement('li');
        var avatar = document.createElement('img');
        var text = document.createElement('p');
        comment.classList.add('social__comment', 'social__comment--text');
        avatar.classList.add('social__picture');
        avatar.src = 'img/avatar-' + window.utils.generateInteger(1, 6) + '.svg';
        avatar.alt = 'Аватар комментатора фотографии';
        avatar.width = '35';
        avatar.height = '35';
        text.classList.add('social__text');
        text.textContent = picture[index].comments[i];
        comment.appendChild(avatar);
        comment.appendChild(text);
        fragment.appendChild(comment);
        document.querySelector('.social__caption').textContent = window.data.generateDescription();
      }
      document.querySelector('.social__comments').appendChild(fragment);
    },
    openBigPictureHandler: function (data) {
      var userImages = document.querySelectorAll('.picture__img');
      gallery.addEventListener('click', function (evt) {
        var target = evt.target;
        for (var i = 0; i < userImages.length; i++) {
          if (userImages[i] === target) {
            window.bigPicture.renderBigPicture(data, window.utils.convertStringToNumber(target.getAttribute('src')) - 1);
            openBigPicture();
            closeButtonBigPicture.addEventListener('click', closeBigPictureHandler);
          }
        }
      });
    },
  };

  window.bigPicture.openBigPictureHandler();
  window.utils.visuallyHideElement('.social__comment-count');
  window.utils.visuallyHideElement('.social__loadmore');
})();
