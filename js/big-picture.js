'use strict';

(function () {


  // Отображение окна картинки
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureOpenHandler = function () {
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', bigPictureEscPressHandler);
  };
  var bigPictureCloseHandler = function () {
    bigPicture.classList.add('hidden');
    window.utils.removeElements('.social__comments');
    document.removeEventListener('keydown', bigPictureEscPressHandler);
    closeButtonBigPicture.removeEventListener('click', bigPictureCloseHandler);
  };

  var bigPictureEscPressHandler = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      bigPictureCloseHandler();
    }
  };
  var closeButtonBigPicture = document.querySelector('.big-picture__cancel');
  var gallery = document.querySelector('.pictures');

  window.bigPicture = {
    // Заполнение большой картинки
    renderBigPicture: function (pictures, index) {
      document.querySelector('.big-picture__img img').src = pictures[index].url;
      document.querySelector('.likes-count').textContent = pictures[index].likes;
      document.querySelector('.comments-count').textContent = pictures[index].comments.length;
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < pictures[index].comments.length; i++) {
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
        text.textContent = pictures[index].comments[i];
        comment.appendChild(avatar);
        comment.appendChild(text);
        fragment.appendChild(comment);
        document.querySelector('.social__caption').textContent = window.data.generateDescription();
      }
      document.querySelector('.social__comments').appendChild(fragment);
    },
    bigPictureAssemblyData: function (data) {
      var userImages = document.querySelectorAll('.picture__img');
      gallery.addEventListener('click', function (evt) {
        var target = evt.target;
        for (var i = 0; i < userImages.length; i++) {
          if (userImages[i] === target) {
            window.bigPicture.renderBigPicture(data, window.utils.convertStringToNumber(target.getAttribute('src')) - 1);
            bigPictureOpenHandler();
            closeButtonBigPicture.addEventListener('click', bigPictureCloseHandler);
          }
        }
      });
    },
  };
  window.utils.visuallyHideElement('.social__comment-count');
  window.utils.visuallyHideElement('.social__loadmore');
})();
